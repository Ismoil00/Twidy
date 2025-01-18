export const USER_EXISTANCE_BY_USERNAME: string =
  "SELECT 1 as response FROM profile.users u WHERE u.username = $1";
export const GET_USER_BY_USERNAME: string =
  "SELECT row_to_json(u) as response FROM profile.users u WHERE u.username = $1";
export const INSERT_USER_ON_REGISTRATION: string =
  "SELECT profile.insert_user_on_registration($1) as response";
export const INSERT_NEW_SESSION: string =
  "SELECT auth.insert_new_session($1) as response";
export const GET_ALL_USER_REFRESHTOKENS: string =
  "SELECT auth.get_refreshTokens_via_userId($1) as response";
export const SAVE_REUSED_REFRESHTOKEN: string =
  "SELECT auth.save_used_refreshToken($1, $2) as response";
export const DEELTE_SESSION_VIA_REFRESHTOKEN: string =
  "SELECT auth.delete_session_via_refreshToken($1) as response";
export const GET_SESSION_VIA_REFRESHTOKEN: string =
  "SELECT auth.get_session_via_refreshToken($1) as response";
export const UPDATE_SESSION_REFRESHTOKEN: string =
  "SELECT auth.update_session_refreshToken($1, $2) as response";
