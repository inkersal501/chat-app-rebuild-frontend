import axios from "axios";
import {apiEndpoint} from "./config";
import { toast } from "react-toastify";

const getSuggestions = async (userToken) => {

    try {
        const result = await axios.get(`${apiEndpoint}/connect/suggestions`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){      
            return {status: true, suggestions: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response.data.msg};
    }
};

const sendRequest = async (toUserId, userToken) => {
    try {
        const result = await axios.post(`${apiEndpoint}/connect/request/${toUserId}`,{}, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){        
            return true;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg); 
        return false;
    }
};

const getRequests = async (userToken)=> {
    try {
        const result = await axios.get(`${apiEndpoint}/connect/requests`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){        
            return {status: true, requests: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response.data.msg};
    }
}

const acceptRequest = async (fromUserId, userToken) => {
    try {
        const result = await axios.post(`${apiEndpoint}/connect/accept/${fromUserId}`,{}, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){         
            return true;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
};

const declineRequest = async (fromUserId, userToken) => {
    try {
        const result = await axios.post(`${apiEndpoint}/connect/decline/${fromUserId}`,{}, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){         
            return true;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
};

const getFriends = async (userToken) => {
    try {
        const result = await axios.get(`${apiEndpoint}/connect/friends`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){        
            return {status: true, friends: result.data.list};
        }            
    } catch (error) {   
        return {status: false, msg: error.response.data.msg};
    }
};
export default { getSuggestions, sendRequest, getRequests, acceptRequest, getFriends, declineRequest };