import { useCallback, useEffect, useMemo, useState } from 'react'; 
import { useSelector } from "react-redux";
import {connectService} from "@js";
import UserCard from "../common/UserCard";

function AddFriends() {

  const [sugg, setSugg] = useState([]);
  const [filteredSugg, setFilteredSugg] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getSuggestions() {
      setLoading(true);
      const result = await connectService.getSuggestions(user.token); 
      if (result.status && result.suggestions.length > 0) {
        setSugg(result.suggestions.map(s => ({ ...s, status: "send" })));
      } 
      setLoading(false);
    }
    getSuggestions();
    //eslint-disable-next-line
  }, []);

  useEffect(()=> {
    setFilteredSugg(sugg);
  }, [sugg]);

  const filterUsers = useMemo((search) => {
    if(!search) return sugg;
    const filtered = sugg.filter((f) =>
      f.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSugg(filtered);
  }, [sugg, search]);

  useEffect(()=> {
    if(search === "")
      setFilteredSugg(sugg);
    else
      filterUsers(search);
    //eslint-disable-next-line
  }, [search]);


  const sendRequest = useCallback(async (toUserId) => { 
    setSugg(prev => prev.map(user =>
      user._id === toUserId ? { ...user, status: "request-sent" } : user
    ));

    await connectService.sendRequest(toUserId, user.token); 
  }, [user]);

  return (
    <div className="flex flex-col h-full"> 
      <div className="p-2 shrink-0">
        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for friends"
        className="w-full rounded-md bg-slate-700 border-b border-gray-400 px-4 py-2 text-white focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 scrollbar-custom">
        {loading ? 
          (<div className="p-4 text-gray-400">Loading...</div>)
          :
          filteredSugg.length > 0 ? filteredSugg.map((user, index) => (
            <div key={index} className="border-b border-slate-700 px-2 py-1 my-1 cursor-pointer">
              <UserCard
                name={user.username}
                type={user.status}
                onActionClick={() => sendRequest(user._id)}
              />
            </div>
          )): ( <div className="p-4 text-gray-400">No Users found.</div> )
        }
      </div>
    </div>
  );
}

export default AddFriends;
