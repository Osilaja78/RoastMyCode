"use client"
import { useState, useEffect, useRef } from "react";
import SendIcon from "@/public/icons/sendIcon.svg";
import Image from "next/image";
import ChatMessage from "@/components/chat/aiMessage";
import { baseApiUrl } from "@/app/layout";
import Logo from "@/public/images/logo-only.png";
import { ColorRing } from "react-loader-spinner";
import Link from "next/link";


export default function ChatPage() {

    const [messages, setMessages] = useState([]);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        setLoading(true);

        const personality = "None";

        try {
            const response = await fetch(`${baseApiUrl}/ask_gpt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, personality }),
            });
          
            if (response.ok) {
                const data = await response.json();
                const result = data.response;
                // Add user message and AI response to messages list
                setMessages([
                    ...messages,
                    { content: code, isUser: true },
                    { content: result, isUser: false },
                ]);
            } else {
                const errorData = await response.json();
                console.log(errorData.detail);
            }
          
        setLoading(false);
        setCode("")
        } catch (err) { // Handle signin error.
            setLoading(false);
            setCode("")
        }
    };

    useEffect(() => {
        // Scroll to the last message when messages change or initially load
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <div className="flex h-screen w-screen text-white fixed">
            {/* Main Chat Interface */}
            <div className="flex-1 overflow-y-auto bg-[#444444]">
                <div className="bg-[#444444] flex gap-10 items-center fixed top-0 w-full shadow-2xl">
                    <div className="flex items-center gap-2 ml-10">
                        <Image src={Logo} width={40} alt="logo" />
                        <Link href="/"><p className="text-[20px] text-white">RoastMyCode</p></Link>
                    </div>
                    <h1 className="text-center p-3 text-[#B1B1B1] text-[15px]">New Chat</h1>
                </div>
                {/* Display Messages */}
                {messages && messages.length === 0 ? <div className="text-center text-[30px] text-[#B1B1B1] mt-[250px]">Roast My Code</div> : ''}
                <div className="space-y-4 mt-16 mb-32 max-w-[700px] mx-auto">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} content={message.content} isUser={message.isUser} />
                    ))}
                </div>
                <div ref={messagesEndRef} />
                <div className="w-[550px] flex fixed left-[30%] bottom-6 rounded-2xl h-26 p-4 bg-gray-800 text-white border border-gray-700 text-[15px]">
                    <textarea
                        className="w-full bg-gray-800 resize-none outline-none"
                        placeholder="Paste formatted code here..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {loading === false ?
                    <Image src={SendIcon} alt="send" onClick={handleSendMessage} className=" cursor-pointer"/>
                    :
                    <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    }
                </div>
            </div>
        </div>
    )
}
