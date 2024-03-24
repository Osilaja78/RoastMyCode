// Popup notification for usrs when creating a new whiteboard.
import { React, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { warn, baseApiUrl } from "@/app/layout";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./auth/AuthContext";


export default function CreateChatPopup() {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ title, setTitle ] = useState("");
    const router = useRouter();

    const { accessToken } = useContext(AuthContext);

    // Action taken when continue button is clicked.
    const handleCreateChat = async () => {
        setIsLoading(true);
        // Make a request to the backend to create a new board and get the board ID
        try {
            const response = await fetch(`${baseApiUrl}/new-chat?chat_title=${title}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Include the JWT token in the Authorization header
                },
            });
            const data = await response.json();
    
            router.push(`/c/${data.chat_id}`);
        } catch (err) { // handle API errors.
            warn(err);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl p-10 max-w-[400px] flex flex-col">
            <h1 className="text-[30px] text-center pb-5">Enter a title for your chat.</h1>
            <input
                className=" outline-none mb-5 max-w-max mx-auto border p-3 rounded-2xl"
                type="text"
                placeholder="Enter chat title..."
                onChange={(e) => setTitle(e.target.value)} 
            />
            <div className="max-w-max mx-auto flex flex-row gap-5">
                <button className="bg-blue-600 text-white mx-auto py-3 px-5 rounded-xl" onClick={handleCreateChat}>{isLoading == false ? 'Continue' : 'Loading...'}</button>
            </div>
            <ToastContainer />
        </div>
    )
}