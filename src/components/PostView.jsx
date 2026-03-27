import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getPost } from '../utils/queries'
import BackIcon from '../icons/BackIcon'
import Circle from '../icons/Circle'
import ReplyBubble from '../icons/ReplyBubble'
import HeartIcon from '../icons/HeartIcon'
import { useOutletContext } from 'react-router'
import { likePost, unlikePost, newReply } from '../utils/queries'
import Reply from './Reply'
import LoadingIndicator from './LoadingIndicator'
import { Link } from 'react-router'
import ProfilePicture from './ProfilePicture'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'

const PostView = () => {

    const postId = useParams().postId; 

    const gf = new GiphyFetch('zdx9Wh2MzGXEPZtkKay4bSgXUbw4UXec');

    const [gif, setGif] = useState(null)
    

    const {
        loggedUser,
    } = useOutletContext()

    const [post, setPost] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [postLikes, setPostLikes] = useState(null); 
    const [heartClicked, setHeartClicked] = useState(null); 
    const [replies, setReplies] = useState([]); 

    const [userReply, setUserReply] = useState(''); 

    function handleReplyTyping(e) {
        setUserReply(e.target.value)
    }

    useEffect(() => {
        console.log(`length of reply: ${userReply.length}`)
    }, [userReply])

    const heartClickHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        heartClicked ? setHeartClicked(false) : setHeartClicked(true);
    }

    useEffect(() => {
        getPost(postId, setPost, setLoading, setPostLikes, loggedUser, setHeartClicked, setReplies)
    }, [])

    useEffect(() => {
        async function fetchGif(){
            const { data } = await gf.gif(post.gifId)
            setGif(data)
        } 
        if(post){
            post.gifId && fetchGif()
        }
    }, [post])

    useEffect(() => {
        console.log(gif)
    }, [gif])

    function postDate() {
        return JSON.parse(post.postDate)
    } 

    useEffect(() => {
            heartClicked ? likePost(setPostLikes, post.id) : postLikes > 0 && unlikePost(setPostLikes, post.id)
        }, [heartClicked])

    if (loading) {
        return (
            <LoadingIndicator />
        )
    }

    function renderReplies() {
        return replies.map(reply => <Reply reply={reply} />)
    }

    function clearTextarea() {
        const textarea = document.querySelector('textarea'); 
        textarea.value = ''
    }

    function replyClickHandler() {
        newReply(setReplies, userReply, postId, setLoading)
        clearTextarea();
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
                            <p>{ post.replies.length }</p>
                        </div>
                        <div className='flex gap-2 items-center ' >
                            <HeartIcon heartClickHandler={heartClickHandler} isActive={heartClicked} />
                            <p className='select-none ' >{ postLikes }</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2' >
                    <ProfilePicture user={loggedUser} size={41} />
                    <div className='flex flex-col grow gap-4' >
                        <div className='flex' >
                            <textarea onChange={handleReplyTyping} className='p-2 resize-none max-w-2xl overflow-hidden field-sizing-content  focus:[outline:none]' placeholder='Post your reply' >
                            </textarea>
                        </div>
                        <div className='flex self-end' >
                            <button className={`transition py-2 px-4 border rounded-4xl text-black font-bold hover:bg-hover-white cursor-pointer ${ userReply.length === 0 ? 'bg-dark-grey pointer-events-none' : 'bg-white'}`} onClick={replyClickHandler}  >Reply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    replies.length > 0 &&  renderReplies()
                }
            </div>
        </div>
    </div>
  )
}

export default PostView