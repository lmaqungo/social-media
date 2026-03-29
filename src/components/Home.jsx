import React from 'react'
import Posts from './Posts'
import Search from './fields/Search'
import { useOutletContext } from 'react-router'
import { useNavigate, createSearchParams } from 'react-router';
import { useEffect } from 'react';


const Home = () => {

  const navigate = useNavigate();

  const {
    searchInput,
    setSearchInput, 
    setActiveMenuItem
  } = useOutletContext()

  function handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: createSearchParams({ query: searchInput }).toString(),
    });
  }

  useEffect(() => {
    setActiveMenuItem(0)
  }, [])

  return (
    <div className='flex w-full pr-2 '>
        <div className='sm:border-x min-h-screen border-dark-grey pb-30 w-full lg:w-auto ' >
          <div className='pt-8 w-screen sm:w-auto lg:w-2xl border-b border-dark-grey' >
              <Posts />
          </div>
        </div>
        <div className='h-min sticky top-0 grow' >
          <div className='hidden xl:block pl-4 pt-8 w-full' >
            <Search submitFn={handleSubmit} setSearchInput={setSearchInput} initialValue={''} />
          </div>
        </div>
    </div>
  )
}

export default Home