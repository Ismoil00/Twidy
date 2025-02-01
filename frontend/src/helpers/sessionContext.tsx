import { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

interface SessionContextProps {
  sessionSocket: Socket;
  connectToSessionSocket: () => Promise<Socket>;
}

/* Dummy Socket Instance to Satisfy TypeScript */
const dummySocket = io({
  autoConnect: false,
});
dummySocket.disconnect();

export const sessionContext = createContext<SessionContextProps>({
  sessionSocket: dummySocket,
  connectToSessionSocket: async () => {
    return new Promise((resolve) => {
      resolve(dummySocket);
    });
  },
});

export const SessionContextProvider = ({ children }: ProtectedRoutesProps) => {
  const [sessionSocket, setSessionSocket] = useState<Socket>(dummySocket);

  const connectToSessionSocket = async (): Promise<Socket> => {
    return new Promise((resolve, reject) => {
      const socket = io(`${process.env.REACT_APP_SERVER_URL}/socket/session`, {
        withCredentials: true,
      });
      socket.connect();

      socket.on("connect", () => {
        console.log("SOCKET CONNECTED");
        setSessionSocket(socket);
        resolve(socket);
      });

      socket.on("connect_error", (error) => {
        console.log("SOCKET CONNECTION ERROR: ", error);
        reject(error);
      });

      socket.on("disconnect", (reason) => {
        console.log(`SOCKET SERVER-SIDE DISCONNECTED: ${reason}`);
      });
    });
  };

  return (
    <sessionContext.Provider value={{ connectToSessionSocket, sessionSocket }}>
      {children}
    </sessionContext.Provider>
  );
};
