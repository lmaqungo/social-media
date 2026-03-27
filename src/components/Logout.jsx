import React, { use } from 'react'
import BrainIcon from '../icons/BrainIcon'
import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { logout } from '../utils/queries'
import LoadingIndicator from './LoadingIndicator'

const Logout = () => {

  const navigate = useNavigate();

  const [logoutCheck, setLogoutCheck] = useState(false); 
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    await logout(setLogoutCheck, setLoading); 
  }
  
  useEffect(() => {
    if(logoutCheck){
      navigate('/login')
    }
  }, [logoutCheck])

  if(loading) {
    return <LoadingIndicator />
  }

  return (
    <div className='w-screen h-screen bg-gray-600 flex justify-center items-center ' >
      <div className='bg-black p-12 rounded-xl ' >
          <div className='flex flex-col items-center gap-4'>
            <BrainIcon height={55} width={44} />
            <div className='flex flex-col gap-4 w-3xs' >
              <button onClick={handleLogout} className='text-black font-bold bg-white py-2 cursor-pointer rounded-full transition hover:bg-hover-white' >Log out</button>
              <Link to='/' className='text-center border border-dark-grey rounded-full font-bold transition hover:bg-hover-grey py-2 ' >Cancel</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Logout