import SignInForm from "./components/SignInForm";

interface Props {
    navbarOffset: number;
}
export default function SignIn({ navbarOffset }: Props) {
    return (
        <div
            className="container py-5 d-flex justify-content-center"
            style={{ marginTop: navbarOffset }}
        >
            <div className="d-flex flex-column align-items-center w-100">
                <h1 className="display-4">Sign In</h1>
                <SignInForm />
            </div>
        </div>
    );
}
