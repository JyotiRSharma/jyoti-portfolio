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
        pageContent: `Jyoti is an Astronaut and loves space travelling. He has been to the Moon, Mars and Saturn. `,
        metadata: { source: 1, title: "Jyoti's Space History" },
    }),
    new Document({
        pageContent: `He have been living on Earth since 25 years now and would like settle here for a while.
        Until his next appointment to his next exploration to 'Proxima Centauri b' super planet`,
        metadata: { source: 2, title: "Jyoti's next exploration" },
    }),
    new Document({
        pageContent: `Jyoti is now working as a Senior Software Engineer and plans to automate every human activity with LLMs 
        and help humans find life on other planets.`,
        metadata: { source: 3, title: "Jyoti's current life" },
    }),
];

const createContext = async () =>
    await MemoryVectorStore.fromDocuments(DATA, new OpenAIEmbeddings());

const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const context = await createContext();
    const results = await context.similaritySearch(currentMessageContent, 1);

    const TEMPLATE = `You are Jarvis from Iron Man and you are Jyoti's assistant.
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
