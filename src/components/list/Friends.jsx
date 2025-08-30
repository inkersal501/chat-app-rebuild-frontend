import { useEffect, useState } from 'react';   
import { useDispatch, useSelector } from "react-redux";
import {connectService} from "@js";
import UserCard from "../common/UserCard";
import {updateActiveChat} from "@store/chatSlice";

const FriendList = () => {

    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const {user} = useSelector((state) => state.auth);    
    const dispatch = useDispatch();

    useEffect(() => {
        async function getFriends() {
            setLoading(true);
            const result = await connectService.getFriends(user.token);
            if (result.status && result.friends.length > 0) {
                setFriends(result.friends);
            }
            setLoading(false);
        }
        getFriends();
        // eslint-disable-next-line
    }, []);

    useEffect(()=> {
        setFilteredFriends(friends);
    }, [friends]);

    const filterFriends = (search) => {
        const filtered = friends.filter((f) =>
            f.username.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredFriends(filtered);
    };
    useEffect(()=> {
        if(search === "")
            setFilteredFriends(friends);
        else
            filterFriends(search);
    //eslint-disable-next-line
    }, [search]);
    
    const handleOpenChat = (id, username) => {   
        dispatch(updateActiveChat({ id, username}))
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-2 shrink-0">
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search friends"
                className="w-full rounded-md bg-slate-700 border-b border-gray-400 px-4 py-2 text-white focus:outline-none"
                />
            </div> 
            <div className="flex-1 overflow-y-auto px-2 scrollbar-custom">
                {loading ? 
                    (<div className="p-4 text-gray-400">Loading...</div>)
                    :
                    filteredFriends.length > 0 ? filteredFriends.map((friend, index) => (
                        <div key={index} className="border-b border-slate-700 px-2 py-1 cursor-pointer">
                            <UserCard name={friend.username} type="friends" openChat={()=>handleOpenChat(friend.chatId, friend.username)}/>
                        </div> 
                    )) : ( <div className="p-4 text-gray-400">No friends found.</div> )
                } 
            </div>
        </div>
    );
};

export default FriendList;
