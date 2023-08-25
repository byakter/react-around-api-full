import { createContext } from "react";

export const CurrentUserContext = createContext({
  user: { name: "", avatar: "", about: "" },
});
