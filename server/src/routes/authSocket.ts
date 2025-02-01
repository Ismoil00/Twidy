import { Socket } from "socket.io";
import { query } from "../configs/db";
import {
  GET_ALL_USER_SESSIONS,
  DEELTE_SESSION_VIA_SESSIONID,
} from "../helpers/queries";

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

  getSession(userId: string, sessionId: string) {
    if (
      this.activeSocketSessions[userId] &&
      this.activeSocketSessions[userId][sessionId]
    ) {
      return this.activeSocketSessions[userId][sessionId];
    }
    return null;
  }

  async fetchUserAllSessions(userId: string) {
    let userSessions: any;
    try {
      userSessions = await query(GET_ALL_USER_SESSIONS, [userId]);
      if (userSessions.status !== 200) throw userSessions;
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

const handleSessionLogoutEvent = (socket: Socket) => {
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
    setTimeout(() => socket.disconnect(), 500);
  };
};

let i = 0;
const handleSessionRemoveEvent = (socket: Socket) => {
  return async (value: SessionProps, callback: (params: any) => void) => {
    if (!socket) {
      callback({
        status: 500,
        message: "Invalid Socket. Socket is missing",
      });
      return;
    }

    // console.log("_______________________");
    // console.log("calling this function several times", i++);
    // console.log("_______________________");

    /* DELETE THE SESSION FROM DB & ACTIVE SESSION SOCKETS */
    let _socket: Socket | null;
    try {
      const sessionDeletion = await query(DEELTE_SESSION_VIA_SESSIONID, [
        value.sessionId,
      ]);
      if (sessionDeletion.status !== 200) throw sessionDeletion;

      _socket = activeSessions.getSession(value.userId, value.sessionId);
      activeSessions.removeSession(value.userId, value.sessionId);
    } catch (error) {
      console.error("SOCKET ERROR in session removal: ", error);
      callback({
        status: 500,
        message: "ERROR in deleting session from DB",
        error,
      });
      return;
    }

    /* CLEAN COOKIES -> DISCONNECT ITS SOCKET */
    if (_socket) {
      _socket.emit("session:remove", {
        status: 200,
        message: "Now remove COOKIES Please!",
      });
      setTimeout(() => _socket.disconnect(), 500);
    }

    /* NEW LIST OF ACTIVE SESSION */
    await activeSessions.fetchUserAllSessions(value.userId);
    socket &&
      callback({
        status: 200,
        message: "SESSION was successfully removed",
      });
  };
};

export const sessionSocketConnection = async (socket: Socket) => {
  console.log(`new socket connected: ${socket.id}`);

  socket.on("session:add", handleSessionAddEvent(socket));

  socket.on("session:logout", handleSessionLogoutEvent(socket));

  socket.on("session:remove", handleSessionRemoveEvent(socket));

  socket.on("session:userAllSessions", (userId: string) => {
    activeSessions.fetchUserAllSessions(userId);
  });

  socket.on("disconnect", (reason) => {
    console.log(
      `Socket Client-Side ${socket.id} disconnected. Reason:`,
      reason
    );
  });
};

/* 
  BUGS:

  - [development] several call of the clean-cookie http request;
  - [development] deleting your own session or anyother session while their socket
  is not connected anymore make it blocked (if it is the current session) and 
  make other sessions refresh-token suspicious since they do not exist in the DB anymore
*/

/* 
  - broadcast to other userId sessions of the new log-in;
*/
