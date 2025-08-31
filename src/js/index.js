import auth from "./auth";
import chat from "./chat"; 
import connect from "./connect";
import message from "./message";
import user from "./user";
import server from "./server";
import analytics from "./analytics";

export const authService = auth;
export const chatService = chat; 
export const connectService = connect;
export const messageService = message;
export const userService = user;
export const socketService = server;
export const analyticsService = analytics;