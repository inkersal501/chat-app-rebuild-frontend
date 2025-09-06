import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
// import { resetDefault } from "@store/chatSlice";
import { logout } from "@store/authSlice";
import Logo from "@components/common/Logo";
import UserIcon from "./UserIcon";

function TopBar() {

  const {user} = useSelector((state) => state.auth);
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    dispatch(logout());
    // dispatch(resetDefault());
    localStorage.clear();
    toast.success("Logged Out successfully.");
    navigate("/");
  };
  
  return (
    <div className="py-2 px-4 bg-gray-900 flex justify-between items-center text-white">
      
      <div className="flex items-center gap-2">
        <Logo size="sm" />
        <h1 className="text-xl font-semibold m-0">Chat App</h1>
      </div>
      {user &&
      <div className="relative" ref={dropdownRef}> 
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-slate-700 px-2 py-1 rounded-lg transition"
          onClick={() => setShowLogout(!showLogout)}
        >
          <span className="text-sm">Hello, {user.username}</span>
          <UserIcon name={user.username[0] ? user.username[0] : ""}/>          
        </div>
 
        {showLogout && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-slate-700 border border-slate-600 z-50">
            <ul className="py-2 text-sm text-gray-200">
              <li>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-600 hover:text-white transition cursor-pointer"
                  onClick={handleLogout}
                >
                 <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      }
    </div>
  );
}

export default TopBar;
