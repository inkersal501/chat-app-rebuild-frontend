import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../js/config";

const sidebarSlice = createSlice({
    name : "sidebar",
    initialState : defaultState.sidebar, 
    reducers : {
        updateActiveTab : (state, action) => {
            state.activeTab = action.payload; 
        } 
    }
});
   

export const { updateActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;