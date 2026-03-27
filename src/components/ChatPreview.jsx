import { Link } from "react-router"
import Circle from "../icons/Circle"
import { useOutletContext } from "react-router"
import { useState, useEffect } from "react"
import { getChatMember } from "../utils/queries"

const ChatPreview = ({ chatObj, setChatOpen }) => {

    function getMostRecentMessage() {
        const lastIndex = chatObj.chat.messages.length - 1;
        return chatObj.chat.messages[lastIndex].content;
    }

    function truncate(inputString) {
        if(inputString.length > 30) {
            const msg = inputString.slice(0, 30).trim(); 
            return `${msg}...`
        } else{
            return inputString
        }
    }

  return (
    <>
    <Link to={chatObj.chat.id} >
        <div onClick={() => {setChatOpen(true)}} className="flex gap-5 w-full" >
            <div className="" >
                <Circle size={60} />
            </div>
            <div className="border-b border-dark-grey w-full" >
                <div className="flex flex-col gap-1 " >
                    <p className="font-bold" >{chatObj.recipient.username}</p>
                    <p className=" text-twitter-light-grey" >{truncate(getMostRecentMessage())}
                    </p>
                </div>
            </div>
        </div>
    </Link>
    </>
  )
}

export default ChatPreview