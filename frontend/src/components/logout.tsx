import Button from "./button";
import { useNavigate } from "react-router-dom";
import Notify from "./toast";
import { useContext } from "react";
import { sessionContext } from "../helpers/sessionContext";
import { LocalStorageSession } from "../globalTypes";

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
      /* HTTP ERROR HANDLE */
      if (response.status !== 204) throw await response.json();

      // /* WE REMOVE SESSION SOCKET TOO */
      // let socketResponse;
      // if (sessionSocket !== undefined && sessionSocket.connected) {
      //   const data: LocalStorageSession = JSON.parse(
      //     localStorage.getItem("session") as string
      //   );
      //   socketResponse = await sessionSocket.emitWithAck("session:logout", {
      //     userId: data["userId"],
      //     sessionId: data["sessionId"],
      //   });
      // }
      // /* SOCKET ERRORS HANDLER */
      // if (sessionSocket === undefined || sessionSocket.disconnected)
      //   throw { message: "SOCKET is disconnected or undefined" };
      // else if (socketResponse.status !== 200) throw socketResponse;

      localStorage.removeItem("session");
      navigate("/login");
      Notify("You logged out", "info");
    } catch (error: any) {
      Notify(error?.message || `LOGOUT ERROR`, "error");
      console.error("LOGOUT ERROR: ", error);
    } finally {
      sessionSocket && sessionSocket.disconnect();
    }
  };

  return (
    <div
      onClick={handleLogout}
      className="text-center font-700 text-brand_text_primary cursor-pointer hover:text-brand_text_primary/60 duration-200 transition"
    >
      logout
    </div>
  );
}
