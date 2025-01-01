export const USER_EXISTANCE_BY_USERNAME =
  "SELECT 1 FROM profile.users u WHERE u.username = $1";
export const GET_USER_BY_USERNAME =
  "SELECT row_to_json(u) FROM profile.users u WHERE u.username = $1";
