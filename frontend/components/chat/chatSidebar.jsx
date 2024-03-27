"use client"
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import PlusIcon from "@/public/icons/plusIcon.svg";
import Logo from "@/public/images/logo-only.png";
import { baseApiUrl } from "@/app/layout";
import { AuthContext } from "../auth/AuthContext";
import { ColorRing } from "react-loader-spinner";
import Link from "next/link";


export default function ChatSidebarComponent() {

    const [ chats, setChats ] = useState([]);
    const [ titleLoading, setTitleLoading ] = useState(false);

    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchChatTitles = async () => {
            setTitleLoading(true);

            try {
                const response = await fetch(`${baseApiUrl}/user-chat`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // Include the JWT token in the Authorization header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setChats(data);
                    setTitleLoading(false);
                } else {
                    console.log(response);
                    setTitleLoading(false);
                }
                
            } catch (error) {
                console.error('Error fetching chat titles:', error);
            }
        };

        fetchChatTitles();
    }, []);


    return (
        <div className="p-5">
            <div className="flex items-center gap-2">
                <Image src={Logo} width={40} alt="logo" />
                <p className="text-[20px] text-white">RoastMyCode</p>
            </div>
            <button className="px-4 mt-5 py-2 gap-2 text-[#B1B1B1] flex items-center border border-[#B1B1B1] rounded-xl max-w-max mx-auto">
                <Image src={PlusIcon} alt="new-chat"/>
                New Chat
            </button>
            <div className="mt-10 text-[#B1B1B1]">
                <p className="mb-5 text-[15px]">Chat History</p>
                <hr />
                {
                    titleLoading ?
                    <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    :
                    <ul>
                    {chats && chats.map((chat, index) => (
                        <li className="mt-3" key={index}><Link href={`/c/${chat.chat_id}`}>{chat.title}</Link></li>
                    ))}
                </ul>
                }
            </div>
        </div>
    )
}