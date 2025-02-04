import { useState, useEffect, useContext } from "react";
import { sessionContext } from "../../helpers/sessionContext";
import Notify from "../../components/toast";
import { useNavigate } from "react-router-dom";
import { UserSession, UserSessions } from "./types";
import { LocalStorageSession } from "../../globalTypes";
import Session from "./session";

const tempCurrentSession: UserSession = {
  sessionId: "3aad005a-1a29-4dd1-a65c-1014422b424e",
  userId: "32da80ad-f856-48fc-aaa0-97bd3613d880",
  ip: "::1",
  browser: "Chrome",
  createdAt: "2025-02-02 14:27",
  location: "Tajikistant",
};
const tempOtherSessions: UserSession[] = [
  {
    sessionId: "d8aaa132-5d26-4342-a8b0-0e538afabe7e",
    userId: "32da80ad-f856-48fc-aaa0-97bd3613d880",
    ip: "::ffff:127.0.0.1",
    browser: "Firefox",
    createdAt: "2025-02-02 14:16",
    location: "Tajikistant",
  },
  {
    sessionId: "2615fa96-2fee-4afc-afb4-eaed1dd0466a",
    userId: "32da80ad-f856-48fc-aaa0-97bd3613d880",
    ip: "::1",
    browser: "Chrome",
    createdAt: "2025-02-02 14:10",
    location: "Tajikistant",
  },
  {
    sessionId: "c7d6f351-34f0-4cbd-8973-2677a05cb4f4",
    userId: "32da80ad-f856-48fc-aaa0-97bd3613d880",
    ip: "::1",
    browser: "Chrome",
    createdAt: "2025-02-02 14:03",
    location: "Tajikistant",
  },
];

export default function Sessions(): JSX.Element {
  const [clicked, setClicked] = useState<string>("");
  const [userSessions, setUserSessions] = useState<UserSessions>({
    currentSession: tempCurrentSession,
    otherSessions: tempOtherSessions,
    // currentSession: null,
    // otherSessions: null,
  });
  const { sessionSocket } = useContext(sessionContext);
  const currentSession: LocalStorageSession = JSON.parse(
    localStorage.getItem("session") as string
  );
  const navigate = useNavigate();

  useEffect(() => {
    return;
    const fetchUserSessions = () => {
      if (sessionSocket !== undefined && sessionSocket.connected) {
        sessionSocket.emit("session:userAllSessions", currentSession["userId"]);

        sessionSocket.on("session:userAllSessions", (response: any) => {
          if (response.status !== 200) {
            console.error("SOCKET ERROR in fetching user sessions: ", response);
            return;
          }

          const sessions: UserSession[] = response.sessions;
          // console.log("SESSIONS: ", sessions);
          const newOtherSessions = sessions.filter(
            (session) => session.sessionId !== currentSession.sessionId
          );
          const newCurrentSession = sessions.find(
            (session) => session.sessionId === currentSession.sessionId
          );
          setUserSessions({
            currentSession: newCurrentSession || null,
            otherSessions:
              newOtherSessions.length > 0 ? newOtherSessions : null,
          });
        });

        /* WHEN THIS SESSION IS REMOVED FROM ANY SESSION */
        sessionSocket.on("session:remove", async (response: any) => {
          if (response.status !== 200) {
            console.error("SOCKET ERROR in session removal: ", response);
            return;
          }
          console.log("2", response);

          const cleanCookies = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/auth/clean-cookies`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (cleanCookies.status !== 204) {
            console.error("Failed to clean cookies: ", cleanCookies);
            return;
          }
          console.log("3", cleanCookies);

          localStorage.removeItem("session");
          navigate("/login");
          Notify("You logged out", "info");
        });
      } else {
        console.error(
          "SESSION SOCKET is disconnected or undefined (sessions component): ",
          sessionSocket
        );
      }
    };

    fetchUserSessions();
  }, [sessionSocket]);

  const deleteSession = async (session: UserSession) => {
    return;
    if (!sessionSocket || sessionSocket.disconnected) {
      console.error(
        "SESSION SOCKET is disconnected or undefined (sessions component): ",
        sessionSocket
      );
      return;
    }

    try {
      const socketResponse = await sessionSocket.emitWithAck("session:remove", {
        userId: session["userId"],
        sessionId: session["sessionId"],
      });
      if (socketResponse.status === 500) throw socketResponse;
      console.log("1", socketResponse);
    } catch (error: any) {
      Notify(error?.message || `SESSION-REMOVAL ERROR`, "error");
      console.error("SESSION-REMOVAL ERROR: ", error);
    }
  };

  return (
    <div>
      {/* <button onClick={() => sessionSocket.disconnect()}>
        disconnect socket
      </button> */}
      {/* CURRENT SESSION */}
      {userSessions.currentSession ? (
        <>
          <h2
            className="text-brand_text_primary text-xl
          text-center font-bold -mb-3"
          >
            Current Session
          </h2>
          <Session
            session={userSessions.currentSession}
            clicked={clicked}
            setClicked={setClicked}
            deleteSession={deleteSession}
          />
        </>
      ) : (
        <p className="text-brand_red text-xl text-center">
          No current session found. Something is wrong!
          <br />
          Please check your internet connection or try again.
        </p>
      )}

      {/* OTHER SESSIONS */}
      {userSessions.otherSessions ? (
        <>
          <h2
            className="text-brand_text_primary text-xl
          text-center mt-6 -mb-3"
          >
            Other Sessions
          </h2>
          {userSessions.otherSessions.map((session: UserSession) => (
            <Session
              key={session.sessionId}
              session={session}
              clicked={clicked}
              setClicked={setClicked}
              deleteSession={deleteSession}
            />
          ))}
        </>
      ) : (
        <p className="text-brand_text_primary text-xl text-center">
          No Other Sessions Found.
        </p>
      )}
    </div>
  );
}
