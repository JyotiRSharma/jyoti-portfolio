import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function UserInput(
    props: Readonly<{
        handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
        input: string;
        handleInputChange: (
            e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
        ) => void;
    }>,
) {
    const [count, setCount] = useState(Number(localStorage.getItem("count")));

    if (count >= 2) {
        return <UserWarning />;
    }
    return (
        <form
            onSubmit={(e) => {
                props.handleSubmit(e);
                setCount((prevCount) => {
                    const currentCount = prevCount + 1;
                    localStorage.setItem("count", currentCount.toString());
                    console.log(currentCount);
                    return currentCount;
                });
            }}
            className="flex w-full flex-col justify-center gap-2"
        >
            <div key={"count"} className="text-right text-sm">
                {count} / 2
            </div>
            <div key={"userForm"} className="flex gap-3">
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
    return (
        <div key={"userWarning"}>
            You have maxed out Jarvis. Ask Jyoti for help. 🥹
        </div>
    );
}

export default UserInput;
