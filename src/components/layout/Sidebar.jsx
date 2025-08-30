import { useDispatch, useSelector } from 'react-redux';
import { updateActiveTab } from '@store/sidebarSlice';
import IconButton from '../common/IconButton';
import { FaComments, FaUserFriends, FaCog } from "react-icons/fa";
import { MdPersonAdd, MdPersonAddAlt1 } from "react-icons/md";
import { CgMathPlus } from "react-icons/cg";
import ChatList from '../list/ChatList';
import Friends from '../list/Friends';
import AddFriends from '../list/AddFriends';
import AcceptFriends from '../list/AcceptFriends';
import Settings from '../list/Settings';
import Invite from '../list/Invite';

const sidebarTabs = [
  { key: "chats", label: "Chats", icon: <FaComments size={22}/>, component: <ChatList /> },
  { key: "friends", label: "Friends", icon: <FaUserFriends size={22}/>, component: <Friends /> },
  { key: "add-friends", label: "Add Friends", icon: <MdPersonAddAlt1 size={22}/>, component: <AddFriends /> },
  { key: "accept-friends", label: "Accept Friends", icon: <MdPersonAdd size={22}/>, component: <AcceptFriends /> },
  { key: "settings", label: "Settings", icon: <FaCog size={22}/>, component: <Settings /> },
  { key: "invite", label: "Invite Friends", icon: <CgMathPlus size={22}/>, component: <Invite /> },
];

function Sidebar() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.sidebar);

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
          />
        ))}
      </div>
    </div>
  );
}

function ActiveTabContent() {
  const { activeTab } = useSelector((state) => state.sidebar);

  return sidebarTabs.map((tab) =>
    activeTab === tab.key ? (
      <div key={tab.key} className="flex flex-col h-full px-2 rounded-tl-md bg-slate-800 text-white">
        <h2 className="text-xl font-bold capitalize px-4 py-3 shrink-0">
          {tab.label}
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
