import React from "react";
import defaultAvatarPath from "../images/kusto.jpg";

export const CurrentUserContext = React.createContext();

export const defaultUser = {
  name: "Имя",
  about: "Описание",
  avatar: defaultAvatarPath,
};
