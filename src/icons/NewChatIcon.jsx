


const NewChatIcon = ({ action }) => {

    
  return (
    <div onClick={action} className="cursor-pointer py-2 pl-2 pr-1.25 rounded-full hover:bg-hover-grey transition" >
        <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5146 0C19.6459 0.000196359 20.5713 0.91661 20.5713 2.03613V8.82031C20.0282 8.65868 19.453 8.57132 18.8574 8.57129C18.7425 8.57129 18.628 8.57468 18.5146 8.58105V4.07129L10.2861 9.16113L2.05762 4.07129V14.25H12.8662C12.8606 14.3564 12.8574 14.4635 12.8574 14.5713C12.8574 15.1673 12.9456 15.7427 13.1074 16.2861H2.05762C0.926189 16.2861 0 15.3696 0 14.25V2.03613C0 0.91649 0.926189 0 2.05762 0H18.5146ZM2.05762 2.03613L10.2861 7.125L18.5146 2.03613H2.05762Z" fill="white"/>
            <path d="M19.5967 10.8928V13.8313H22.5361V15.3108H19.5967V18.2502H18.1172V15.3108H15.1787V13.8313H18.1172V10.8928H19.5967Z" fill="white" stroke="white" stroke-width="0.5"/>
        </svg>
    </div>
  )
}
        

export default NewChatIcon