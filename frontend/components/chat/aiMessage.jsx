// ChatMessage.js
import React from 'react';
import Image from 'next/image';
import AiBot from '@/public/icons/aiBotWhite.svg';
import UserIcon from '@/public/icons/userIcon.svg';
import ReactMarkdown from 'react-markdown';


const ChatMessage = ({ content, isUser }) => {
  return (
    <div className="flex max-w-[600px] mx-auto text-[13px] pb-5">
      <div className="flex gap-4 items-start">
        {isUser ? 
            <Image src={UserIcon} alt='AI-Image'/>
        :
            <Image src={AiBot} alt='AI-Image'/>
        }
        <div>
            <ReactMarkdown >{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
