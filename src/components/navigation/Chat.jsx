import { Link } from "react-router"
import ChatIconActive from "../../icons/navigation/ChatIconActive"
import ChatIconDefault from "../../icons/navigation/ChatIconDefault"

const Chat = ({ isActive, handleClick, id  }) => {

  return (
    <>
        <Link to='/chat' >
            <div onClick={() => handleClick(id)} className='transition p-3 lg:py-3 lg:pl-3 lg:pr-6 rounded-full flex items-center gap-6 hover:bg-hover-grey' >
                {
                    isActive ? <ChatIconActive /> : <ChatIconDefault />
                }
                <p className={`${isActive && 'font-bold'} hidden lg:block text-2xl `}>Chat</p>
            </div>
        </Link>
    </>
  )
}

export default Chat