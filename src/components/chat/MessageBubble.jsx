import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {messageService, socketService} from "@js"; 
import { useSelector } from "react-redux";  

import Message from './Message';
import MessageDate from './MessageDate';

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
    }, [chatId, user]);
 
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
                    const isSender = (msg.sender._id).toString() === (user._id).toString();
                    const formattedDate = messageService.getMessageDate(msg.createdAt);
                    const showDateSeparator = formattedDate !== previousDate;
                    previousDate = formattedDate;
                    const {username} =msg.sender;
                    const {content, createdAt} = msg;
                    return (
                        <div key={index}>
                            {showDateSeparator && (
                                <MessageDate formattedDate={formattedDate}/>
                            )}
                            <Message isSender={isSender} msg={{username, content, createdAt}} /> 
                        </div>
                    );
                })} 
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default MessageBubble;
