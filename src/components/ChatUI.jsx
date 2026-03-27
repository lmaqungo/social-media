import { useOutletContext, useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import {  getChat } from "../utils/queries"
import Circle from "../icons/Circle"
import { Link } from "react-router"
import Message from "./fields/Message"
import { newMessage } from "../utils/queries"
import BackIcon from "../icons/BackIcon"
import LoadingIndicator from "./LoadingIndicator"
import ProfilePicture from "./ProfilePicture"

const ChatUI = () => {

    const {
        loggedUser,
        setShowNewChatModal, 
        setChatOpen
    } = useOutletContext()

    const navigate = useNavigate();

    const { chatId } = useParams()

    const [loading, setLoading] = useState(true);
    const [recipient, setRecipient] = useState(null); 
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    
    useEffect(() => {
        setShowNewChatModal(false)
        const fetchData = async () => {
            await getChat(chatId, setMessages, setRecipient, setLoading)
        }
        fetchData()
    }, [chatId])
    
    useEffect(() => {
        console.log(`Message: ${messageInput}`)
    }, [messageInput])
    
    if(loading){
        return <LoadingIndicator />
    }
    
    window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
    })
    
    async function handleSubmit(e) {
        if(e.key === 'Enter' && !e.shiftKey){
            e.stopPropagation(); 
            e.preventDefault(); 
            await newMessage(chatId, messageInput, setMessages);
            clearMessageField()
        }
    }

    function clearMessageField(){
        const form = document.querySelector('#msg');
        form.reset()
    }

    function getTime(timeObj){
        return JSON.parse(timeObj).time
    }

    function renderMessages(){
        return messages.map(message => {
            return(
                <div className={`w-full flex ${message.authorId === loggedUser.id ? 'justify-end' : 'justify-start'}`} >
                    <div className={`sm:max-w-sm max-w-xs py-2 px-3  ${message.authorId === loggedUser.id ? 'bg-twitter-blue' : 'bg-dark-grey-alternate-2'} rounded-xl`} >
                        <div className="flex flex-col" >
                            <p>{ message.content }</p> 
                            <p className="self-end text-sm" >{ getTime(message.timeSent) }</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    function handleBackNavigation(){
        navigate('/chat'); 
        setChatOpen(false); 
    }

  return (
    <>
        <div id='body' className="w-full sm:border-x border-dark-grey lg:border-x-0 relative min-h-screen flex flex-col gap-20 justify-between " >
            <div className="flex flex-col gap-10" >
                <div className="px-5 py-2 lg:hidden flex gap-6 items-center transition bg-black hover:bg-hover-grey sticky top-0" >
                    <BackIcon type="custom" action={handleBackNavigation} />
                    <div className="flex gap-4 items-center" >
                        <ProfilePicture user={recipient} size={41} />
                        <p className="font-bold" >{recipient.username}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-10" >
                    <div className="sm:pt-10 w-full flex justify-center" >
                        <div className="w-screen sm:w-auto flex flex-col gap-12" >
                            <div className="flex flex-col items-center gap-6" >
                                <div className="flex flex-col items-center gap-5" >
                                    <ProfilePicture user={recipient} size={60} />
                                    <p className="font-bold text-lg" >{recipient.username}</p>
                                </div>
                                <Link to={`/profile/${recipient.id}`} className="font-semibold bg-white text-black py-1 px-4 rounded-full transition hover:bg-hover-white " >View profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 flex flex-col gap-4 pb-5" >
                        {
                            renderMessages()
                        }
                    </div>
                </div>
            </div>
            <div className="sticky bottom-14 sm:bottom-0 px-5 pb-5 w-full" >
                <Message setMessageInput={setMessageInput} submitFn={handleSubmit} /> 
            </div>
        </div>
    </>
  )
}

export default ChatUI