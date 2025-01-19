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
    // session check
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
          credentials: "include",
          ...(method !== "GET" && { "Content-Type": "application/json" }),
          ...(headers || {}),
        },
      }
    ); // 403, 401, 200, ...;

    console.log("RESPONSE: " + onlyOne, response);

    if (response.status === 200)
      return response; // if success -> return response
    else if (
      response.status === 401 &&
      response.statusText === "TokenExpiredError"
      && onlyOne === 1
    ) {
      // access token has expired -> refresh token verfication
      return await getNewAccessToken(parsedSession, endpoint, method, headers);
    } else throw response; // return other types of errors
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
    console.log("REFRESH TOKEN RESPONSE: ", response);
    if (response.status !== 200) throw response;

    const newAcessToken = response.headers.get("Authorization");
    localStorage.setItem(
      "session",
      JSON.stringify({ ...session, token: newAcessToken })
    );

    return await genServerReq(endpoint, method, headers);
  } catch (error) {
    return error;
  }
}
