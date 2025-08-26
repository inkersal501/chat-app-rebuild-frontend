import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaComments, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdPersonAdd, MdPersonAddAlt1 } from "react-icons/md";
import ChatList from './ChatList';
import FriendList from './FriendList';
import SettingsPanel from './SettingsPanel';
import IconButton from './IconButton';
import AddFriends from './AddFriends';
import AcceptFriends from './AcceptFriends';
import Invite from './Invite';
import { sidebarActiveTab, updateSidebarActiveTab, activeChat, updateActiveChat, resetDefault } from '../redux/chatSlice';
import useIsMobile from '../hooks/useIsMobile'; 


import { CgMathPlus } from "react-icons/cg";
import { toast } from 'react-toastify';
const sidebarTabs = [
  {
    key: "chat",
    label: "Chat",
    icon: <FaComments />,
    component: <ChatList />,
  },
  {
    key: "friends",
    label: "Friends",
    icon: <FaUserFriends />,
    component: <FriendList />,
  },
  {
    key: "add-friends",
    label: "Add Friends",
    icon: <MdPersonAddAlt1 />,
    component: <AddFriends />,
  },
  {
    key: "accept-friends",
    label: "Accept Friends",
    icon: <MdPersonAdd />,
    component: <AcceptFriends />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <FaCog />,
    component: <SettingsPanel />,
  },
  {
    key: "invite",
    label: "Invite Friends",
    icon: <CgMathPlus />,
    component: <Invite />,
  },
];


function Sidebar() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector(sidebarActiveTab); 
  const chat = useSelector(activeChat);
  const isMobile = useIsMobile();

  const getActiveLabel = () => {
    const activeTabData = sidebarTabs.find((tab) => tab.key === activeTab);
    return activeTabData ? activeTabData.label : "";
  };
 
  const handleTabChange = (key) => {
    if(isMobile && chat.id !== null){
      dispatch(updateActiveChat({ id: null, username: null }));
    }
    dispatch(updateSidebarActiveTab(key));
  };
 
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetDefault());
    localStorage.clear();
    toast.success("Logged Out successfully.");
    navigate("/");
  };
    
  const sidebarContent = ()=>{
    return (
      // <div className={`bg-slate-800`}>
        <div className="flex-1 bg-slate-800 text-white overflow-y-auto border-t md:border-t-0 md:border-e border-slate-600">
          <h2 className="text-xl font-bold capitalize p-4 border-b border-slate-700">
            {getActiveLabel()}
          </h2>
          {sidebarTabs.map((tab) =>
            activeTab === tab.key ? <div key={tab.key}>{tab.component}</div> : null
          )}
        </div>
      // </div>
    )
  };

  return (
    <div className={`w-full md:w-2/6 ${(isMobile && chat.id !== null)?'h-1/9':'h-1/2'} bg-slate-800 md:h-full flex flex-col md:flex-row overflow-hidden`}>
      
      {/* Sidebar Icon Panel */}
      <div className={`h-16 md:h-full w-full md:w-20 bg-slate-900 text-white flex space-x-2 md:flex-col items-center justify-between px-4 md:px-0 md:py-4 md:space-y-2 shadow-lg z-10`}>
        <div className="flex space-y-0 space-x-1 md:space-x-0 md:flex-col items-center md:space-y-4 me-0">
          {sidebarTabs.map((tab) => (
            <IconButton
              key={tab.key}
              icon={tab.icon}
              tooltip={tab.label}
              active={activeTab === tab.key}
              onClick={() => handleTabChange(tab.key)}
              position="right"
            />
          ))}
        </div>
        <div className="mx-0 md:mt-auto">
          <IconButton
            icon={<FaSignOutAlt />}
            tooltip="Logout"
            onClick={handleLogout}
            position="right"
          />
        </div>
      </div>

      {/* Sidebar Content */}
      {(!isMobile || (isMobile && chat.id === null)) && sidebarContent()}
     
    </div>
  );
}

export default Sidebar;
