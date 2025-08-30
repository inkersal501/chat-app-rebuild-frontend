import { useDispatch, useSelector } from "react-redux";
import { updateActiveChat } from '@store/chatSlice';
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import {socketService} from "@js";
import { useEffect, useState } from "react";
import useIsMobile from '@hooks/useIsMobile';
import { MdArrowBack } from "react-icons/md";
import IconButton from "../common/IconButton";
import UserIcon from "../common/UserIcon"; 
 
function ChatWindow() {

  const dispatch = useDispatch();
  const { id, username } = useSelector((state)=>state.chat.activeChat);
  const [showChat, setShowChat] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if(id) {
      socketService.emit("join_room", id);
      setShowChat(true);
    }else if(id === null){
      setShowChat(false);
    }
  }, [id]);
  
  const handleBack = () => {
    dispatch(updateActiveChat({ id: null, username: null}));
  };
  return (
    <>
    {showChat && 
    <div className={`w-full ${isMobile?'h-8/9':'h-1/2'} md:h-full flex flex-col bg-slate-900`}>
      
      {/*Chat Header*/}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900 bg-slate-800 z-10">
        <div className="flex items-center gap-3"> 
          <UserIcon name={username?username[0]:""}/>
          <span className="text-white text-base font-medium">{username}</span>
        </div> 
        {isMobile && 
        <div>
          <IconButton
            icon={<MdArrowBack size={22}/>}
            tooltip="Back"
            onClick={handleBack}
            position="right"
          />          
        </div>}
      </div>

      {/*Chat Messages*/}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-custom add-chat-bg">
        <MessageBubble chatId={id} />
      </div>

      {/*Message Input*/}
      <div className="h-16 bg-slate-800 flex items-center px-4 border-t border-slate-700 overflow-hidden">
        <MessageInput />
      </div>
    </div>
    }
    </>
  );
}

export default ChatWindow;
