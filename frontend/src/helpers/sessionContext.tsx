import { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

interface SessionContextProps {
  sessionSocket: Socket | null;
  connectToSessionSocket: () => Promise<void>;
}

export const sessionContext = createContext<SessionContextProps>({
  sessionSocket: null,
  connectToSessionSocket: async () => {},
});

export const SessionContextProvider = ({ children }: ProtectedRoutesProps) => {
  const [sessionSocket, setSessionSocket] = useState<null | Socket>(null);

  const connectToSessionSocket = async () => {
    const socket = io(`${process.env.REACT_APP_SERVER_URL}/socket/session`, {
      withCredentials: true,
    });
    socket.connect();
    setSessionSocket(socket);
  };

  return (
    <sessionContext.Provider value={{ connectToSessionSocket, sessionSocket }}>
      {children}
    </sessionContext.Provider>
  );
};
