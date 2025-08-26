import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "@js/config";

const initialState = { 
  isLoggedin : localStorage.getItem("isLoggedin") || defaultState.auth.isLoggedin,
  user : JSON.parse(localStorage.getItem("user")) || defaultState.auth.user,  
};

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    login : (state, action) => {
      state.user = {...state.user, ...action.payload};
      state.isLoggedin = true;
      localStorage.setItem("isLoggedin", JSON.stringify(state.isLoggedin));
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout : (state) => {
      state.user = defaultState.auth.user;
      state.isLoggedin = defaultState.auth.isLoggedin; 
    }, 
  },
});
  
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 
