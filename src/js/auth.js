import axios from "axios";
import { apiEndpoint } from "./config";
import { toast } from "react-toastify";

const signIn = async (data)=>{ 
    try {
        const result = await axios.post(`${apiEndpoint}/user/signin`, {...data});
        if(result.status === 200){
            toast.success(result.data.msg);        
            return result.data.user;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
};

const signUp = async (data) => {
    try {
        const result = await axios.post(`${apiEndpoint}/user/signup`, {...data}); 
        if(result.status === 201){
            toast.success(result.data.msg);
            return true;
        }            
    } catch (error) {
        toast.error(error.response.data.msg);
        return false;
    }
};
export default { signIn, signUp };