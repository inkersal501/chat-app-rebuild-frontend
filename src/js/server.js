import { io } from "socket.io-client";
import {socketEndpoint} from "./config";

const socket = io(socketEndpoint); 

export default socket;