import Button from "./button";
import { useNavigate } from "react-router-dom";
import Notify from "./toast";
import { useContext } from "react";
import { sessionContext } from "../helpers/sessionContext";

export default function Logout() {
  const navigate = useNavigate();
  const { sessionSocket } = useContext(sessionContext);

  const handleLogout = async () => {
    try {
      /* WE REMOVE SESSION */
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      /* WE REMOVE SESSION SOCKET TOO */
      const data = JSON.parse(localStorage.getItem("session") as string);
      const socketResponse = await sessionSocket?.emitWithAck(
        "session:remove",
        {
          userId: data["userId"],
          sessionId: data["sessionId"],
        }
      );

      /* WE HANDLE ERRORS */
      if (response.status !== 204 || socketResponse.status !== 200) {
        sessionSocket?.disconnect();
        throw response.status !== 204 ? await response.json() : socketResponse;
      }

      localStorage.removeItem("session");
      navigate("/login");
      Notify("You logged out", "info");
    } catch (error: any) {
      Notify(error.message || `LOGOUT ERROR`, "error");
      console.error("LOGOUT ERROR: ", error);
    }
  };

  return (
    <div>
      <Button text="logout" onClick={handleLogout} />
    </div>
  );
}
