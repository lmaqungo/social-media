import { useState, useEffect } from 'react'

const Search = ({ setSearchInput, submitFn, initialValue }) => {

    const [active, setActive] = useState(false);
    // const [searchInput, setSearchInput] = useState('');

    function handleClick() {
        setActive(true)
    }

    function handleFocusOut() {
        setActive(false)
    }

    function handleTyping(e) {
        setSearchInput(e.target.value)
    }

  return (
    <>
        <form onSubmit={submitFn} className='flex grow' >
            <input onClick={handleClick} onChange={handleTyping} onBlur={handleFocusOut}  className={` grow resize-none pl-4 py-2 pr-12 rounded-full border-none outline ${active? 'outline-2 outline-twitter-blue' : ' outline-twitter-light-grey'}`} defaultValue={initialValue} type="text" placeholder='Search'/>
        </form>
    </>
  )
}

export default Search