import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateSidebarActiveTab } from '../redux/chatSlice';
import {connectJS} from "../js";
import UserCard from "./UserCard";
import Button from './Button';

function AcceptFriends() {
  
  const dispatch = useDispatch();
  const [reqUsers, setReqUsers] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    async function getRequests() {
      setLoading(true);
      const result = await connectJS.getRequests(user.token);
      if (result.status) {
        setReqUsers(result.requests.map(u => ({ ...u, status: "accept" })));        
      } 
      setLoading(false);
    }
    getRequests();
    //eslint-disable-next-line
  }, []);

  useEffect(()=> {
    setFilteredRequests(reqUsers);
  }, [reqUsers]);

  const filterRequests = (search) => {
    const filtered = reqUsers.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  useEffect(()=> {
    if(search === "")
      setFilteredRequests(reqUsers);
    else
      filterRequests(search);
    //eslint-disable-next-line
  }, [search]);

  const acceptRequest = async (fromUserId) => { 
    setReqUsers(prev => prev.map(user =>
      user._id === fromUserId ? { ...user, status: "request-accepted" } : user
    ));

    await connectJS.acceptRequest(fromUserId, user.token); 
  };

  const declineRequest = async (fromUserId) => {
    setReqUsers(prev => prev.map(user =>
      user._id === fromUserId ? { ...user, status: "request-declined" } : user
    ));
    await connectJS.declineRequest(fromUserId, user.token); 
  };

  const handleFindFriendsClick = () => {
    dispatch(updateSidebarActiveTab("add-friends"));
  };

  return (
    <div className="space-y-0">
      <div className='bg-slate-900'>
        <input
          className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='overflow-y-scroll'>
        {loading ? 
          (<div className="p-4 text-gray-400">Loading...</div>)
          :
          filteredRequests.length > 0 ? filteredRequests.map((user, index) => (
            <div
              key={index}
              className="bg-slate-800 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer"
            >
              <UserCard
                name={user.username}
                type={user.status}
                onActionClick={() => acceptRequest(user._id)}
                onDeclineClick={() => declineRequest(user._id)}
              />
            </div>
          )):(
            <>
              <div className="p-4 text-gray-400">No Requests found.</div>   
              <div className='px-4 py-2 text-white'>               
                {reqUsers.length === 0 && (
                  <div className='text-center mt-4'>
                    <Button onClick={handleFindFriendsClick}>
                      Find Friends
                    </Button>
                  </div>            
                )}
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default AcceptFriends;
