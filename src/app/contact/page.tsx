"use client";

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { basicSchema } from "@/schema";
import { useEffect, useState } from "react";

interface ErrorModel {
    email: string;
    name: string;
    message: string;
}

const sendEmail = async (values: ErrorModel) => {
    const response = await fetch("/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    return response.json();
};

const Contact = () => {
    const email = useMutation({
        mutationFn: (values: ErrorModel) => sendEmail(values),
        onSuccess: (data) => {
            if (data?.error === null) {
                localStorage.setItem("isEmailSent", "true");
            }
        },
    });
    const [isEmailSent, setIsEmailSent] = useState(false);
    useEffect(() => {
        setIsEmailSent(() => {
            if (localStorage.getItem("isEmailSent") == "true") {
                return true;
            }
            return false;
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            message: "",
        },
        validationSchema: basicSchema,
        onSubmit: (values) => {
            email.mutate(values);
            console.log(email.data);
            console.log({ isSubmitting: formik.isSubmitting });
        },
    });

    if ((email.data?.error == null && email.isSuccess) || isEmailSent) {
        return (
            <div className="mx-auto my-0 grid h-[85vh] max-w-md">
                <div className="place-self-center">
                    Thanks! Jyoti will get back to you shortly!
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md px-10 py-10">
            <h1 className="py-5 text-center text-2xl font-bold">
                Contact Jyoti
            </h1>
            <form
                onSubmit={(e) => {
                    formik.handleSubmit(e);
                }}
                className="flex flex-col gap-4"
            >
                <div>
                    <Label htmlFor="email">Your email address:</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`${formik.errors.email && "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400"}`}
                    ></Input>
                    <p className={`pt-1 text-sm text-red-400`}>
                        {formik.errors.email &&
                            formik.touched.email &&
                            formik.errors.email}
                    </p>
                </div>

                <div>
                    <Label htmlFor="name">Your name:</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className={`${formik.errors.name && formik.touched.name && "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400"}`}
                    ></Input>
                    <p className={`pt-1 text-sm text-red-400`}>
                        {formik.errors.name &&
                            formik.touched.name &&
                            formik.errors.name}
                    </p>
                </div>

                <div>
                    <Label htmlFor="message">Your message:</Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Type your message here."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`${formik.errors.message && formik.touched.message && "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400"}`}
                    ></Textarea>
                    <p className={`pt-1 text-sm text-red-400`}>
                        {formik.errors.message &&
                            formik.touched.message &&
                            formik.errors.message}
                    </p>
                </div>

                <Button
                    type="submit"
                    disabled={
                        email.isPending || Object.keys(formik.errors).length > 0
                    }
                >
                    Send Message
                </Button>
            </form>
        </div>
    );
};

export default Contact;
