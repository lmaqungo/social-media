import React from 'react'
import { useState, useEffect } from 'react'
import CancelIcon from '../icons/CancelIcon'
import Circle from '../icons/Circle'
import { useNavigate } from 'react-router'
import { newPost, uploadAttachment } from '../utils/queries'
import CharacterIndicator from './CharacterIndicator'
import AddImageIcon from '../icons/AddImageIcon'
import EmojiKeyboardIcon from '../icons/EmojiKeyboardIcon'
import AttachmentPreview from './AttachmentPreview'
import AddGifIcon from '../icons/AddGifIcon'
import GIFPreview from './GIFPreview'


const NewPost = () => {

    const navigate = useNavigate();

    const [postContent, setPostContent] = useState(''); 
    const [attachment, setAttachment] = useState(null); 
    const [attachmentPreview, setAttachmentPreview] = useState(""); 
    const [gifID, setGifID] = useState(null); 
    const [openGifSelector, setOpenGifSelector] = useState(false); 
    
    const characterLimit = 280 - postContent.length
    
    function handleTyping(e){
        setPostContent(e.target.value)
    }
    
    async function handlePost(){
        if(attachment){
            const url = await uploadAttachment(attachment)
            await newPost(postContent, url, null)
        } else if(gifID) {
            await newPost(postContent, null, gifID)
        } else {
            await newPost(postContent, null, null)
        }
        navigate('/')
    }

    function cancelBtnFn(){
        navigate('/')
    }

    useEffect(() => {
        async function clearAttachment(){
            if(gifID){
                if(attachment){
                    setAttachment(null)
                    setAttachmentPreview("")
                }
            }
        }
        clearAttachment()
    }, [gifID])

    useEffect(() => {
        async function clearGif(){
            if(attachment){
                if(gifID){
                    setGifID(null)
                }
            }
        }
        clearGif()
        if(attachment){
            console.log('added an attachment')
        }
    }, [attachment])


    function disablePostButton(){
        if(!(gifID || attachment)){
            if(postContent.length === 0 || characterLimit < 0){
                return true
            } else{
                return false
            }
        } else{
            return false
        }
    }

  return (
    <div className='w-full relative h-screen sm:border-l border-twitter-light-grey flex sm:justify-center sm:items-center' >
        <div className='flex w-full lg:max-w-4xl sm:max-h-140 flex-col gap-5 py-5 px-7 rounded-lg border border-dark-grey-alternate-2 overflow-auto '>
            <div className='flex justify-between' >
                <CancelIcon action={cancelBtnFn} />
                <div className='flex items-center gap-6' >
                    {/* <p className={ `${charLimColor()} select-none ` } >{ characterLimit }</p> */}
                    <CharacterIndicator postContent={postContent} />
                    <button onClick={handlePost} className={`transition  font-bold cursor-pointer px-5 py-1 rounded-full hover:bg-twitter-blue-hover ${ disablePostButton() ? 'pointer-events-none bg-twitter-blue-hover' : 'bg-twitter-blue'} `} >Post</button>
                </div>
            </div>
            <div className='flex gap-8' >
                <Circle />
                <div className=' w-full' >
                    <textarea onChange={handleTyping} className='w-full p-2 resize-none overflow-hidden field-sizing-content  focus:[outline:none]' placeholder="What's happening?" >
                    </textarea>
                </div>
            </div>
            <div className={`${ attachmentPreview || gifID ? 'block' : 'hidden' } `} >
                {
                    attachmentPreview && <AttachmentPreview preview={attachmentPreview} setPreview={setAttachmentPreview} setAttachment={setAttachment} />   
                }
                {
                    gifID && <GIFPreview gifID={gifID} setGifID={setGifID} setOpenGifSelector={setOpenGifSelector} />
                }
            </div>
            <div className='flex gap-4' >
                <AddImageIcon setAttachment={setAttachment} setPreview={setAttachmentPreview} />
                <AddGifIcon setGifID={setGifID} open={openGifSelector} setOpen={setOpenGifSelector} />
                <EmojiKeyboardIcon setPostContent={setPostContent} />
            </div>
        </div>
    </div>
  )
}

export default NewPost