import React, { useContext } from "react";
import { changeScoreFuncContext } from "./context";

export interface Game {
  team_home: string;
  team_away: string;
  logo_home: string;
  logo_away: string;
  home_score: number;
  away_score: number;
  day: number;
}

interface PropsGamesComponant {
  gamesList: Game[];
}

export function GamesComponant(props: PropsGamesComponant) {
  const gamesList = props.gamesList;

  return (
    <>
      {gamesList.map((gameInfo, index) => (
        <GameComponent gameInfo={gameInfo} indice={index} key={index} />
      ))}
    </>
  );
}

interface GameProps {
  gameInfo: Game; // The gameInfo prop
  indice: number;
}

function GameComponent(props: GameProps) {
  const gameInfo = props["gameInfo"];
  const changeScoreFunc = useContext(changeScoreFuncContext);
  
  return (
    <>
      <div>
        <span> {gameInfo.team_home} </span>
        <span>
          {" "}
          <input type="text" size="3" defaultValue={gameInfo.home_score} onChange={(e) => changeScoreFunc[0](e, props.indice)} />{" "}
        </span>
        <span>
          {" "}
          <input type="text" size="3" defaultValue={gameInfo.away_score} onChange={(e) => changeScoreFunc[0](e, props.indice)} />{" "}
        </span>
        <span> {gameInfo.team_away} </span>
      </div>
    </>
  );
}
