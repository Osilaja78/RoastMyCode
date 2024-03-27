"use client"
import ChatSidebarComponent from "@/components/chat/chatSidebar";
import SendIcon from "@/public/icons/sendIcon.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useContext, useRef } from "react";
import { ColorRing } from "react-loader-spinner";
import { warn, baseApiUrl } from "@/app/layout";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "@/components/auth/AuthContext";
import ChatMessage from "@/components/chat/aiMessage";
import { useRouter } from "next/navigation";


export default function ChatPage() {

    const [ messages, setMessages ] = useState([]);
    const [ chatLoading, setChatLoading ] = useState(false);
    const [ code, setCode ] = useState("");
    const [ error, setError ] = useState("");
    const [ resultRes, setResultRes ] = useState("");
    const [ personality, setPersonality ] = useState("");

    const { accessToken } = useContext(AuthContext);

    const pathName = usePathname();
    const messagesEndRef = useRef(null);
    const router = useRouter();
    let recentRes = "";

    useEffect(() => {
        const fetchChat = async () => {
            setChatLoading(true);

            try {
                const response = await fetch(`${baseApiUrl}/chats/${pathName.split("/")[2]}/messages/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // Include the JWT token in the Authorization header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);
                    const msgs = data.map(message => ({ question: message.question, content: message.content }));
                    setMessages(msgs);
                    console.log(msgs);
                    setChatLoading(false);
                } else {
                    if (response.status === 401) {
                        router.push("/auth/signin");
                    }
                    console.log(response);
                    setChatLoading(false);
                }
                
            } catch (error) {
                console.error('Error fetching chat titles:', error);
                setChatLoading(false);
            }
        }

        fetchChat();
    }, []);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        setChatLoading(true);


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
                setResultRes(result);
                recentRes = result;

                // Add user message and AI response to messages list
                setMessages([
                    ...messages,
                    { question: code, content: result},
                ]);

                addUserChat();
            } else {
                const errorData = await response.json();
                console.log(errorData.detail);
            }
          
        setLoading(false);
        setCode("")
        } catch (err) { // Handle signin error.
            setChatLoading(false);
            setCode("")
        }
    };


    useEffect(() => {
        // Scroll to the last message when messages change or initially load
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const addUserChat = async () => {
        const chat_id = pathName.split("/")[2];

        try {
            const response = await fetch(`${baseApiUrl}/chats/${chat_id}/add-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Include the JWT token in the Authorization header
                },
                body: JSON.stringify({ chat_id, question: code, content: recentRes }),
            });

            if (!response.ok) {
                setError(response.message);
                console.log(response);
            }
            console.log(response);
        } catch (err) { // Handle signin error.
            setCode("")
        }
    }

    const handlePersonalityChange = (e) => {
        setPersonality(e.target.value);
    };


    // Error warning modal form React Toastify.
    if (error) {
		warn(`${error}`);
        setError('');
	}


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#0A0708] fixed inset-y-0 left-0 overflow-y-auto z-30">
                <ChatSidebarComponent />
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 overflow-y-auto bg-[#444444]">
                {/* Personality modal */}
                <div className="w-full pl-[300px] flex items-center gap-5 text-center bg-[#444444] shadow-2xl fixed top-0 p-3 text-[#B1B1B1] text-[15px]">
                    <label htmlFor="personality">Choose a Personality:</label>
                    <select
                        id="personality"
                        value={personality}
                        onChange={handlePersonalityChange}
                        className="block w-fit py-2 px-3 border border-gray-500 outline-none bg-[#444444] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="None">Neutral</option>
                        <option value="andrew_tate">Andrew Tate</option>
                        <option value="david_goggins">David Goggins</option>
                        <option value="jack_sparrow">Jack Sparrow</option>
                        {/* Add more personality options as needed */}
                    </select>
                </div>
                {/* Display Messages */}
                <div className="space-y-4 mt-16 mb-32 max-w-[600px] right-0 left-[50%] mx-auto pl-[50px]">
                    {messages && messages.map((message, index) => (
                        <div key={index}>
                            <ChatMessage content={message.question} isUser={true} />
                            <ChatMessage content={message.content} isUser={false} />
                        </div>
                    ))}
                </div>
                <div ref={messagesEndRef} />
                <div className="w-fit right-0 left-[38%] flex fixed bottom-6 rounded-2xl h-26 p-4 bg-gray-800 text-white border border-gray-700 text-[10px]">
                    <textarea
                        className="w-[450px] bg-gray-800 resize-none outline-none"
                        placeholder="Paste formatted code here..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {chatLoading === false ?
                    <Image src={SendIcon} alt="send" onClick={handleSendMessage} className="cursor-pointer"/>
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
            <ToastContainer />
        </div>
    )
}
