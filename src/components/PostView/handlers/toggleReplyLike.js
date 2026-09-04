import { likeReply, unlikeReply } from "../api/postview.api";

export async function likeReplyAction(setHeartClicked, setReplyLikes, replyId ){
    setHeartClicked(true)
    setReplyLikes(p => p+=1)
    try{
        await likeReply(replyId)
    } catch{
        setHeartClicked(false)
        setReplyLikes(p => p-=1)
    }
}

export async function unlikeReplyAction(setHeartClicked, setReplyLikes, replyId ){
    setHeartClicked(false)
    setReplyLikes(p => p-=1)
    try{
        await unlikeReply(replyId)
    } catch{
        setHeartClicked(true)
        setReplyLikes(p => p+=1)
    }
}