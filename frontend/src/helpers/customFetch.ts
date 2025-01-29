import Notify from "../components/toast";

interface Session {
  userId: string;
  sessionId: string;
  token: string;
}

let onlyOne = 1; // to prevent infinite loop

export default async function genServerReq(
  endpoint: string,
  method: string = "GET",
  headers?: { [index: string]: string }
): Promise<any> {
  try {
    const session: string | null = localStorage.getItem("session");

    if (!session) throw new Error("Session not found");
    const parsedSession: Session = JSON.parse(session);

    // request to the server
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
      {
        method,
        headers: {
          Accept: "application/json",
          authorization: parsedSession["token"],
          ...(method !== "GET" && { "Content-Type": "application/json" }),
          ...(headers || {}),
        },
        credentials: "include",
      }
    ); // 403, 401, 200, ...;

    if (response.status === 200) return response;
    else if (
      response.status === 401 &&
      response.statusText === "TokenExpiredError" &&
      onlyOne === 1
    ) {
      return await getNewAccessToken(parsedSession, endpoint, method, headers);
    } else if (
      response.status === 403 &&
      response.statusText === "RedirectToLoginPage"
    ) {
      redirectUserToLogin(response);
    } else throw response;
  } catch (error) {
    return error;
  }
}

async function getNewAccessToken(
  session: Session,
  endpoint: string,
  method: string = "GET",
  headers?: { [index: string]: string }
): Promise<any> {
  try {
    onlyOne++;
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/refresh-token`,
      {
        method: "GET",
        credentials: "include",
      }
    ); // 403, 500, 200
    if (response.status !== 200) throw response;

    const newAcessToken = response.headers.get("Authorization");
    localStorage.setItem(
      "session",
      JSON.stringify({ ...session, token: newAcessToken })
    );

    return await genServerReq(endpoint, method, headers);
  } catch (error: any) {
    if (error.status === 403 && error.statusText === "RedirectToLoginPage") {
      redirectUserToLogin(error);
      return;
    }

    return error;
  }
}

async function redirectUserToLogin(res: Response) {
  const data = await res.json();
  Notify(data.msg, "error");
  localStorage.removeItem("session");
  setTimeout(() => {
    window.location.href = "/login";
  }, 5000);
}
