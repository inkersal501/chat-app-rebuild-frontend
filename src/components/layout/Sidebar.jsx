import { useDispatch, useSelector } from 'react-redux';
import { updateActiveTab, updateCounts } from '@store/sidebarSlice';
import IconButton from '../common/IconButton';
import { FaComments, FaUserFriends, FaCog } from "react-icons/fa";
import { MdPersonAdd, MdPersonAddAlt1 } from "react-icons/md";
import { CgMathPlus } from "react-icons/cg";
import ChatList from '../list/ChatList';
import Friends from '../list/Friends';
import AddFriends from '../list/AddFriends';
import FriendRequests from '../list/FriendRequests';
import Settings from '../list/Settings';
import Invite from '../list/Invite';
import { useEffect } from 'react';
import { analyticsService } from "@js";

const sidebarTabs = [
  { key: "chats", label: "Chats", icon: <FaComments size={22}/>, component: <ChatList /> },
  { key: "friends", label: "Friends", icon: <FaUserFriends size={22}/>, component: <Friends /> },
  { key: "add-friends", label: "Add Friends", icon: <MdPersonAddAlt1 size={22}/>, component: <AddFriends /> },
  { key: "friend-requests", label: "Friend Requests", icon: <MdPersonAdd size={22}/>, component: <FriendRequests /> },
  { key: "settings", label: "Settings", icon: <FaCog size={22}/>, component: <Settings /> },
  { key: "invite", label: "Invite Friends", icon: <CgMathPlus size={22}/>, component: <Invite /> },
];

function Sidebar() {

  const dispatch = useDispatch();
  const { activeTab, counts } = useSelector((state) => state.sidebar);
  const { user } = useSelector((state) => state.auth); 

  const fetchAnalytics = async () => {
    const analyticsData = await analyticsService.getData(user.token);
    if(analyticsData.status) {
      dispatch(updateCounts(analyticsData.data));
    }
  };

  useEffect(() => {
    fetchAnalytics();
    //eslint-disable-next-line 
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center py-2 space-y-2">
        {sidebarTabs.map((tab) => (
          <IconButton
            key={tab.key}
            icon={tab.icon}
            tooltip={tab.label}
            active={activeTab === tab.key}
            onClick={() => dispatch(updateActiveTab(tab.key))}
            position="right"
            badge={tab.key === "friend-requests" && counts?.requests > 0 ? counts?.requests : 0}
          />
        ))}
      </div>
    </div>
  );
}

function ActiveTabContent() {
  const { activeTab, counts } = useSelector((state) => state.sidebar);
 
  return sidebarTabs.map((tab) =>
    activeTab === tab.key ? (
      <div key={tab.key} className="flex flex-col h-full px-2 rounded-tl-md bg-slate-800 text-white">
        <h2 className="text-xl font-bold capitalize px-4 py-3 shrink-0">
          {tab.label}     
          {tab.key === "friends" && counts.friends > 0 && <span className="text-xs px-2 py-1 ms-4 rounded-full text-slate-800 bg-slate-100">{counts.friends}</span>}
          {/* {tab.key === "accept-friends" && counts.requests > 0 && <span className="text-xs px-2 py-1 ms-4 rounded-full text-slate-800 bg-slate-100">{counts.requests}</span>} */}
        </h2>

        <div className="flex-1 overflow-y-auto">
          {tab.component}
        </div>
      </div>
    ) : null
  );
}

Sidebar.ActiveTabContent = ActiveTabContent;

export default Sidebar;
