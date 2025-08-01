import React, { useContext } from "react";
import { ChangeScoreFuncContext } from "./context";

export type Team = {
  name: string;
  logo: string;
};

export type Score = {
  goalsHome: number;
  goalsAway: number;
};

export type Game = {
  teamHome: Team;
  teamAway: Team;
  score: Score;
  day: number;
  index: number;
  date: Date;
};

interface PropsGamesComponant {
  gamesList: Game[];
}

export function GamesComponant(props: PropsGamesComponant) {
  const gamesList = props.gamesList;

  return (
    <>
      {gamesList.map((gameInfo, index) => (
        <GameComponent gameInfo={gameInfo} key={index} />
      ))}
    </>
  );
}

interface GameProps {
  gameInfo: Game; // The gameInfo prop
}

function GameComponent(props: GameProps) {
  const gameInfo = props["gameInfo"];
  const context = useContext(ChangeScoreFuncContext);

  return (
    <>
      <div>
        <span> {gameInfo.teamHome.name} </span>
        <span>
          {" "}
          <input
            type="text"
            size="3"
            onChange={(e) =>
              context.scoreChange(e, props.gameInfo.index, "home")
            }
          />{" "}
        </span>
        <span>
          {" "}
          <input
            type="text"
            size="3"
            onChange={(e) =>
              context.scoreChange(e, props.gameInfo.index, "away")
            }
          />{" "}
        </span>
        <span> {gameInfo.teamAway.name} </span>
      </div>
    </>
  );
}
