import { useCallback, useEffect, useMemo, useState } from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import { updateActiveTab } from '@store/sidebarSlice';
import {connectService} from "@js";
import UserCard from "../common/UserCard";
import Button from '../common/Button';

function FriendRequests() {
  
  const dispatch = useDispatch();
  const [reqUsers, setReqUsers] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const {user} = useSelector((state)=>state.auth);

  useEffect(() => {
    async function getRequests() {
      setLoading(true);
      const result = await connectService.getRequests(user.token);
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

  const filterRequests = useMemo((search) => {
    if(!search) return reqUsers;
    const filtered = reqUsers.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [reqUsers, search]);

  useEffect(()=> {
    if(search === "")
      setFilteredRequests(reqUsers);
    else
      filterRequests(search);
    //eslint-disable-next-line
  }, [search]);

  const acceptRequest = useCallback(async (fromUserId) => { 
    setReqUsers(prev => prev.map(user =>
      user._id === fromUserId ? { ...user, status: "request-accepted" } : user
    ));

    await connectService.acceptRequest(fromUserId, user.token); 
  }, [user]);

  const declineRequest = useCallback(async (fromUserId) => {
    setReqUsers(prev => prev.map(user =>
      user._id === fromUserId ? { ...user, status: "request-declined" } : user
    ));
    await connectService.declineRequest(fromUserId, user.token); 
  }, [user]);

  const handleFindFriendsClick = () => {
    dispatch(updateActiveTab("add-friends"));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 shrink-0">
        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-md bg-slate-700 border-b border-gray-400 px-4 py-2 text-white focus:outline-none"
        />
      </div> 
      <div className="flex-1 overflow-y-auto px-2 scrollbar-custom">
        {loading ? 
          (<div className="p-4 text-gray-400">Loading...</div>)
          :
          filteredRequests.length > 0 ? filteredRequests.map((user, index) => (
            <div
              key={index}
              className="border-b border-slate-700 px-2 py-1 cursor-pointer"
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

export default FriendRequests;
