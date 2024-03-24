// Main hero section for homepage.
import Lottie from "lottie-react";
import Popup from 'reactjs-popup';
import CreateChatPopup from "./popup";
import 'reactjs-popup/dist/index.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { baseApiUrl } from "@/app/layout";
import HeroCodeAnimation from "@/public/animations/hero-code";


export default function HeroSection() {

    const [ isClient, setIsClient ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const createButton = <button className={`bg-red-500 rounded-xl px-5 py-4 text-white mt-2 ${isLoading ? 'disabled' : ''}`}>{isLoading == false ? 'Start a chat' : 'Loading...'}</button>

    useEffect(() => {
        setIsClient(true);
    })
    const router = useRouter();

    const handleSignupRedirect = () => {
        router.push("/auth/signup");
    }

    const handleQuickRoastButttonClick = () => {
        router.push("/c/new");
    }

    // Action taken when user wants to create a new board.
    const handleCreateChat = async () => {
        setIsLoading(true);
        // Make a request to the backend to create a new board and get the board ID
        const response = await fetch(`${baseApiUrl}/new-chat/`, {
        method: 'POST',
        });
        const data = await response.json();

        // redirect user to their newly created whiteboard.
        router.push(`/whiteboard/${data.board_id}?h=true`);
        setIsLoading(false);
    };


    return (
        <div className="md:flex items-center w-[80%] md:w-[100%] max-w-[1000px] mx-auto gap-10 mt-[40px] md:mt-[70px] pb-[135px] text-white">
            <div className="max-w-[650px] text-center md:text-left pt-20">
                <h1 className="text-[20px] md:text-[40px]">Receive Constructive Criticism, Improve Your Code, and Learn Best Practices</h1>
                <h2 className="text-[20px] mt-3">Roast My Code — the ultimate platform for developers to receive constructive criticism on their code snippets.</h2>
                {isClient && isLoggedIn == false ?
                    <div className="flex gap-5">
                        <button className={`bg-red-500 shadow-2xl rounded-xl px-5 py-3 text-white mt-2 ${isLoading ? 'disabled' : ''}`} onClick={handleSignupRedirect}>{isLoading == false ? 'Get Started' : 'Loading...'}</button>
                        <button className={`bg-blue-700 shadow-2xl rounded-xl px-5 py-3 text-white mt-2 ${isLoading ? 'disabled' : ''}`} onClick={handleQuickRoastButttonClick}>{isLoading == false ? 'Quick Roast!' : 'Loading...'}</button>
                    </div>
                :
                <Popup 
                    trigger={createButton} 
                    modal
                    contentStyle={{
                        maxWidth: '400px',
                        borderRadius: '20px'
                    }}
                >
                    <CreateChatPopup />
                </Popup>
                }
            </div>
            <div>
                <Lottie animationData={HeroCodeAnimation} className='max-w-[800px]'/>
            </div>
        </div>
    )
}