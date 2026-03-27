import React from 'react'
import SearchIconActive from '../../icons/navigation/SearchIconActive'
import SearchIconDefault from '../../icons/navigation/SearchIconDefault'
import { Link } from 'react-router'

const Search = ({ isActive, handleClick, id }) => {
  return (
    <>
        <Link to='/search' className='lg:hidden' >
            <div onClick={() => handleClick(id)} className='transition p-3 lg:py-3 lg:pl-3 lg:pr-6 rounded-full flex items-center gap-6 hover:bg-hover-grey' >
                {
                    isActive ? <SearchIconActive /> : <SearchIconDefault />
                }
                <p className={`${isActive && 'font-bold'} hidden lg:block text-2xl`}>Search</p>
            </div>
        </Link>
    </>
  )
}

export default Search