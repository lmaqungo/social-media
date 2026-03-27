import { useState, useEffect } from "react";

const Message = ({setMessageInput, submitFn }) => {

  function handleTyping(e) {
    setMessageInput(e.target.value)
  }

  return (
    <>
       <form id='msg' className='flex grow' >
            <textarea onKeyDown={submitFn} onChange={handleTyping} className={`grow rounded-3xl border-none resize-none overflow-hidden field-sizing-content px-4 py-2 bg-slate-700 focus:[outline:none]`} type="text" placeholder='Message'></textarea>
        </form> 
    </>
  )
}

export default Message