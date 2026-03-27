import React from 'react'

const ContactSearch = ({ handleTyping }) => {

  return (
    <>
        <form className='flex grow' >
            <input onChange={handleTyping} className={'grow py-3 pl-6 rounded-lg bg-dark-grey-alternate-2 focus:bg-black border-none outline outline-dark-grey focus:outline-twitter-blue '} placeholder='Search username' />
        </form>
    </>
  )
}

export default ContactSearch