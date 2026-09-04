import client from "../../../api/client";

export const fetchPost = (postId) => client(`/posts/${postId}`)
export const likePost = (postId) => client(`/posts/${postId}/like`, {method: 'POST'})
export const unlikePost = (postId) => client(`/posts/${postId}/unlike`, {method: 'POST'})
// these api routes must send the updated post object
export const fetchReplies = (postId) => client(`/replies/${postId}`)
export const postReply = (postId, reply) => client(`/replies/${postId}/new`, { method: 'POST', body: { reply } })
export const likeReply = (replyId) => client(`/replies/${replyId}/like`, { method: 'POST' })
export const unlikeReply = (replyId) => client(`/replies/${replyId}/unlike`, { method: 'POST' })

