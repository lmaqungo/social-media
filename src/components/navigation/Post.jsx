import React from 'react'
import { Link } from 'react-router'
import PostIconActive from '../../icons/navigation/PostIconActive'
import PostIconDefault from '../../icons/navigation/PostIconDefault'
import PlusSign from '../../icons/PlusSign'

const Post = ({ isActive, handleClick, id }) => {
  return (
    <>
        <Link onClick={() => handleClick(id)} to='/post' className='lg:w-full sm:order-last' >
            <div className='sm:hidden w-min transition p-3 rounded-full hover:bg-hover-grey ' >
             {
                isActive ? <PostIconActive /> : <PostIconDefault />
             }
            </div>
            <div className="hidden sm:block font-bold text-2xl bg-white text-black lg:self-stretch p-2 rounded-full cursor-pointer transition text-center hover:bg-hover-white">
              <p className='hidden lg:block' >Post</p>
              <div className='lg:hidden' > 
                <PlusSign />
              </div>
            </div>
        </Link>
    </>
  )
}

export default Post