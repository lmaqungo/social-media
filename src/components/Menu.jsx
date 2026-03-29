import MenuItem from "./MenuItem"
import { Link } from "react-router";
import Home from "./navigation/Home";
import Chat from "./navigation/Chat";
import Profile from "./navigation/Profile";
import Search from "./navigation/Search";
import Post from "./navigation/Post";
import Logout from "./navigation/Logout";
import BrainIcon from "../icons/BrainIcon";

const Menu = ({ loggedUser, activeMenuItem, setActiveMenuItem }) => {

    function handleClick(id) {
        setActiveMenuItem(id); 
    }

  return (
    <>
        <div className="flex sm:flex-col sm:items-start justify-between sm:gap-4 bg-black border-t border-t-dark-grey sm:border-none sm:w-min overflow-x-auto px-4" items-center >
            <div className="hidden sm:block" >
              <div className="lg:hidden" >
                <BrainIcon height={55} width={44} />
              </div>
              <h1 className="hidden lg:block font-bold text-3xl pl-3" >Brainrot</h1>
            </div>
            <Home handleClick={handleClick} id={0} isActive={activeMenuItem === 0} />
            <Post handleClick={handleClick} id={1} isActive={activeMenuItem === 1} />
            <Search handleClick={handleClick} id={2} isActive={activeMenuItem === 2} />
            <Chat handleClick={handleClick} id={3} isActive={activeMenuItem === 3}  />
            <Profile handleClick={handleClick} id={4} isActive={activeMenuItem === 4} loggedUserId={loggedUser.id} />
            <Logout handleClick={handleClick} id={5} isActive={activeMenuItem === 5} />
        </div>
    </>
  )
}

export default Menu