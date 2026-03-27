import Letter from "../icons/Letter"
import { useOutletContext } from "react-router"

const StartChat = () => {

  const {
    setShowNewChatModal
  } = useOutletContext()

  function showModal() {
    setShowNewChatModal(true)
  }

  return (
    <>
        <div className="w-full h-screen hidden lg:flex justify-center items-center" >
            <div className="flex flex-col items-center gap-12" >
            <Letter />
            <div className="flex flex-col gap-8" >
                <div className="flex flex-col items-center gap-2" >
                    <h1 className="text-xl font-bold" >Start Conversation</h1>
                    <p className="text-dark-grey" >Choose from your existing conversations, or start a new one</p>
                </div>
                <button onClick={showModal} className="font-semibold bg-white text-black py-2 rounded-full transition cursor-pointer hover:bg-hover-white self-center px-4 " >New chat</button>
            </div>
            </div>
        </div>
    </>
  )
}

export default StartChat