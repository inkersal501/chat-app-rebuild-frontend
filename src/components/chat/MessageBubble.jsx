import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {messageService, socketService} from "@js"; 
import { useSelector } from "react-redux";  

function MessageBubble({ chatId }) {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const {user} = useSelector((state)=>state.auth);

    useEffect(() => {
        async function fetchMessages() {
            if (!chatId) return;
            setLoading(true);
            const res = await messageService.getMessages(chatId, user.token);
            if (res.status) {
                setMessages(res.messages);
            }
            setLoading(false);
        }

        fetchMessages();

        const handleNewMessage = (newMessage) => {
            if (newMessage.roomId === chatId) {
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        socketService.on("receive_message", handleNewMessage);

        return () => {
            socketService.off("receive_message", handleNewMessage);
        };
    }, [chatId, user.token]);
 
    useLayoutEffect(() => {
        if (messagesEndRef.current) { 
            messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        } 
    }, [messages]);
   

    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
 
    let previousDate = null;
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-custom">
                {messages.length === 0 && (
                    <div className='px-4 py-2'>Start Chat...</div>
                )}
                 
                {messages.map((msg, index) => { 
                    const isSender = msg.sender._id.toString() === user._id.toString();
                    const formattedDate = messageService.getMessageDate(msg.createdAt);
                    const showDateSeparator = formattedDate !== previousDate;
                    previousDate = formattedDate;
                    return (
                        <div key={index}>
                            {showDateSeparator && (
                                <div className="text-center my-2">
                                    <span className="px-2 py-1 bg-slate-900 text-gray-400 text-xs rounded-md cursor-default">
                                        {formattedDate}
                                    </span>
                                </div>
                            )}

                            <div className={`flex items-center gap-3 ${isSender ? 'flex-row-reverse' : ''}`}>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900
                                bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase">
                                    {msg.sender.username[0]}
                                </div>
                                <div className={`py-1 px-2 rounded-xl max-w-[90%] ${isSender ? 'bg-gray-800 border border-gray-700' : 'glass-bg'} text-white self-start`}>
                                    <div><strong>{msg.sender.username}</strong></div>
                                    <div className='flex gap-5 justify-between items-end'>
                                        <span className='whitespace-pre'>{msg.content}</span>
                                        <span className='text-end text-xs text-[#999]'>{messageService.convertDatetoTime(msg.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })} 
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default MessageBubble;
