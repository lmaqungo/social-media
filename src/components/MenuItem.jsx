import React from 'react'
import { Link } from 'react-router'

const MenuItem = ({ content, url, isActive, handleClick, id }) => {

  return (
    <>
        <Link to={url} className={`${isActive && 'font-bold'} transition text-2xl py-3 pl-3 pr-6 rounded-full hover:bg-hover-grey`} onClick={() => handleClick(id)} >{ content }</Link>
    </>
  )
}

export default MenuItem