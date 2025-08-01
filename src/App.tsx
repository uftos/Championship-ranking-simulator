import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
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
  const handleScoreChange = (
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
  };

  const ranking = useMemo(
    () => computeChampionship(gamesList, scoreModif, rankingList),
    [scoreModif, gamesList],
  );

  const actualDay = Math.max(...gamesList.map((game) => game.day));

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
      <SelectDay currentDay={actualDay} />
      <ChangeScoreFuncContext value={{ scoreChange: handleScoreChange }}>
        <GamesComponant gamesList={gamesList} />
      </ChangeScoreFuncContext>
    </>
  );
}
