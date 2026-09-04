import { postReply } from "../api/postview.api";

export default async function createNewReply(postId, userInput, setReplies) {
    try{
        const result = await postReply(postId, userInput )
        setReplies(replies => {
            return [...replies, result]
        })
    } catch {
        setReplies( replies => replies)
    }
}