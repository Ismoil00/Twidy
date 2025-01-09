import { User4Params } from "./types";
import { UserData } from "../global-types";

const userRandomData = (user: UserData) => {
  const keys: User4Params = ["userId", "firstname", "lastname", "description"];

  const randomIndex = Math.floor(Math.random() * keys.length);

  const randomKey = keys[randomIndex];

  return { key: randomKey, value: user[randomKey] };
};

export { userRandomData };
