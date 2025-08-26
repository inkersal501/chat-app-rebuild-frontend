import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../js/config";
 
const chatSlice = createSlice({
    name : "chat",
    initialState: defaultState.chat, 
    reducers : {         
        updateActiveChat : (state, action) => {
            state.activeChat = { ...action.payload}; 
        },
        updateRefreshList : (state, action) => {
            state.refreshList = action.payload; 
        }, 
    }
}); 

export const { updateActiveChat, updateRefreshList} = chatSlice.actions;
export default chatSlice.reducer;