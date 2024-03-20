import * as yup from "yup";

const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const basicSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRule, { message: "Please enter a valid email" })
        .required("Required"),
    name: yup
        .string()
        .min(2, "Your name must be atleast 2 characters long")
        .required("Required"),
    message: yup
        .string()
        .min(10, "Your message should be atleast 10 characters long")
        .required("Required"),
});
