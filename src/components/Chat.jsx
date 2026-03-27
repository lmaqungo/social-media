import { useState, useEffect } from 'react'
import { getChats, getContacts } from '../utils/queries'
import ChatSearch from './fields/ChatSearch'
import ChatPreview from './ChatPreview'
import { Outlet } from 'react-router'
import { useOutletContext, useParams } from 'react-router'
import CancelIcon from '../icons/CancelIcon'
import ContactSearch from './fields/ContactSearch'
import { Link } from 'react-router'
import NewChatIconMobile from '../icons/NewChatIconMobile'
import NewChatIcon from '../icons/NewChatIcon'
import LoadingIndicator from './LoadingIndicator'
import ProfilePicture from './ProfilePicture'

const Chat = () => {

  const params = useParams();

  const [chats, setChats] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [showNewChatModal, setShowNewChatModal] = useState(false); 
  const [contacts, setContacts] = useState([]); 

  const [contactSearchResults, setContactSearchResults] = useState([]);
  const [chatsSearchResults, setChatsSearchResults] = useState([]);

  const [chatSearchActive, setChatSearchActive] = useState(false);

  const [chatOpen, setChatOpen] = useState(false)
  
  const {
    loggedUser
  } = useOutletContext()

  useEffect(() => {
    console.log(`Chat open: ${chatOpen}`)
  }, [chatOpen])

  function handleSearch(e){
    console.log(`input: ${e.target.value}`)
    if(e.target.value.length === 0) {
      setContactSearchResults(contacts)
    } else {
      setContactSearchResults(
        contacts.filter(contact => {
          return contact.username.startsWith(e.target.value)
        })
      )
    }
  }

  function handleChatsSearch(e) {
    if(e.target.value.length === 0) {
      setChatsSearchResults(chats)
    } else {
      setChatsSearchResults(
        chats.filter(chat => {
          return chat.recipient.username.startsWith(e.target.value)
        })
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getChats(setChats, setChatsSearchResults, setLoading)
      await getContacts(setContacts, setContactSearchResults)
    }
    fetchData()
  }, [])

  useEffect(() => {
      console.log(`chat open? ${chatOpen}`)
  }, [chatOpen])
  
  if(loading) {
    return <LoadingIndicator />
  }
  
  const contextObj = {
    loggedUser, 
    setShowNewChatModal, 
    setChatOpen
  }

  function closeModal(){
    setShowNewChatModal(false)
  }

  function showContactPreviews(){
    return contactSearchResults.map(contact => {
      return (
          <Link to={contact.chatId} >  
            <div onClick={() => {setShowNewChatModal(false); setChatOpen(true)}} className='flex gap-3 items-center transition rounded-lg px-1 hover:bg-hover-grey py-2 ' >
              <ProfilePicture user={contact} size={41} />
              <p className='font-bold' >{contact.username}</p>
            </div>
          </Link>
      )
    })
  }

  function showContacts() {
    return(
      <div className='absolute h-screen w-screen lg:w-auto sm:w-full sm:flex sm:flex-col sm:justify-center lg:left-2/7 sm:left-0 z-10 sm:border-l sm:border-dark-grey lg:border-none ' >
        <div className='py-5 px-7 w-full h-full lg:w-lg lg:h-9/10 lg:rounded-lg lg:border border-dark-grey-alternate-2 bg-black ' >
          <div className='flex flex-col gap-16' >
            <div className='flex flex-col gap-7' >
              <div className='flex justify-between items-center' >
                  <h1 className='font-bold text-xl' >New chat</h1>
                  <CancelIcon action={closeModal} />
              </div>
              <ContactSearch handleTyping={handleSearch}  />
            </div>
            <div className='flex flex-col' >
              {
                showContactPreviews()
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  function showExistingChats(){
    return (
      <div className='flex flex-col gap-5' >
        {      
          chats.map(chat => {
            return <ChatPreview setChatOpen={setChatOpen} chatObj={chat} />
          })
        }
      </div>
    )
  }

  function showChatSearchResults() {
    return(
      <div className='flex flex-col gap-4' >
        <p className='font-semibold text-dark-grey text-sm' >Chats</p>
        <div className='grid grid-cols-3 gap-1' >
          {
            chatsSearchResults.map(chat => contactCard(chat))
          }
        </div>
      </div>
    )
  }



  function contactCard(chatObj) {
    return (
      <Link to={chatObj.chat.id} >
        <div onClick={() => {setChatOpen(true)}} className='flex flex-col gap-1 items-center py-2 hover:bg-hover-grey rounded-md ' >
          <ProfilePicture user={chatObj.recipient} size={60} />
          <p className='text-sm' >{chatObj.recipient.username}</p>
        </div>
      </Link>
    )
  }

  return (
    <div className='w-full min-h-screen flex relative '>
      
        {
          showNewChatModal && showContacts()
        }
      
      <div className={`${chatOpen && 'hidden'} lg:block lg:min-w-sm min-w-full sm:border-x min-h-screen lg:fixed border-dark-grey`} >
          <div className='pt-8' >
            <div className='px-4 flex flex-col gap-4' >
                <div className='flex flex-col gap-6' >
                  <div className='flex justify-between items-center' >
                    <h1 className='font-bold text-xl' >Chat</h1>
                    <NewChatIcon action={() => {setShowNewChatModal(true)}} />
                  </div>
                  <ChatSearch handleTyping={handleChatsSearch} setChatSearchActive={setChatSearchActive} />
                </div>
                {
                  chatSearchActive? showChatSearchResults() : showExistingChats()
                }
            </div>
          </div>
      </div>
      <div className='lg:ml-96 w-full' >
        <Outlet context={contextObj} />
      </div>
      <div className={`absolute right-6 bottom-24 sm:hidden ${chatOpen && 'hidden'} `} >
          <NewChatIconMobile action={() => {setShowNewChatModal(true)}} />
      </div>
    </div>
  )
}

export default Chat