import Button from "./button";
import { useNavigate } from "react-router-dom";
import Notify from "./toast";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status !== 204) throw await response.json();

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
