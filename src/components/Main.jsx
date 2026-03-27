import { Outlet } from "react-router"
import Menu from "./Menu"
import { useState, useEffect } from "react";
import { getLoggedUser } from "../utils/queries";
import LoadingIndicator from "./LoadingIndicator";

const Main = () => {
    
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [searchInput, setSearchInput] = useState();
    const [activeMenuItem, setActiveMenuItem] = useState(0); 
 
    useEffect(() => {
      getLoggedUser(setLoggedUser, setLoading)
    }, [])

    const contextObj = {
      loggedUser, 
      setLoggedUser, 
      searchInput, 
      setSearchInput, 
      setActiveMenuItem
    }

    useEffect(() => {
      console.log('Main component is mounted')      
    }, [])

    if(loading) {
      return <LoadingIndicator />
    }

  return (
    <>
        <div className="flex flex-col sm:flex-row sm:w-full relative " >         
            <div className="sm:px-8 lg:px-16 sm:pt-8 sm:h-full w-full sm:w-auto fixed bottom-0 z-100">
              <Menu loggedUser={loggedUser} activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
            </div>
            <div className="lg:ml-80 sm:ml-40 sm:h-full sm:w-full order-first">
              <Outlet context={contextObj}  />
            </div>
        </div>
    </>

  )
}

export default Main