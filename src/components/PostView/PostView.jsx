import { useState } from 'react'
import { useParams } from 'react-router'
import BackIcon from '../../icons/BackIcon'
import Circle from '../../icons/Circle'
import ReplyBubble from '../../icons/ReplyBubble'
import HeartIcon from '../../icons/HeartIcon'
import { useOutletContext } from 'react-router'
import LoadingIndicator from '../LoadingIndicator'
import { Link } from 'react-router'
import ProfilePicture from '../ProfilePicture'
import { Gif } from '@giphy/react-components'
import usePostData from './hooks/usePostData'
import useReplies from './hooks/useReplies'
import Replies from './components/Replies'
import createNewReply from './handlers/postReply'
import { likePostAction, unlikePostAction } from './handlers/toggleLike'

const PostView = () => {

    const postId = useParams().postId; 

    const {
        loggedUser,
    } = useOutletContext()

    const { post, 
            gif, 
            setPost, 
            loading 
    } = usePostData(postId)

    const { replies, setReplies , repliesLoading } = useReplies(postId)

    const [userReply, setUserReply] = useState('');  

    function handleReplyTyping(e) {
        setUserReply(e.target.value)
    }

    const heartClickHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        /*
        Call setPost to change post state
        Make api request
        rollback if request fails
        */
       const likeStatus = post.likedBy.map(user=> user.likedById).includes(loggedUser.id)
       if (!likeStatus){
           await likePostAction(setPost, post.id, loggedUser.id)
        } else {
           await unlikePostAction(setPost, post.id, loggedUser.id)
       }
    }

    function postDate() {
        return JSON.parse(post.postDate)
    } 

    if (loading) {
        return (
            <LoadingIndicator />
        )
    }

    function clearTextarea() {
        const textarea = document.querySelector('textarea'); 
        textarea.value = ''
    }

    function replyClickHandler() {
        createNewReply(postId, userReply, setReplies)
        clearTextarea()
    }

  return (
    <div className='max-w-3xl min-h-screen sm:border-x border-dark-grey pb-30 '>
        <div className={`w-full  border-b border-dark-grey flex flex-col`} >
            <div className='flex items-center gap-12 px-3 py-2' >
                <BackIcon />
                <h1 className='text-2xl font-bold ' >Post</h1>
            </div>
            <div className='px-4 pb-4 flex flex-col gap-4' >
                <Link to={`/profile/${post.author.id}`} className='w-min' >
                    <div className='font-bold flex gap-4 items-center' >
                        <div className='shrink-0' >
                            <ProfilePicture user={post.author} size={41} />
                        </div>
                        <p className='text-nowrap' >{ post.author.username }</p>
                    </div>
                </Link>
                <div className={`${post.content.length > 0 ? 'block' : 'hidden'}`} >
                    <p>{post.content}</p>
                </div>
                <img className={`${post.attachmentURL ? 'block' : 'hidden'} rounded-md ` } src={post.attachmentURL} alt="attachment" />
                {
                    gif && <Gif gif={gif} noLink={true} hideAttribution={true} width={300} />
                }
                <div className='flex gap-2 text-twitter-light-grey items-center' >
                    <p>{postDate().time}</p>
                    <Circle size={3} className='fill-twitter-light-grey' />
                    <p>{`${postDate().day} ${postDate().month} ${postDate().year}`}</p>
                </div>
                <div className='py-4 border-y-2 border-dark-grey' >
                    <div className='flex gap-16' >
                        <div className='flex gap-2 items-center' >
                            <ReplyBubble />
                            <p>{ replies.length }</p>
                        </div>
                        <div className='flex gap-2 items-center ' >
                            <HeartIcon heartClickHandler={heartClickHandler} isActive={post.likedBy.map(user=> user.likedById).includes(loggedUser.id)} />
                            <p className='select-none ' >{ post.likedBy.length }</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2' >
                    <div className='shrink-0' >
                        <ProfilePicture user={loggedUser} size={41} />
                    </div>
                    <div className='flex flex-col grow gap-4' >
                        <textarea onChange={handleReplyTyping} className='p-2 resize-none  overflow-hidden field-sizing-content  focus:[outline:none]' placeholder='Post your reply' >
                        </textarea>
                        <div className='flex self-end' >
                            <button className={`transition py-2 px-4 border rounded-4xl text-black font-bold hover:bg-hover-white cursor-pointer ${ userReply.length === 0 ? 'bg-dark-grey pointer-events-none' : 'bg-white'}`} onClick={replyClickHandler}  >Reply</button>
                        </div>
                    </div>
                </div>
            </div>
            <Replies replies={replies}  repliesLoading={repliesLoading} />
        </div>
    </div>
  )
}

export default PostView