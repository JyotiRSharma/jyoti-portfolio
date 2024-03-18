"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useEffect } from "react";

const Chat = () => {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        setMessages,
    } = useChat();

    useEffect(() => {
        setMessages([
            {
                id: "00",
                role: "assistant",
                content: "How may I assist you?",
            },
        ]);
    }, []);
    return (
        <div className="mx-auto flex h-screen max-w-md flex-col justify-between px-4  py-12">
            <div
                id="messages-div"
                className="flex min-h-64 flex-col gap-3 overflow-y-auto "
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
            </div>
            <div className="my-6">
                {isLoading ? (
                    "...."
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex justify-center gap-3"
                    >
                        <input
                            className="w-full rounded-md p-2 dark:text-slate-200"
                            value={input}
                            placeholder="Say something"
                            onChange={handleInputChange}
                        />
                        <Button type="submit" className="">
                            Send
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default function Ask() {
    return <Chat />;
}
