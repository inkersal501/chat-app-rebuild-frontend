import axios from "axios";
import {apiEndpoint} from "./config";
import { toast } from "react-toastify";

const updateUsername = async (userToken, username)=>{ 
    try {
        const result = await axios.patch(`${apiEndpoint}/user/username`, {username}, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){
            toast.success(result.data.msg);        
            return result.data.user;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
};
export default { updateUsername };