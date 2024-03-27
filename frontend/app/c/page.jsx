"use client"
import ChatSidebarComponent from "@/components/chat/chatSidebar";
import Image from "next/image";
import PlusIcon from "@/public/icons/plusIcon.svg";
import CreateChatPopup from "@/components/popup";
import Popup from "reactjs-popup";


export default function ChatPage() {

    const createButton = <div className="flex p-5 gap-3">
                            <Image src={PlusIcon} alt="new-chat"/>
                            <button className="text-[12px]">Start New Chat</button>
                        </div>


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#0A0708] fixed inset-y-0 left-0 overflow-y-auto z-30">
                <ChatSidebarComponent />
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 overflow-y-auto bg-[#444444]">
                <div className="max-w-max flex fixed left-[53%] bottom-6 rounded-2xl h-26 bg-gray-800 text-white border border-gray-700 text-[10px]">
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
                </div>
            </div>
        </div>
    )
}
