import { useDispatch, useSelector } from "react-redux"; 
import { ImCheckmark } from "react-icons/im";
import IconButton from "../common/IconButton";
import { useCallback, useState } from "react";
import {userService} from "@js";
import { login } from "@store/authSlice";

const Settings = () => {

    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user.username || "");
    
    const handleUsernameUpdate = useCallback(async () => { 
        try {
            const update = await userService.updateUsername(user.token, username);
            dispatch(login({ ...update }));
        } catch (error) {
            console.error(error);
        }
    }, [user, dispatch, username]);

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
                    <div className="w-90 relative">
                        <label htmlFor="username">Username</label>
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            type="text"
                            className="w-full rounded-md bg-slate-700 border-b border-gray-400 px-4 py-2 text-white focus:outline-none pr-10" // <-- add padding-right for space
                        />

                         
                    </div>
                    <div className="w-10 text-center flex items-center justify-center pt-4">
                        <IconButton 
                            icon={<ImCheckmark size={12}/>}
                            tooltip={"Update"}
                            active={true}
                            onClick={handleUsernameUpdate}
                            position="top"
                        />
                    </div>
                </div>
                <div className="w-full my-4">
                    <label htmlFor="email">Email</label>
                    <input 
                        value={user.email} 
                        id="email"
                        readOnly
                        type="text"
                        className="w-full rounded-md bg-slate-700 border-b border-gray-400 px-4 py-2 text-white focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;