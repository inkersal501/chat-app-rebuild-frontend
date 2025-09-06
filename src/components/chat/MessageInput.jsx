import { IoSend } from "react-icons/io5";
import IconButton from "../common/IconButton";
import React, { useState, useEffect, useCallback } from "react"; 
import { updateRefreshList, updateFirstChat } from "@store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { socketService } from "@js";  

function MessageInput() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { user } = useSelector((state) => state.auth); 
  const { activeChat, firstChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
 
  useEffect(() => {
    setMessage(""); 
  }, [activeChat]);

  const handleSend = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);

    const messageData = {
      sender: { username: user.username, _id: user._id },
      content: trimmed,
      roomId: activeChat.id,
      createdAt: Date.now(),
    };

    try { 
      socketService.emit("send_message", { roomId: activeChat.id, message: messageData }); 
      // await messageService.sendMessage(activeChat.id, user.token, trimmed);
 
      if (firstChat.id !== activeChat.id) {
        dispatch(updateRefreshList(true));
        dispatch(updateFirstChat({ id: activeChat.id, username: activeChat.firstName }));
      }
 
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  }, [message, isSending, user, activeChat, firstChat, dispatch]);

  return (
    <div className="flex w-full items-center justify-between">
      <textarea
        value={message}
        rows={1}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); 
            handleSend();
          }
        }}
        className="w-full h-full bg-slate-800 border border-slate-800 focus:border-slate-700 px-4 py-2 text-white rounded-lg focus-visible:outline-none resize-none scrollbar-custom"
        placeholder="Type a message"
        disabled={isSending}
      />
       
      <div className="ms-4">
        <IconButton
          icon={<IoSend size={16} />}
          tooltip="Send"
          position=""
          active={false}
          onClick={handleSend}
        />
      </div>
    </div>
  );
}

export default React.memo(MessageInput);
