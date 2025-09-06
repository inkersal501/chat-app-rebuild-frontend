import React, { useCallback, useEffect, useMemo, useState } from 'react'; 
import { useDispatch, useSelector } from "react-redux"; 
import UserCard from "../common/UserCard";
import { chatService } from "@js";
import { updateActiveChat, updateFirstChat, updateRefreshList } from "@store/chatSlice";
import useIsMobile from '@hooks/useIsMobile';
 
const ChatList = () => {

    const dispatch = useDispatch();
    const [chatList, setChatList] = useState([]);
    const [search, setSearch] = useState(""); 
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.auth);
    const { activeChat, refreshList } = useSelector((state) => state.chat); 
    const isMobile = useIsMobile();

    const getChatList = useCallback(async () => {
        setLoading(true);
        const result = await chatService.getChatList(user.token);
        if (result.status) {
            setChatList([...result.chatlist]);
            if (!isMobile && !activeChat?.id) {
                const firstChat = result.chatlist[0];
                const firstParticipant = firstChat.participants.find(p => p._id !== user._id);
                const firstName = firstParticipant ? firstParticipant.username : "My Chat";
                dispatch(updateActiveChat({ id: firstChat._id, username: firstName }));
                dispatch(updateFirstChat({ id: firstChat._id, username: firstName }));
            }
        }  
        setLoading(false);
    }, [user, activeChat, dispatch, isMobile]);

    //eslint-disable-next-line
    useEffect(() => { getChatList(); }, []);
    //eslint-disable-next-line
    useEffect(() => { if (refreshList) { getChatList(); dispatch(updateRefreshList(false)); } }, [refreshList]);

    const filteredChatList = useMemo(() => {
        return chatList.filter(chat => {
            const other = chat.participants.find(p => p._id !== user._id);
            const displayName = other ? other.username : "My Chat";
            return displayName.toLowerCase().includes(search.toLowerCase());
        });
    }, [search, chatList, user._id]);

    const handleOpenChat = (id, username) => dispatch(updateActiveChat({ id, username }));

    return (
        <div className="flex flex-col h-full"> 
            <div className="p-2 shrink-0">
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chats"
                className="w-full rounded-md bg-slate-700 border-b border-gray-400 px-4 py-2 text-white focus:outline-none"
                />
            </div>
    
            <div className="flex-1 overflow-y-auto px-2 scrollbar-custom">
                {loading ? (
                    <div className="p-4 text-gray-400">Loading...</div>
                ) : filteredChatList.length > 0 ? (
                    filteredChatList.map((chat, index) => {
                        const other = chat.participants.find(p => p._id !== user._id);
                        const displayName = other ? other.username : "My Chat";
                        return (
                            <div
                                key={index}
                                className={`border  ${activeChat.id === chat._id
                                    ? "bg-gray-700 border border-gray-500 border-gray-600"
                                    : "bg-slate-800 hover:bg-gray-700 border-gray-800"} rounded-md px-2 py-1 my-1 cursor-pointer`}
                                onClick={() => handleOpenChat(chat._id, displayName)}
                            >
                                <UserCard name={displayName} />
                            </div>
                        );
                    })
                ) : (
                    <div className="p-4 text-gray-400">No chats found.</div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ChatList);
