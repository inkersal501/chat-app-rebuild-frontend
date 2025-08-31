import axios from "axios";
import { apiEndpoint } from "./config"; 

const getData = async (userToken) => {
    try {
        const result = await axios.get(`${apiEndpoint}/analytics`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        }); 
        if(result.status === 200){      
            return {status: true, data: result.data};
        }           
    } catch (error) {
        return {status: false, msg: error.response.data.msg};
    }
};
export default { getData };