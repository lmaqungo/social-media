import React from 'react'
import { useOutletContext, useParams } from 'react-router'
import BackIcon from '../icons/BackIcon'
import CalendarIcon from '../icons/CalendarIcon'
import { useState, useEffect } from 'react'
import { getUser, updateProfile, getLoggedUser } from '../utils/queries'
import Post from './Post'
import CancelIcon from '../icons/CancelIcon'
import Bio from './fields/Bio'
import Website from './fields/Website'
import FollowButton from './FollowButton'
import LoadingIndicator from './LoadingIndicator'
import ProfilePicture from './ProfilePicture'

const Profile = () => {

    const userId = useParams().userId

    const {
        loggedUser, 
        setLoggedUser
    } = useOutletContext()

    const initialUserValue = () => {
        if (loggedUser.id == userId) {
            return loggedUser
        } else{
            return null
        }
    }

    const initialLoadState = () => {
        if (loggedUser.id == userId) {
            return false
        } else{
            return true
        }
    }

    const initialPostsLoadState = () => {
        if (loggedUser.id == userId) {
            return false
        } else{
            return true
        }
    }

    function joinDate(){
        return JSON.parse(user.dateJoined)
    }

    const [user, setUser] = useState(initialUserValue()); 
    const [loading, setLoading] = useState(initialLoadState()); 
    const [loadingPosts, setLoadingPosts] = useState(initialPostsLoadState());
    const [userPosts, setUserPosts] = useState([]); 
    const [showEditLayout, setShowEditLayout] = useState(false);
    const [userBio, setUserBio] = useState(null);
    const [website, setWebsite] = useState(null);

    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);

    const [bioInput, setBioInput] = useState(''); 
    const [websiteInput, setWebsiteInput] = useState(''); 

    useEffect( () => {
        const fetchData = async () => {
            await getUser(userId, setUser, setLoading, setLoadingPosts, setUserPosts, setUserBio, setWebsite, setFollowers, setFollowing)
            await getLoggedUser(setLoggedUser, setLoading)
        }
        fetchData()
    }, [])

    if(loading) {
        return <LoadingIndicator />
    }

    function renderPosts() {
        return (
            <div className='border-b border-dark-grey' >
                {
                    userPosts.map(post => <Post post={post} />)
                }
            </div>
        )
    }

    function editProfileClickHandler() {
        setShowEditLayout(true)
    }

    function handleSave(){
        setUserBio(bioInput); 
        setWebsite(websiteInput)
        updateProfile(bioInput, websiteInput, userId);
        setShowEditLayout(false);
    }

    function actionButton(){
        if(userId == loggedUser.id){
            return(
                <button className='self-end transition border border-twitter-light-grey rounded-full font-bold py-1 px-4 cursor-pointer hover:bg-hover-grey' onClick={editProfileClickHandler}  >Edit profile</button>
            )
        } else {
            return <FollowButton loggedUser={loggedUser} user={user} setFollowers={setFollowers} followers={followers} />
        }
    }

    function mainLayout(){
        return(
            <>
                <div className='w-full flex flex-col border-b border-dark-grey' >
                    <div className='flex items-center gap-12 px-3 py-2' >
                        <BackIcon />
                        <h1 className='text-2xl font-bold' >{ user.username }</h1>
                    </div>
                    <div className='px-4 pb-4 flex flex-col gap-8' >
                        <div className='flex justify-between' >
                            <ProfilePicture user={user} size={95} />
                            {
                                actionButton()
                            }
                        </div>
                        <div>
                            <div className='flex flex-col gap-4' >
                                <p className='font-bold text-2xl' >{ user.username }</p>
                                <p className={`${!userBio && 'hidden'}`} >
                                    {
                                        userBio && userBio
                                    }
                                </p>
                                <a href={website} className={`${!website && 'hidden'} text-twitter-blue hover:underline self-start `} >
                                    { website }
                                </a>
                                <div className='flex gap-2 items-center' >
                                    <CalendarIcon />
                                    <p className=' text-twitter-light-grey ' >Joined { `${joinDate().month} ${joinDate().day} ` }</p>
                                </div>
                                <div className='flex gap-5' >
                                    <div className='flex gap-1' >
                                        <p className='font-bold' >{ following }</p>
                                        <p className=' text-twitter-light-grey ' >Following</p>
                                    </div>
                                    <div className='flex gap-1' >
                                        <p className='font-bold' >{ followers }</p>
                                        <p className=' text-twitter-light-grey ' >Followers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex' >
                        <div className='px-4 pt-4 transition hover:bg-hover-grey cursor-pointer' >
                            <p className='px-2 pb-3 border-b-3 border-blue-400 ' >Posts</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col' >
                    {
                        loadingPosts ? <p>Loading</p> : renderPosts()
                    }
                </div>
            </>
        )
    }

    function cancelBtnFn(){
        setShowEditLayout(false)
    }

    function editProfileLayout(){
        return(
            <>
                <div className='w-full px-4 pt-8 flex flex-col gap-4' >
                    <div className='flex justify-between items-center' >
                        <div className='flex gap-12 items-center' >
                            <CancelIcon action={cancelBtnFn} />
                            <h className='font-bold text-xl ' >Edit profile</h>
                        </div>
                        <button className='transition bg-white text-black font-bold self-center px-4 py-1 rounded-4xl cursor-pointer hover:bg-hover-white' onClick={handleSave} >Save</button>
                    </div>
                    <div className='flex flex-col gap-5' >
                        <Bio bioInput={bioInput} initialValue={userBio} setBioInput={setBioInput} />
                        <Website websiteInput={websiteInput} initialValue={website} setWebsiteInput={setWebsiteInput} />
                    </div>
                </div>
            </>
        )

    }

  return (
    <div className='lg:w-3xl min-h-screen sm:border-x border-dark-grey pb-30' >
        {
            showEditLayout? editProfileLayout() : mainLayout()
        }
    </div>
  )
}

export default Profile