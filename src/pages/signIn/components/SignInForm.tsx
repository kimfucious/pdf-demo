import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../actions/authActions";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { AppRoute } from "../../../types";
import { signInSchema } from "../../../validators";

interface Values {
    username: string;
    password: string;
    email: string;
}
export default function SignInForm() {
    const dispatch = useAppDispatch();
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    return (
        <div className="w-100 pt-3" style={{ maxWidth: 400 }}>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                }}
                validationSchema={signInSchema}
                onSubmit={async (
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    try {
                        setFormError("");
                        await dispatch(signIn(values));
                        setSubmitting(false);
                        navigate(AppRoute.PDF);
                    } catch (error: any) {
                        console.warn("error", error);
                        console.warn("message", error.message);
                        setFormError(error.message);
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form noValidate>
                        <div className="d-flex flex-column align-items-center">
                            <div className="form-floating w-100 mb-3">
                                <Field
                                    autoFocus
                                    className="form-control w-100"
                                    id="username"
                                    name="username"
                                    placeholder="demo"
                                />
                                {errors.username && touched.username ? (
                                    <small className="text-danger">
                                        {errors.username}
                                    </small>
                                ) : null}
                                <label
                                    className="form-label"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                            </div>
                            <div className="form-floating w-100 mb-3">
                                <Field
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="demo@demo.com"
                                    type="email"
                                />
                                {errors.email && touched.email ? (
                                    <small className="text-danger">
                                        {errors.email}
                                    </small>
                                ) : null}
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                            </div>
                            <div className="form-floating w-100 mb-3">
                                <Field
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="S00p3rS3cr3t!"
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <small className="text-danger">
                                        {errors.password}
                                    </small>
                                ) : null}
                                <label
                                    className="form-label"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                            </div>

                            <button
                                className="btn btn-outline-primary"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                        {formError && (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                {formError}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
