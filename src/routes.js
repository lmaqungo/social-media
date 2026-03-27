import App from "./App";
import Main from "./components/Main";
import Login from "./components/Login";
import Home from "./components/Home";
import PostView from "./components/PostView";
import Profile from "./components/Profile";
import SearchResults from "./components/SearchResults";
import NewPost from "./components/NewPost";
import Chat from "./components/Chat";
import ChatUI from "./components/ChatUI";
import StartChat from "./components/StartChat";
import Logout from "./components/Logout";
import ErrorReport from "./components/ErrorReport";

const routes = [
    {
        path: '/', 
        Component: App, 
        // ErrorBoundary: ErrorReport,
        children: [ 
            {
                Component: Main, 
                children: [
                    {
                        index: true, 
                        Component: Home
                    }, 
                    {
                        path: 'posts/:postId', 
                        Component: PostView
                    }, 
                    {
                        path: `profile/:userId`, 
                        Component: Profile
                    }, 
                    {
                        path: 'search', 
                        Component: SearchResults
                    }, 
                    {
                        path: 'post', 
                        Component: NewPost
                    }, 
                    {
                        path: 'chat', 
                        Component: Chat, 
                        children: [
                            {
                                index: true, 
                                Component: StartChat
                            }, 
                            {
                                path: ':chatId', 
                                Component: ChatUI
                            }
                        ]
                    }
                ]
            }, 
            {
                path: 'login', 
                Component: Login
            }, 
            {
                path: 'logout', 
                Component: Logout
            }
        ]
    }
]

export default routes