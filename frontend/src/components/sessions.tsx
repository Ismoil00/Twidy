import { useState, useEffect, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { sessionContext } from "../helpers/sessionContext";
import Notify from "./toast";
import { useNavigate } from "react-router-dom";

interface LocalStorageSession {
  userId: string;
  sessionId: string;
  token: string;
  fullName: string;
}

interface UserSession {
  sessionId: string;
  userId: string;
  ip: string;
  location: string;
  browser: string;
  createdAt: string;
}

interface UserSessions {
  currentSession: UserSession | null;
  otherSessions: UserSession[] | null;
}

interface SessionComponentProps {
  session: UserSession;
  clicked: string;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
  deleteSession: (session: UserSession) => Promise<void>;
}

export default function Sessions(): JSX.Element {
  const [clicked, setClicked] = useState<string>("");
  const [userSessions, setUserSessions] = useState<UserSessions>({
    currentSession: null,
    otherSessions: null,
  });
  const { sessionSocket } = useContext(sessionContext);
  const currentSession: LocalStorageSession = JSON.parse(
    localStorage.getItem("session") as string
  );
  const navigate = useNavigate();

  useEffect(() => {
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

const Session = ({
  session,
  clicked,
  setClicked,
  deleteSession,
}: SessionComponentProps) => {
  return (
    <section
      onClick={() =>
        setClicked((p: string) =>
          p !== session.sessionId ? session.sessionId : ""
        )
      }
      className="bg-brand_white mt-5 px-4 py-2 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-between cursor-pointer hover:shadow-md transition-shadow hover:duration-300 active:shadow-lg active:duration-100 relative"
    >
      <div className="flex flex-col sm:flex-row sm:gap-10 items-center text-brand_text_primary">
        <img
          src={`assets/${session.browser || "browser"}.svg`}
          alt="user session device"
          className="w-15 h-15"
        />
        <p>{session.browser || "unknown device"}</p>
        <p>{session.ip}</p>
      </div>
      <div className="text-brand_text_secondary">
        <p
          className={`${
            clicked === session.sessionId ? "sm:animate-moveLeft_02" : ""
          }`}
        >
          {session.createdAt}
        </p>
        {clicked === session.sessionId && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              deleteSession(session);
            }}
            className={`h-full w-20 bg-brand_red absolute right-0 top-0 rounded-r-2xl grid place-content-center text-brand_white ${
              clicked === session.sessionId ? "animate-moveLeft_01" : ""
            }`}
          >
            <FaTrashAlt style={{ scale: "2" }} />
          </div>
        )}
      </div>
    </section>
  );
};
