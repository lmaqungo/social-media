import { useState, useEffect } from "react";
import { fetchReplies } from "../api/postview.api";

export default function useReplies(postId) {
    const [replies, setReplies] = useState([])
    const [repliesLoading, setRepliesLoading] = useState(true)

    useEffect(() => {
        fetchReplies(postId).then(replies => {
            setReplies(replies)
            setRepliesLoading(false)
        })
    }, [])

    return { replies, setReplies, repliesLoading }
}