import React from 'react'
import Circle from '../icons/Circle'
import HeartIcon from '../icons/HeartIcon'
import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { extractIds } from '../utils/utils'
import { likeReply, unlikeReply } from '../utils/queries'
import ProfilePicture from './ProfilePicture'

const Reply = ({ reply }) => {
  
  const {
    loggedUser
  } = useOutletContext()

  const [heartClicked, setHeartClicked] = useState(initialLikeState())
  const [replyLikes, setReplyLikes] = useState(reply.likedBy.length)


  function postDate() {
        return JSON.parse(reply.postDate)
  }

  function initialLikeState() {
    const likedByIds = extractIds(reply.likedBy); 
    return likedByIds.includes(loggedUser.id); 
  }

  const heartClickHandler = () => {
    heartClicked ? setHeartClicked(false) : setHeartClicked(true)
  } 

  useEffect(() => {
      heartClicked ? likeReply(setReplyLikes, reply.id) : replyLikes > 0 && unlikeReply(setReplyLikes, reply.id)
  }, [heartClicked])


  

  return (
        <div className='p-4 border-t border-dark-grey cursor-pointer transition hover:bg-dark-grey-alternate ' >

          <div className='flex gap-4' >
            <span className='self-start' >
              <ProfilePicture user={reply.author} size={41} />
            </span>
            <div className='flex flex-col gap-5' >
                <div className='flex flex-col gap-3' >
                    {/* header */}
                    <div className='flex gap-2 items-center ' >
                        <p className='font-bold' >{ reply.author.username }</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="3px" viewBox="0 -960 960 960" width="3px" fill="#EFEFEF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        <p>{ `${postDate().day} ${postDate().month}` }</p>
                    </div>
                    {/* body*/}
                    <div>
                        <p>{ reply.content }</p>
                    </div>
                </div>
                <div className='flex gap-5' >
                    <div className='flex gap-2 items-center ' >
                        <HeartIcon heartClickHandler={heartClickHandler} isActive={heartClicked} />
                        <p className='select-none ' >{ replyLikes }</p>
                    </div>
                </div>
            </div>
          </div>
        
      
    </div>
  )
}

export default Reply