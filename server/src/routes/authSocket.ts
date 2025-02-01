import { Socket } from "socket.io";
import { query } from "../configs/db";
import { GET_ALL_USER_SESSIONS } from "../helpers/queries";

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

  async fetchUserAllSessions(userId: string) {
    let userSessions: any;
    try {
      userSessions = await query(GET_ALL_USER_SESSIONS, [userId]);
      if (userSessions.status !== 200) throw new Error(userSessions);
    } catch (error) {
      console.error("SOCKET ERROR in fetching user sessions: ", error);
    }

    const sockets = this.activeSocketSessions[userId] || {};
    for (let [sessionId, socket] of Object.entries(sockets)) {
      socket.emit("session:userAllSessions", userSessions);
    }
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
    socket.disconnect();
  };
};

export const sessionSocketConnection = async (socket: Socket) => {
  console.log(`new socket connected: ${socket.id}`);

  socket.on("session:add", handleSessionAddEvent(socket));

  socket.on("session:remove", handleSessionRemoveEvent(socket));

  socket.on("session:userAllSessions", (userId: string) => {
    console.log("userId: ", userId);
    // activeSessions.fetchUserAllSessions(userId);
  });

  socket.on("disconnect", (reason) => {
    console.log(
      `Socket Client-Side ${socket.id} disconnected. Reason:`,
      reason
    );
  });
};

/* 
  + connect to socket;
  + clean cookie + front-storeage and redirect on session deletion|logout;
  - broadcast to other userId sessions of the new log-in;
  - get the list of user's sessions;
  - redirect a session when it is deleted from another one;
*/
