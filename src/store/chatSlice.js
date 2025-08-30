import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "@js/config";
 
const chatSlice = createSlice({
    name : "chat",
    initialState: defaultState.chat, 
    reducers : {         
        updateActiveChat : (state, action) => {
            state.activeChat = { ...action.payload}; 
        },
        updateFirstChat : (state, action) => {
            state.firstChat = { ...action.payload}; 
        },
        updateRefreshList : (state, action) => {
            state.refreshList = action.payload; 
        },
        updateGetList : (state, action) => {
            state.getList = action.payload; 
        },  
    }
}); 

export const { updateActiveChat, updateFirstChat, updateRefreshList, updateGetList } = chatSlice.actions;
export default chatSlice.reducer;