"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import dynamic from "next/dynamic";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";

const NoSSRUserInput = dynamic(() => import("@/components/UserInput"), {
    ssr: false,
});

const Chat = () => {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        setMessages,
    } = useChat();

    const formRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        let prevMessages: Message[] = [];
        if (localStorage.getItem("messages")?.length) {
            prevMessages = JSON.parse(localStorage.getItem("messages")!);
            setMessages(prevMessages);
        } else {
            setMessages([
                {
                    id: "00",
                    role: "assistant",
                    content: "How may I assist you?",
                },
            ]);
        }

        if (!localStorage.getItem("count")) {
            localStorage.setItem("count", "0");
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
        if (messages.length) {
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    }, [messages]);

    return (
        <div className="mx-auto flex h-[85vh] max-w-md flex-col justify-between overflow-y-auto px-4 py-4">
            <div
                id="messages-div"
                className="row-span-4 flex flex-col gap-3 overflow-y-auto"
            >
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className="whitespace-pre-wrap dark:text-white"
                    >
                        {m.role === "user" ? (
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                You:{" "}
                            </span>
                        ) : (
                            <span className="font-bold text-green-600 dark:text-green-400">
                                Jarvis:{" "}
                            </span>
                        )}
                        {m.content}
                    </div>
                ))}
                <div id="message-end" ref={formRef}></div>
            </div>
            <div className="my-6">
                <BottomSection
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    input={input}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

function BottomSection(
    props: Readonly<{
        isLoading: boolean;
        handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
        input: string;
        handleInputChange: (
            e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
        ) => void;
    }>,
) {
    if (props.isLoading) {
        return "Thinking....";
    }
    return (
        <NoSSRUserInput
            handleSubmit={props.handleSubmit}
            handleInputChange={props.handleInputChange}
            input={props.input}
        />
    );
}

export default function Ask() {
    return <Chat />;
}
