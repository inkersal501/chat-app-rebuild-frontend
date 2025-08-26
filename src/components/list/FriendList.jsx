import { useEffect, useState } from 'react';   
import { useDispatch, useSelector } from "react-redux";
import {connectJS} from "../js";
import UserCard from "./UserCard";
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
            const result = await connectJS.getFriends(user.token);
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
        <div className="space-y-0">
            <div className='bg-slate-900'>
            <input 
                className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none" 
                type="text" 
                placeholder="Search friends"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            {loading ? 
                (<div className="p-4 text-gray-400">Loading...</div>)
                :
                filteredFriends.length > 0 ? filteredFriends.map((friend, index) => (
                    <div key={index} className="bg-slate-800 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
                        <UserCard name={friend.username} type="friends" openChat={()=>handleOpenChat(friend.chatId, friend.username)}/>
                    </div> 
                )) : ( <div className="p-4 text-gray-400">No friends found.</div> )
            } 
        </div>
    );
};

export default FriendList;
