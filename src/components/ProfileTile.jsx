import React from 'react'
import Circle from '../icons/Circle'
import { useOutletContext } from 'react-router'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { followUser, unfollowUser } from '../utils/queries'
import { extractIds } from '../utils/utils'

const ProfileTile = ({ user }) => {

    const {
        loggedUser
    } = useOutletContext()

    function initialFollowStatus() {
        const followingIds = extractIds(loggedUser.following); 
        return followingIds.includes(user.id)
    }

    const [following, setFollowing] = useState(initialFollowStatus());

    function followClickHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        following ? setFollowing(false) : setFollowing(true);
    }

    useEffect(() => {
        following ? followUser(user.id) : unfollowUser(user.id)
    }, [following])

  return (
    <div className='py-3 px-4 cursor-pointer transition hover:bg-dark-grey-alternate ' >
        <Link to={`/profile/${user.id}`} >
            <div className='flex justify-between items-center' >
                <div className='flex gap-4 items-center' >
                    <Circle size={48} />
                    <h1 className='font-bold' >{ user.username }</h1>
                </div>
                <button onClick={followClickHandler}  className={`transition border ${following ? 'bg-black text-white hover:bg-hover-grey ' : 'bg-white text-black hover:bg-hover-white '}  font-bold px-4 py-1 rounded-4xl cursor-pointer `}>{ following? 'Following' : 'Follow' }</button>
            </div>
        </Link>
    </div>
  )
}

export default ProfileTile