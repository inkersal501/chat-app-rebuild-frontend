import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { ImCheckmark } from "react-icons/im";
import IconButton from "./IconButton";
import { useState } from "react";
import {userJS} from "../js";
import { login } from "../redux/authSlice";

const SettingsPanel = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user.username || "");

    const handleUsernameUpdate = async () => { 
        try {
            const update = await userJS.updateUsername(user.token, username);
            dispatch(login({ ...update }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-center p-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full text-gray-900
                    bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-4xl uppercase">
                    {user.username[0]}
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="w-90">
                        <label htmlFor="username">Username</label>
                        <input 
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            id="username"
                            type="text"
                            className="border border-slate-700 bg-slate-900 w-full py-3 px-3 rounded-lg focus-visible:outline-none"
                        />
                    </div>
                    <div className="w-10 text-center flex items-center justify-center pt-4">
                        <IconButton 
                            icon={<ImCheckmark />}
                            tooltip={"Update"}
                            active={true}
                            onClick={handleUsernameUpdate}
                            position="top"
                        />
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default SettingsPanel;