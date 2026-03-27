import React from 'react'
import { Link } from 'react-router'
import HomeIconActive from '../../icons/navigation/HomeIconActive'
import HomeIconDefault from '../../icons/navigation/HomeIconDefault'

const Home = ({ isActive, handleClick, id }) => {

  return (
    <>
        <Link to='/'>
            <div onClick={() => handleClick(id)} className='transition p-3 lg:py-3 lg:pl-3 lg:pr-6 rounded-full flex items-center gap-6 hover:bg-hover-grey' >
                {
                    isActive ? <HomeIconActive /> : <HomeIconDefault />
                }
                <p className={`${isActive && 'font-bold'} hidden lg:block text-2xl`}>Home</p>
            </div>
        </Link>
    </>
  )
}

export default Home