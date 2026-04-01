import Search from './fields/Search'
import BackIcon from '../icons/BackIcon'
import { useOutletContext } from 'react-router'
import SearchTabMenu from './SearchTabMenu'
import { useSearchParams } from "react-router"
import { useEffect, useState } from 'react'
import { search, getLoggedUser } from '../utils/queries'
import Post from './Post'
import ProfileTile from './ProfileTile'


const SearchResults = () => {

    const {
        searchInput, 
        setSearchInput, 
        setLoggedUser
    } = useOutletContext(); 

    const [searchParams, setSearchParams] = useSearchParams();
    const [activeMenuItem, setActiveMenuItem] = useState(0);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        search(searchParams, setPosts, setUsers);
    }, [searchParams])

    useEffect(() => {
        getLoggedUser(setLoggedUser, setLoading)
    }, [])

    function handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        searchParams.set('query', searchInput)
        setSearchParams(searchParams)
    }

    function renderPosts(){
        if(posts.length > 0){
            return(
                <div className='flex flex-col' >
                    {
                        posts.map(post => <Post post={post} />)
                    }
                </div>
            )
        } else {
            return (
                <div className='pt-5 flex justify-center' >
                    <p className='text-twitter-light-grey' >No results. Try a different keyword</p>
                </div>
            )
        }
    }

    function renderUsers(){
        if(users.length > 0) {
            return (
                <div className='flex flex-col' >
                    {
                        users.map(user => <ProfileTile user={user} /> )
                    }
                </div>
            )
        } else {
            return (
                <div className='pt-5 flex justify-center' >
                    <p className='text-twitter-light-grey' >No results. Try a different keyword</p>
                </div>
            )
        }
    }

    useEffect(() => {
        console.log(`post search results`)
        console.log(posts)
    }, [posts])

    useEffect(() => {
        console.log(`users search results`)
        console.log(users)
    }, [users])
    
  return (
    <div className='min-h-screen lg:w-3xl sm:border-x border-dark-grey' >
        <div className='flex flex-col gap-4 border-b border-dark-grey ' >
            <div className='px-4 pt-8 flex gap-5' >
                <BackIcon />
                <Search submitFn={handleSubmit} setSearchInput={setSearchInput} initialValue={searchInput} />
            </div>
            <SearchTabMenu activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>
        <div>
            {
                activeMenuItem === 0 ? renderPosts() : renderUsers()
            }
        </div>
    </div>
  )
}

export default SearchResults