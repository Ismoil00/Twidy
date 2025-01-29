import { Socket } from "socket.io";

// const activeSessions = {
//   userId1: {
//     sessionId1: "socket1",
//     sessionId2: "socket2",
//     sessionId3: "socket2",
//   },
//   userId2: {
//     sessionId1: "socket1",
//     sessionId2: "socket2",
//     sessionId3: "socket2",
//   },
// };

class ActiveSocketSessions {
  activeSocketSessions: {
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
  userId: "";
  sessionId: "";
}

export const socketConnection = async (socket: Socket) => {
  // console.log(`new socket connected: ${socket.id}`);

  socket.on(
    "session:add",
    (value: SessionProps, callback: (params: any) => void) => {
      console.log("received socket message", value);

      if (!socket) {
        callback({ status: 500, message: "Invalid Socket" });
        return;
      }

      activeSessions.addSession(value.userId, value.sessionId, socket);
      callback({ status: 200, message: "Session added successfully" });
    }
  );
};

/* 
  1. connect to socket;
  2. broadcast to others userId session of the new log-in;
  3. clean cookie + front-storeage and redirect on session deletion|logout;
*/
