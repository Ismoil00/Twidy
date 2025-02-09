import { SessionComponentProps } from "../types";
import { FaTrashAlt } from "react-icons/fa";

export default function Session({
  session,
  clicked,
  setClicked,
  deleteSession,
}: SessionComponentProps): JSX.Element {
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
}
