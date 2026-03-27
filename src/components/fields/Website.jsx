import { useState, useEffect } from "react"

const Website = ({ websiteInput, initialValue, setWebsiteInput }) => {

    const [active, setActive] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
        setWebsiteInput(
            initialValue ? initialValue : ''
        )
    }, [])

    function handleClick() {
        setActive(true)
    }

    function handleFocusOut() {
        setActive(false)
    }

    function handleTyping(e) {
        if(websiteInput.length >= 50){
            setIsError(true)
        } else {
            setIsError(false)
        }
        setWebsiteInput(e.target.value)
    }
    
    return (
    <>
        <div onClick={handleClick} className={`flex flex-col border-2 ${active? isError ? 'border-red-500' : 'border-twitter-blue' : isError ? 'border-red-500': 'border-twitter-light-grey'} p-2 rounded-xs`} >
            <div className="flex items-center justify-between" >
                <label htmlFor='website' className={`${active? isError ? 'text-red-500' : 'text-twitter-blue' : isError ? 'text-red-500': 'text-twitter-light-grey'} `} >Website</label>
                <p className={`text-twitter-light-grey ${!(active || isError) &&  'hidden'} `} >{`${websiteInput.length}/50`}</p>
            </div>
            <textarea onChange={handleTyping} onBlur={handleFocusOut} id='website' className='focus:[outline:none] resize-none overflow-hidden field-sizing-content' >{ initialValue }</textarea>
        </div>
    </>
    )
}

export default Website