import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    email,
    message,
}) => (
    <div>
        <h1 className="text-2xl">Jyoti&apos;s Communication</h1>
        <div>
            <p className="text-xl">{firstName} sent a meesage.</p>
            <p>{message}</p>
            <p className="font-semibold">Reply to them: {email}</p>
        </div>
    </div>
);
