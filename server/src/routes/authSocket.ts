import { Socket } from "socket.io";

class ActiveSocketSessions {
  private activeSocketSessions: {
    [userId: string]: {
      [sessionId: string]: Socket;
    };
  };

  constructor() {
    this.activeSocketSessions = {};
  }

  addSession(userId: string, sessionId: string, socket: Socket) {
    if (!this.activeSocketSessions[userId]) {
      this.activeSocketSessions[userId] = {};
    }
    this.activeSocketSessions[userId][sessionId] = socket;
  }

  removeSession(userId: string, sessionId: string) {
    if (
      this.activeSocketSessions[userId] &&
      this.activeSocketSessions[userId][sessionId]
    ) {
      delete this.activeSocketSessions[userId][sessionId];
    }
  }

  getUserSessions(userId: string) {
    return this.activeSocketSessions[userId] || {};
  }
}
const activeSessions = new ActiveSocketSessions();

interface SessionProps {
  userId: string;
  sessionId: string;
}

const handleSessionAddEvent = (socket: Socket) => {
  return (value: SessionProps, callback: (params: any) => void) => {
    if (!socket) {
      callback({
        status: 500,
        message: "Invalid Socket. Socket is missing",
      });
      return;
    }

    activeSessions.addSession(value.userId, value.sessionId, socket);
    callback({ status: 200, message: "Session added successfully" });
  };
};

const handleSessionRemoveEvent = (socket: Socket) => {
  return (value: SessionProps, callback: (params: any) => void) => {
    if (!socket) {
      callback({
        status: 500,
        message: "Invalid Socket. Socket is missing",
      });
      return;
    }

    activeSessions.removeSession(value.userId, value.sessionId);
    callback({ status: 200, message: "Session removed successfully" });
  };
};

export const sessionSocketConnection = async (socket: Socket) => {
  // console.log(`new socket connected: ${socket.id}`);

  socket.on("session:add", handleSessionAddEvent(socket));

  socket.on("session:remove", handleSessionRemoveEvent(socket));
};

/* 
  + connect to socket;
  + clean cookie + front-storeage and redirect on session deletion|logout;
  - broadcast to others userId session of the new log-in;
  - get the list of user's sessions;
  - redirect a session when it is deleted from another one;
*/
