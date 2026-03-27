

const SearchTab = ({ content, isActive, handleClick, id }) => {
  return (
    <>
        <div onClick={() => handleClick(id, content.toLowerCase())}  className='px-4 pt-4 transition hover:bg-hover-grey cursor-pointer'>
            <p className={`px-2 pb-3 select-none  ${isActive && 'border-b-3 border-blue-400' }`} >{ content }</p>
        </div>
    </>
  )
}

export default SearchTab