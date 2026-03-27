import { useState } from 'react'
import SearchTab from './SearchTab';
// import { useSearchParams } from "react-router"

const SearchTabMenu = ({searchParams, setSearchParams, activeMenuItem, setActiveMenuItem}) => {

    // const [activeMenuItem, setActiveMenuItem] = useState(0); 
    // const [searchParams, setSearchParams] = useSearchParams();

    function handleClick(id, content) {
        setActiveMenuItem(id); 
        searchParams.set('filter', content)
        setSearchParams(searchParams)
    }

    function menuItems() {
        const items = ['Posts', 'People']
        return items.map((item, index) => {
            return <SearchTab content={item} id={index} isActive={activeMenuItem === index} handleClick={handleClick} />
        })
    }

  return (
    <div className='flex'>
        {
            menuItems()
        }
    </div>
  )
}

export default SearchTabMenu