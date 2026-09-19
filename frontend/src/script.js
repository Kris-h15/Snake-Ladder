import { io } from "socket.io-client";
export default function connectsocket() {
  return io("http://localhost:3000");
}
