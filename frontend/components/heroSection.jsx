// Main hero section for homepage.
import Lottie from "lottie-react";
import 'reactjs-popup/dist/index.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { useRouter } from "next/navigation";
import HeroCodeAnimation from "@/public/animations/hero-code";


export default function HeroSection() {

    const [ isClient, setIsClient ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);


    useEffect(() => {
        setIsClient(true);
    })

    const router = useRouter();

    const handleSignupRedirect = () => {
        setIsLoading(true);
        router.push("/auth/signup");
        setIsLoading(false);
    }

    const handleQuickRoastButttonClick = () => {
        setIsLoading(true);
        router.push("/c/new");
        setIsLoading(false);
    }

    const handleStartChatButtonClick = () => {
        setIsLoading(true);
        router.push("/c");
        setIsLoading(false);
    }


    return (
        <div className="md:flex items-center w-[80%] md:w-[100%] max-w-[1000px] mx-auto gap-10 mt-[40px] md:mt-[70px] pb-[135px] text-white">
            <div className="max-w-[650px] text-center md:text-left pt-20">
                <h1 className="text-[20px] leading-[50px] py-0 md:text-[40px]">Receive Constructive Criticism, Improve Your Code, and Learn Best Practices</h1>
                <h2 className="text-[20px] mt-3">Roast My Code — the ultimate platform for developers to receive constructive criticism on their code snippets.</h2>
                {isClient && isLoggedIn == false ?
                    <div className="flex gap-5">
                        <button className={`bg-red-500 shadow-2xl rounded-xl px-5 py-3 text-white mt-2 ${isLoading ? 'disabled' : ''}`} onClick={handleSignupRedirect}>{isLoading == false ? 'Get Started' : 'Loading...'}</button>
                        <button className={`bg-blue-700 shadow-2xl rounded-xl px-5 py-3 text-white mt-2 ${isLoading ? 'disabled' : ''}`} onClick={handleQuickRoastButttonClick}>{isLoading == false ? 'Quick Roast!' : 'Loading...'}</button>
                    </div>
                :
                <button className={`bg-red-500 rounded-xl px-5 py-4 text-white mt-2 ${isLoading ? 'disabled' : ''}`} onClick={handleStartChatButtonClick}>{isLoading == false ? 'Start a chat' : 'Loading...'}</button>
                }
            </div>
            <div>
                <Lottie animationData={HeroCodeAnimation} className='max-w-[800px]'/>
            </div>
        </div>
    )
}