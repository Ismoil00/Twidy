import Logout from "../../components/logout";
import genServerReq from "../../configs/customFetch";

export default function HomePage() {
  const serverRequest = async () => {
    try {
      const response = await genServerReq("session", "POST");
      const data = await response.json();

      // console.log("Where it is CALLED FROM: ", response);
      console.log("Where it is CALLED FROM: ", data);
    } catch (error) {
      console.log("Where it is CALLED FROM ERROR: ", error);
    }
  };

  return (
    <div>
      <Logout />
      HomePage
      <button
        className="block mt-5 mx-auto px-5 py-1 border border-red-500 bg-slate-500"
        onClick={serverRequest}
      >
        click
      </button>
    </div>
  );
}
