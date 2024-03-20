"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "ai";
import { useChat } from "ai/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

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
        <UserInput
            handleSubmit={props.handleSubmit}
            handleInputChange={props.handleInputChange}
            input={props.input}
        />
    );
}

function UserInput(
    props: Readonly<{
        handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
        input: string;
        handleInputChange: (
            e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
        ) => void;
    }>,
) {
    let initialCount = 0;
    if (typeof window !== undefined) {
        initialCount = Number(localStorage.getItem("count"));
    }
    const [count, setCount] = useState(initialCount);

    if (count >= 2) {
        return <UserWarning />;
    }
    return (
        <form
            onSubmit={(e) => {
                props.handleSubmit(e);
                setCount((prevCount) => {
                    const currentCount = prevCount + 1;
                    if (typeof window !== undefined) {
                        localStorage.setItem("count", currentCount.toString());
                    }
                    return currentCount;
                });
            }}
            className="flex w-full flex-col justify-center gap-2"
        >
            <div className="text-right text-sm">{count} / 2</div>
            <div className="flex gap-3">
                <Input
                    className="w-full"
                    value={props.input}
                    placeholder="Say something"
                    onChange={props.handleInputChange}
                />
                <Button type="submit" className="">
                    Send
                </Button>
            </div>
        </form>
    );
}

function UserWarning() {
    return "You have maxed out Jarvis. Ask Jyoti for help. 🥹";
}

export default function Ask() {
    return <Chat />;
}
