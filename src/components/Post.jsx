import React from 'react'
import ReplyBubble from '../icons/ReplyBubble'
import HeartIcon from '../icons/HeartIcon'
import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { likePost, unlikePost, } from '../utils/queries'
import { Link } from 'react-router'
import { extractIds } from '../utils/utils'
import ProfilePicture from './ProfilePicture'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'

const Post = ({ post }) => {

    const gf = new GiphyFetch('zdx9Wh2MzGXEPZtkKay4bSgXUbw4UXec');
    
    const [gif, setGif] = useState(null);

    useEffect(() => {
        async function fetchGif(){
            const { data } = await gf.gif(post.gifId)
            setGif(data)
        }
        post.gifId && fetchGif()
    }, [])

    useEffect(() => {
        console.log(`gif: ${gif}`)
    }, [gif])

    const {
        loggedUser, 
    } = useOutletContext()

    function initialLikeState() {
        const likedByIds = extractIds(post.likedBy); 
        return likedByIds.includes(loggedUser.id)
    }
    
    const [heartClicked, setHeartClicked] = useState(initialLikeState());
    const [postLikes, setPostLikes] = useState(post.likedBy.length);
    
    useEffect(() => {
        heartClicked ? likePost(setPostLikes, post.id) : postLikes > 0 && unlikePost(setPostLikes, post.id)
    }, [heartClicked])

    const heartClickHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        heartClicked ? setHeartClicked(false) : setHeartClicked(true);
    }

    function postDate() {
        return JSON.parse(post.postDate)
    } 
    /*Nice to have feature. Can work on this towards the end */

  return (
    <div className='p-4 border-t border-dark-grey cursor-pointer transition hover:bg-dark-grey-alternate ' >
        <Link to={`/posts/${post.id}`} className='flex gap-2' >
            <div className='self-start shrink-0 ' >
                <ProfilePicture user={post.author} size={41} />
            </div>
            <div className='flex flex-col gap-1 w-full' >
                <div className='flex flex-col gap-3  ' >
                    {/* header */}
                    <div className='flex gap-2 items-center ' >
                        <p className='font-bold' >{ post.author.username }</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="3px" viewBox="0 -960 960 960" width="3px" fill="#EFEFEF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        <p>{ `${postDate().day} ${postDate().month}` }</p>
                    </div>
                    {/* body*/}
                    <div className={`${post.content.length > 0 ? 'block' : 'hidden'}`} >
                        <p >{ post.content }</p>
                    </div>
                    <img className={`${post.attachmentURL ? 'block' : 'hidden'} rounded-md ` } src={post.attachmentURL} alt="attachment" />
                    <div className={`grid grid-cols-1 h-fit ${gif ? 'block' : 'hidden'}`} >
                        {
                            gif && <Gif gif={gif} noLink={true} hideAttribution={true} />
                        }
                    </div>
                </div>
                <div className='flex gap-5' >
                    <div className='flex gap-2 items-center' >
                        <ReplyBubble />
                        <p>{ post.replies.length }</p>
                    </div>
                    <div className='flex gap-2 items-center ' >
                        <HeartIcon heartClickHandler={heartClickHandler} isActive={heartClicked} />
                        <p>{ postLikes }</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Post