// signup page.
import SignupForm from "@/components/auth-forms/signupForm";
import Navbar from "@/components/navbar";


export default function SignupPage() {
    return (
        <>
            <Navbar home={false} />
            <hr />
            <SignupForm />
        </>
    )
}