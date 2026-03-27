import React from 'react'
import { useState, useEffect } from 'react'
import { extractIds } from '../utils/utils'
import { followUser, unfollowUser } from '../utils/queries'

const FollowButton = ({ loggedUser, user, setFollowers, followers }) => {

    function initialFollowStatus() {
        const followingIds = extractIds(loggedUser.following)
        return followingIds.includes(user.id)
    }

    const [followStatus, setFollowStatus] = useState(initialFollowStatus())

    function followClickHandler() {
        followStatus ? setFollowStatus(false) : setFollowStatus(true)
    }

    useEffect(() => {
        followStatus ? followUser(user.id, setFollowers) : followers > 0 && unfollowUser(user.id, setFollowers)
    }, [followStatus])

  return (
    <>
        <button onClick={followClickHandler}  className={`transition border ${followStatus ? 'bg-black text-white hover:bg-hover-grey ' : 'bg-white text-black hover:bg-hover-white '} self-end font-bold px-4 py-1 rounded-4xl cursor-pointer `}>{ followStatus? 'Following' : 'Follow' }</button>
    </>
  )
}

export default FollowButton