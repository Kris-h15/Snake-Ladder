import { io } from "socket.io-client";
export default function connectsocket() {
  return io("https://snake-ladder-fvqz.onrender.com/");
}
