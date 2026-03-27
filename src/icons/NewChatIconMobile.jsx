
const NewChatIconMobile = ({ action }) => {
  return (
    <>
        <svg onClick={action} className="cursor-pointer"  width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#1DA1F2"/>
            <path d="M40.5996 20C41.9196 20 43 21.0688 43 22.375V30.291C42.3662 30.1024 41.6951 30 41 30C40.8656 30 40.7321 30.0042 40.5996 30.0117V24.75L31 30.6875L21.4004 24.75V36.625H34.0098C34.0032 36.7492 34 36.8742 34 37C34 37.6951 34.1024 38.3662 34.291 39H21.4004C20.0804 39 19 37.9312 19 36.625V22.375C19 21.0688 20.0804 20 21.4004 20H40.5996ZM21.4004 22.375L31 28.3125L40.5996 22.375H21.4004Z" fill="white"/>
            <path d="M41.8213 32.75V36.1787H45.25V37.8213H41.8213V41.25H40.1787V37.8213H36.75V36.1787H40.1787V32.75H41.8213Z" fill="white" stroke="white" stroke-width="0.5"/>
        </svg>
    </>
  )
}

export default NewChatIconMobile