import { StreamingTextResponse, Message as VercelChatMessage } from "ai";
import { NextRequest } from "next/server";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const DATA = [
    new Document({
        pageContent: `Jyotiranjan is a Software Engineer specializing in
        React.js and Next.js development and Machine Learning. With Next.js
        he builds fast and intuitive web applications, while
        delving into Machine Learning to drive innovation and
        solve complex challenges. He previously worked at Wipro,
        TechMahindra and on Fortune 500 sites.`,
        metadata: { source: 1, title: "Jyoti's Space History" },
    }),
    new Document({
        pageContent: `He have been living on Earth since a few years now and would like settle here for a while. During his stay on planet Earth,
        he would like to work and take humanity forward and build systems that would make space travel possible.`,
        metadata: { source: 2, title: "Jyoti's next exploration" },
    }),
    new Document({
        pageContent: `Jyoti is building interesting frontend and machine learning applications which would help build things that takes the human race forward. And you may contact him on Twitter (https://twitter.com/JyotiRanjanSha9) or LinkedIn (https://www.linkedin.com/in/jrsharma11/)`,
        metadata: { source: 3, title: "Jyoti's current life" },
    }),
];

const createContext = async () =>
    await MemoryVectorStore.fromDocuments(DATA, new OpenAIEmbeddings());

const model = new ChatOpenAI({
    temperature: 0.6,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const context = await createContext();
    const results = await context.similaritySearch(currentMessageContent, 1);

    const TEMPLATE = `You are Jarvis from Iron Man and you are Jyoti's assistant. Jyoti is a Man.
    All responses must be extremely verbose and in tech dialect and must follow the context.
    You are responding to 3rd party users. Jyoti never speaks to them. Only you speak to Jyoti's users.
    Never answer anything beyond the given context. Revolve around Jyoti, if they ask further details, tell them to ask Jyoti directly.
    
    Current conversation:
    {chat_history}
    Context: ${results.map((r) => r.pageContent).join("\n")}
    User: {input}
    AI:`;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const outputParser = new BytesOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
        chat_history: formattedPreviousMessages.join("\n"),
        input: currentMessageContent,
    });
    return new StreamingTextResponse(stream);
}
