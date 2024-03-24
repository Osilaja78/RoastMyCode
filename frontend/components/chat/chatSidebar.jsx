import Image from "next/image";
import PlusIcon from "@/public/icons/plusIcon.svg";
import Logo from "@/public/images/logo-only.png";

export default function ChatSidebarComponent() {
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
                <i>History</i>
            </div>
        </div>
    )
}