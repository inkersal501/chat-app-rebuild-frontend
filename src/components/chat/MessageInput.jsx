import { IoSend } from "react-icons/io5";
import IconButton from "../common/IconButton";
import { useState, useEffect } from "react"; 
import { updateRefreshList } from '@store/chatSlice';
import { useDispatch, useSelector } from "react-redux";
import {messageService, socketService} from "@js"; 

function MessageInput() {

  const [message, setMessage] = useState("");
  const {user} = useSelector((state)=>state.auth);
  const { id } = useSelector((state) => state.chat.activeChat); 
  const dispatch = useDispatch();
  
  const handleSend = async () => {
    if (message.trim() === "") return;
    const messageData =  {
      sender:{username: user.username, _id: user._id },
      content: message.trim(),
      roomId: id,
      createdAt: Date.now()
    }; 
    socketService.emit("send_message", {roomId: id, message: messageData}); 
    await messageService.sendMessage(id, user.token, message); 
    dispatch(updateRefreshList(true));
    setMessage("");
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleSend();
  //   }
  // };

  useEffect(() => { 
    setMessage(""); 
  }, [id])
  

  return (
    <div className="flex w-full items-center justify-between">
      <textarea
        value={message}
        rows="1"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); 
            handleSend();
          }
        }}
        className="w-full h-full bg-slate-800 focus:border border-slate-700 px-4 py-2 text-white font-medium rounded-lg focus-visible:outline-none resize-none scrollbar-custom"
        placeholder="Type a message"
      />
      {message!=="" &&
      <div className="ms-4">
        <IconButton icon={<IoSend />} tooltip={""} position="" active={false} onClick={handleSend} />
      </div>
      }
    </div>
  );
}

export default MessageInput;
