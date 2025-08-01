import React, { createContext } from "react";

type HandleChangeType = (
  event: React.ChangeEvent<HTMLInputElement>,
  indice: number,
  homeOrAway: string,
) => void;
type ContextAttribute = {
  scoreChange: HandleChangeType;
};
export const ChangeScoreFuncContext = createContext<ContextAttribute>(null);
