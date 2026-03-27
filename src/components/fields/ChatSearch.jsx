import CancelSearchIcon from "../../icons/CancelSearchIcon"


const ChatSearch = ({ handleTyping, setChatSearchActive }) => {

  function handleFocus(){
    setChatSearchActive(true)
  }

  function handleCancel() {
    setChatSearchActive(false)
    const form = document.querySelector('form'); 
    form.reset()
  }

  return (
    <>
        <form className='flex grow relative items-center ' >
            <input onChange={handleTyping} onFocus={handleFocus} className={`grow rounded-full pl-4 py-2 bg-dark-grey-alternate-2 focus:bg-black focus:outline focus:outline-twitter-blue `} type="text" placeholder='Search'/>
            <CancelSearchIcon action={handleCancel} className='absolute right-5' />
        </form>
    </>
  )
}

export default ChatSearch