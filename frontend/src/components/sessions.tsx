import { useState, useEffect, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { sessionContext } from "../helpers/sessionContext";

const temp = [
  {
    id: "1",
    icon: null,
    device: "iPhone",
    location: "City, Country",
    date: "2025-01-15 17:45",
  },
  {
    id: "2",
    icon: null,
    device: "Samsung",
    location: "City, Country",
    date: "2025-01-15 17:45",
  },
  {
    id: "3",
    icon: null,
    device: "Browser",
    location: "City, Country",
    date: "2025-01-15 17:45",
  },
];

interface localStorageSession {
  userId: string;
  sessionId: string;
  token: string;
  fullName: string;
}

export default function Sessions(): JSX.Element {
  const [clicked, setClicked] = useState<string>("");
  const [userSessions, setUserSessions] = useState(null);
  const { sessionSocket } = useContext(sessionContext);

  useEffect(() => {
    const fetchUserSessions = () => {
      const data: localStorageSession = JSON.parse(
        localStorage.getItem("session") as string
      );
      sessionSocket.emit("session:userAllSessions", data["userId"]);

      sessionSocket.on("session:userAllSessions", (response: any) => {
        if (response.status !== 200) {
          console.error("SOCKET ERROR in fetching user sessions: ", response);
          return;
        }
        console.log("SESSIONS: ", response);
        // setUserSessions(sessions);
      });
    };

    fetchUserSessions();
  }, []);

  const deleteSession = async (id: string) => {
    console.log("delete session", id);
  };

  return (
    <div>
      {temp.map((session: any) => (
        <section
          key={session.id}
          onClick={() =>
            setClicked((p: string) => (p !== session.id ? session.id : ""))
          }
          className="bg-brand_white mt-5 px-4 py-2 rounded-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-between cursor-pointer hover:shadow-md transition-shadow hover:duration-300 active:shadow-lg active:duration-100 relative"
        >
          <div className="flex flex-col sm:flex-row sm:gap-10 items-center text-brand_text_primary">
            <img
              src="assets/phone.svg"
              alt="user session device"
              className="w-15 h-15"
            />
            <p>{session.device}</p>
            <p>{session.location}</p>
          </div>
          <div className="text-brand_text_secondary">
            <p
              className={`${
                clicked === session.id ? "sm:animate-moveLeft_02" : ""
              }`}
            >
              {session.date}
            </p>
            {clicked === session.id && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className={`h-full w-20 bg-brand_red absolute right-0 top-0 rounded-r-2xl grid place-content-center text-brand_white ${
                  clicked === session.id ? "animate-moveLeft_01" : ""
                }`}
              >
                <FaTrashAlt style={{ scale: "2" }} />
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
