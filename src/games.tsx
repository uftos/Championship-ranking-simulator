import React, { useState, useEffect } from "react";

export interface Game {
  team_home: string;
  team_away: string;
  logo_home: string;
  logo_away: string;
  home_score: number;
  away_score: number;
  day: number;
}

export function GamesComponant(gameList: Game[]) {

  const handleChangeHome = (event: React.ChangeEvent<HTMLInputElement>, indice: number) => {
    gameList[indice].home_score = Number(event.currentTarget.value);
  };
  const handleChangeAway = (event: React.ChangeEvent<HTMLInputElement>, indice: number) => {
    gameList[indice].away_score = Number(event.currentTarget.value);
  };

  return (
    <>
      {gameList.map((gameInfo, index) => (
        <GameComponent gameInfo={gameInfo} indice={index} handleChangeHome={handleChangeHome} handleChangeAway={handleChangeAway} key={index} />
      ))}
    </>
  );
}

type HandleChangeType = (event: React.ChangeEvent<HTMLInputElement>, indice: number) => void;

interface GameProps {
  gameInfo: Game; // The gameInfo prop
  indice: number;
  handleChangeHome: HandleChangeType;
  handleChangeAway: HandleChangeType;
}

function GameComponent(props: GameProps) {
  const gameInfo = props["gameInfo"];
  console.log("gameComponent");
  return (
    <>
      <div>
        <div> {gameInfo.team_home} </div>
        <div> {gameInfo.team_away} </div>
        <div> <input type="text" size="3" defaultValue={gameInfo.home_score} onChange={(e) => props.handleChangeHome(e, props.indice)}/> </div>
        <div> <input type="text" size="3" defaultValue={gameInfo.away_score} onChange={(e) => props.handleChangeAway(e, props.indice)}/> </div>
      </div>
    </>
  );
}
