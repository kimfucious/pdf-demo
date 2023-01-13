import { object, string } from "yup";

export const signInSchema = object({
    username: string()
        .max(15, "Maximum length is 2 characters")
        .min(2, "Minimum length is 2 characters")
        .required("Username is required"),
    email: string()
        .email("Please use a valid email address")
        .required("Email is required"),
    password: string()
        .min(4, "Must be a least 4 characters")
        .required("Password is required"),
});
