import { extractIds } from "./utils";
import { apiURL } from "./selectdb";

async function getPosts(setPosts) {
    const url = `${apiURL}/posts`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json(); 
        // console.log(result)
        setPosts(result)
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    }
}

function initialLikeState(user, post) {
    const likedByIds = extractIds(post.likedBy); 
    return likedByIds.includes(user.id)
    }

async function getPost(postId, setPost, setLoading, setPostLikes, loggedUser, setHeartClicked, setReplies) {
    const url = `${apiURL}/posts/${postId}`; 
    try {
        const response = await fetch(url, {
            credentials: 'include', 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log(result.replies)
        setPost(result)
        setReplies(result.replies)
        setPostLikes(result.likedBy.length)
        setHeartClicked(initialLikeState(loggedUser, result ))
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    } finally{
        setLoading(false)
    }
}

async function newReply(setReplies, content, postId, setLoading) {
    setLoading(true)
    const url = `${apiURL}/replies/${postId}/new`;
    try{
        const response = await fetch(url, {
            credentials: 'include', 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reply: content })
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json(); 
        setReplies(replies => {
            return [...replies, result]
        })
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    } finally {
        setLoading(false)
    }
}

async function getLoggedUser(setLoggedUser, setLoading) {
    setLoading(true)
    const url = `${apiURL}/users/loggedUser`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const result = await response.json(); 
        console.log(result)
        setLoggedUser(result)
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    } finally {
        setLoading(false)
    }
}

async function getUser(userId, setUser, setLoading, setLoadingPosts, setUserPosts, setUserBio, setWebsite, setFollowers, setFollowing) {
    setLoading(true)
    const url = `${apiURL}/users/${userId}`;
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result)
        setUser(result)
        setUserPosts(result.posts)
        console.log(`bio: ${result.bio}`)
        console.log(`website: ${result.website}`)
        setUserBio(result.bio)
        setWebsite(result.website)
        setFollowers(result.followedBy.length)
        setFollowing(result.following.length)
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    } finally {
        setLoading(false)
        setLoadingPosts(false)
    }
}

async function updateProfile(bioInput, websiteInput, userId) {
    const url = `${apiURL}/users/${userId}/update`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({ 
                bio: bioInput, 
                website: websiteInput
             })
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function likePost(setPostLikes, postId){
    const url = `${apiURL}/posts/${postId}/like`; 
    try {
       const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        setPostLikes(p=> p+=1); 
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function unlikePost(setPostLikes, postId){
    const url = `${apiURL}/posts/${postId}/unlike`; 
    try {
       const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        setPostLikes(p=> p-=1); 
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function likeReply(setReplyLikes, replyId) {
    const url = `${apiURL}/replies/${replyId}/like`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        setReplyLikes(p => p+=1)
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function unlikeReply(setReplyLikes, replyId) {
    const url = `${apiURL}/replies/${replyId}/unlike`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        setReplyLikes(p => p-=1)
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function search(searchParams, setPosts, setUsers){
    /* 
    setPosts, setUsers
    */
   
   const url = `${apiURL}/search?${searchParams.toString()}`;
   try{
    const response = await fetch(url, {
        credentials: 'include', 
        method: 'GET', 
        headers : {
            "Content-Type": "application/json"
        } 
    }); 
    if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
    }

    const searchResult = await response.json()
    console.log(searchResult)
    if(searchParams.has('filter')){
        if(searchParams.has('filter', 'posts')){
            setPosts(searchResult)
        } else if(searchParams.has('filter', 'people')){
            setUsers(searchResult)
        }
    } else{
        setPosts(searchResult)
    }

   } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    }

}

async function followUser(userId, setFollowers) {
    const url = `${apiURL}/users/${userId}/follow`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        if(setFollowers) {
            setFollowers(p => p+=1)
        }
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function unfollowUser(userId, setFollowers) {
    const url = `${apiURL}/users/${userId}/unfollow`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } 
        if(setFollowers) {
            setFollowers(p => p-=1)
        }
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    }
}

async function newPost(content, attachmentURL, gifId) {
    const url = `${apiURL}/posts/new`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({ content: content, attachmentURL: attachmentURL, gifId: gifId })
        }) 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log('new post'); 
        console.log(result)
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    }
}

async function uploadAttachment(file) {
    console.log('input file')
    console.log(file)

    const formData = new FormData();
    formData.append('file', file);
    console.log('form data');
    console.log(...formData);

    const url = `${apiURL}/posts/upload`; 
    try{
        const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            body: formData
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result  = await response.json(); 
        
        return result.url
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    }
}

async function getChats(setChats, setChatsSearchResults, setLoading){
    const url = `${apiURL}/chats`; 
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json(); 
        console.log(result)
        setChats(result); 
        setChatsSearchResults(result);
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    } finally {
        setLoading(false)
    }
}

async function getChatMember(userId, setUser, setLoading) {
    setLoading(true)
    const url = `${apiURL}/users/${userId}`;
    try {
        const response = await fetch(url, {
            credentials: "include", 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setUser(result)
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
        }
    } finally {
        setLoading(false)
    }
}

async function getChat(chatId, setMessages, setRecipient, setLoading) {
    const url = `${apiURL}/chats/${chatId}`; 
    try {
       const response = await fetch(url, {
            credentials: 'include', 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } 
        const result = await response.json(); 
        setMessages(result.chat.messages)
        setRecipient(result.recipient)
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    } finally{
        setLoading(false)
    }
}

async function newMessage(chatId, message, setMessages) {
    const url = `${apiURL}/chats/message/new`; 
    try {
        const requestBody = {
            message, 
            chatId
        }
        const response = await fetch(url, {
            credentials: 'include', 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json(); 
        setMessages(messages => {
            return [...messages, result]
        })
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    }
}

async function getContacts(setContacts, setContactSearchResults) {
    const url = `${apiURL}/chats/contacts`
    try {
        const response = await fetch(url, {
            credentials: 'include', 
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } 
        const result = await response.json(); 
        setContacts(result)
        setContactSearchResults(result)
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    }
}

async function logout(setLogout, setLoading){
    setLoading(true)
    const url = `${apiURL}/auth/logout`; 
    try {
        const response = await fetch(url, {
            credentials: 'include', 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } 
    } catch(error){
        if(error instanceof Error) {
            console.error(error)
        } else{
            console.log('An unexpected error has occurred')
        }
    } finally {
        setLogout(true)
        setLoading(false)
    }
}

export { getPosts, getLoggedUser, getUser, likePost, unlikePost, getPost, newReply, likeReply, unlikeReply, updateProfile, search, unfollowUser, followUser, newPost, getChats, getChatMember, getChat, newMessage, getContacts, logout, uploadAttachment }