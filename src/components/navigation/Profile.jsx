import React from 'react'
import ProfileIconDefault from '../../icons/navigation/ProfileIconDefault'
import ProfileIconActive from '../../icons/navigation/ProfileIconActive'
import { Link } from 'react-router'

const Profile = ({ isActive, handleClick, id, loggedUserId }) => {
  return (
    <>
        <Link to={`/profile/${loggedUserId}`} >
            <div onClick={() => handleClick(id)} className='transition p-3 lg:py-3 lg:pl-3 lg:pr-6 rounded-full flex items-center gap-6 hover:bg-hover-grey' >
                {
                    isActive ? <ProfileIconActive /> : <ProfileIconDefault />
                }
                <p className={`${isActive && 'font-bold'} hidden lg:block text-2xl `}>Profile</p>
            </div>
        </Link>
    </>
  )
}

export default Profile