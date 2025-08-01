import "./App.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChangeScoreFuncContext } from "./context";

import {
  DistrictPicker,
  ChampionshipPicker,
  PoolPicker,
} from "./districtPicker";
import { Ranking, TeamRanking } from "./ranking";
import { GamesComponant, Game } from "./games.jsx";
import { SelectDay } from "./selectDay";
import { gamesAPICall, rankingAPICall } from "./scraping";
import { computeChampionship } from "./computeRanking";
import { useMap } from "usehooks-ts";

export default function App() {
  // code to place after poolPicker when the season restart
  const [gamesList, setGamesList] = useState<Game[]>([]);
  useEffect(() => {
    async function getMatch() {
      const gamesInfo = await gamesAPICall();
      setGamesList(gamesInfo);
    }
    getMatch();
  }, []);

  const [rankingList, setRankingList] = useState<TeamRanking>();
  useEffect(() => {
    async function getRanking() {
      const rankingInfo = await rankingAPICall();
      setRankingList(rankingInfo);
    }
    getRanking();
  }, []);

  const [scoreModif, actionScoreModif] = useMap<number, Game>([]);

  //TODO use just one function to don't have default score if the modif doesn't exist
  const handleScoreChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      indice: number,
      homeOrAway: string, //"home" or "away"
    ) => {
      let gameToUpdate = scoreModif.get(indice);
      if (!gameToUpdate) {
        gameToUpdate = {
          ...gamesList[indice],
          score: { goalsHome: 0, goalsAway: 0 },
        };
        console.log("og", gamesList, indice);
      }
      //TODO add error handling
      if (homeOrAway == "home") {
        gameToUpdate.score.goalsHome = Number(event.currentTarget.value);
      }
      if (homeOrAway == "away") {
        gameToUpdate.score.goalsAway = Number(event.currentTarget.value);
      }
      actionScoreModif.set(indice, gameToUpdate);
    },
    [gamesList],
  );

  const [day, setDay] = useState<number>(22);

  const ranking = useMemo(
    () => computeChampionship(gamesList, scoreModif, rankingList, day),
    [scoreModif, gamesList, day],
  );

  //const [day, setDay] = useState<number>(Math.max(...gamesList.map((game) => game.day)));
  const maxDay: number = useMemo(() => getMaxDay(gamesList), [gamesList]);

  const gameToDisplay = useMemo(() => {
    return gamesList.filter((game) => game.day > day);
    //.sort((a: Game, b: Game) => a.date.getTime() - b.date.getTime());
  }, [gamesList, scoreModif, day]);

  return (
    <>
      <DistrictPicker />
      <ChampionshipPicker />
      <PoolPicker />
      <h1>
        {" "}
        En attendant le debut de saison, la poule 1 de la D1 du calvados sera
        affiché{" "}
      </h1>
      <Ranking rankingList={ranking} />
      <SelectDay currentDay={maxDay} setDay={setDay} />
      <ChangeScoreFuncContext value={{ scoreChange: handleScoreChange }}>
        <GamesComponant gamesList={gameToDisplay} />
      </ChangeScoreFuncContext>
    </>
  );
}

function getMaxDay(gamesList: Game[]): number {
  console.log("compute max day");
  if (gamesList.length === 0) {
    return 0;
  }
  const maxDay = gamesList.reduce(
    (maxDay, currentGame) =>
      currentGame.day > maxDay ? currentGame.day : maxDay,
    0,
  );
  console.log(maxDay);
  return maxDay;
}
