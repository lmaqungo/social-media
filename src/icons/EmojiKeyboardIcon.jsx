import EmojiPicker from "emoji-picker-react"
import { useState, useEffect } from "react"
import { Popper, Box } from "@mui/material"
import ClickAwayListener from '@mui/material/ClickAwayListener';


const EmojiKeyboardIcon = ({setPostContent}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log(anchorEl)
  }, [anchorEl])

  function handleTyping(emojiObject){
    const textarea = document.querySelector('textarea'); 
    textarea.focus(); 
    textarea.value += emojiObject.emoji;
    setPostContent(textarea.value)
  }

  return (
    <div >
        <svg onClick={handleClick} className="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="#0D99FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.08145 8.78387C7.75315 8.78387 8.29767 8.23935 8.29767 7.56766C8.29767 6.89596 7.75315 6.35144 7.08145 6.35144C6.40975 6.35144 5.86523 6.89596 5.86523 7.56766C5.86523 8.23935 6.40975 8.78387 7.08145 8.78387Z" fill="#0D99FF"/>
            <path d="M12.9193 8.78387C13.591 8.78387 14.1356 8.23935 14.1356 7.56766C14.1356 6.89596 13.591 6.35144 12.9193 6.35144C12.2476 6.35144 11.7031 6.89596 11.7031 7.56766C11.7031 8.23935 12.2476 8.78387 12.9193 8.78387Z" fill="#0D99FF"/>
            <path d="M13.3706 12.1892C13.029 12.7808 12.5377 13.2721 11.9461 13.6136C11.3545 13.9552 10.6834 14.135 10.0003 14.135C9.31712 14.135 8.64602 13.9552 8.0544 13.6136C7.46278 13.2721 6.97148 12.7808 6.62988 12.1892" stroke="#0D99FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <Popper placement="bottom-start" open={open} anchorEl={anchorEl} >
          <ClickAwayListener onClickAway={handleClickAway} >
            <Box sx={{ border: 1, pt: 2, borderRadius: 2 }}>
              <EmojiPicker theme="auto" emojiStyle="twitter" onEmojiClick={handleTyping} width={250} height={250} previewConfig={{ showPreview: false }} />
            </Box>
          </ClickAwayListener>
        </Popper>
    </div>
  )
}

export default EmojiKeyboardIcon