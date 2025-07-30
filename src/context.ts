import React, { createContext } from "react";

type HandleChangeType = (
  event: React.ChangeEvent<HTMLInputElement>,
  indice: number,
) => void;
export const changeScoreFuncContext = createContext<HandleChangeType[]>([]);

