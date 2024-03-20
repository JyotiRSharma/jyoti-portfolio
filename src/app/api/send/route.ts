import { EmailTemplate } from "@/components/EmailTemplate";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    try {
        const data = await resend.emails.send({
            from: "jarvis@resend.dev",
            to: ["jyotiranjansharma1.1@gmail.com"],
            subject: `Jarvis - ${body?.name}'s Message`,
            text: "",
            react: EmailTemplate({
                firstName: body?.name,
                email: body?.email,
                message: body?.message,
            }),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
