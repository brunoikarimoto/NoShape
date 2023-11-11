import { useContext } from "react";

import { UserContext } from "../context/UserContext.jsx";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.log("Context não encontrado");

    return;
  }

  return context;
};
