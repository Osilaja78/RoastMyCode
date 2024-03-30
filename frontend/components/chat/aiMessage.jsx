// ChatMessage.js
import React from 'react';
import Image from 'next/image';
import AiBot from '@/public/icons/aiBotWhite.svg';
import UserIcon from '@/public/icons/userIcon.svg';
import Markdown from 'markdown-to-jsx';


const ChatMessage = ({ content, isUser }) => {

  return (
    <div className="flex mx-auto pb-5 text-white text-[15px]">
      <div className="flex gap-4 items-start">
        {isUser ? 
            <Image src={UserIcon} alt='AI-Image'/>
        :
            <Image src={AiBot} alt='AI-Image'/>
        }
        <div className='w-[600px]'>
            {/* <ReactMarkdown children={content}/> */}
            <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
