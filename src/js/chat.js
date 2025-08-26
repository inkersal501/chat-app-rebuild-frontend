import axios from "axios";
import {apiEndpoint} from "./config";

const getChatList = async (userToken) => {

    try {
        const result = await axios.get(`${apiEndpoint}/chat/chatlist`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){      
            return {status: true, chatlist: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response.data.msg};
    }
};



export default { getChatList };