import SignInForm from "./components/SignInForm";

export default function SignIn() {
    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center w-100">
                <h1 className="display-4">Sign In</h1>
                <SignInForm />
            </div>
        </div>
    );
}
