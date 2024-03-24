"use client"
import { useParams, useRouter } from "next/navigation";
import ChatSidebarComponent from "@/components/chat/chatSidebar";
import SendIcon from "@/public/icons/sendIcon.svg";
import Image from "next/image";

export default function ChatPage() {

    // const router = useRouter();
    const params = useParams();
    const productId = params.chatId;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#0A0708] fixed inset-y-0 left-0 overflow-y-auto">
                <ChatSidebarComponent />
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 overflow-y-auto bg-[#444444]">
                <h1 className="text-center mt-5 text-[#B1B1B1] border max-w-max mx-auto rounded-xl px-3 py-1 shadow-2xl text-[15px]">New Chat</h1>
                <div className="w-[500px] flex fixed left-[26%] bottom-6 rounded-2xl h-26 p-4 bg-gray-800 text-white border border-gray-700 text-[10px]">
                    <textarea
                        className="w-full bg-gray-800 resize-none outline-none"
                        placeholder="Paste formatted code here..."
                    />
                    <Image src={SendIcon} alt="send" className=" cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}