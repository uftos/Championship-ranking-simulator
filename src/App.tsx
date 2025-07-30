import "./App.css";
import React, { useState, useEffect } from "react";

import {
  DistrictPicker,
  ChampionshipPicker,
  PoolPicker,
} from "./districtPicker";
import { Ranking, teamRanking } from "./ranking";
import { GamesComponant, Game } from "./games.jsx";
import { SelectDay } from "./selectDay";
import { gamesAPICall, rankingAPICall } from "./scraping";

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

  const [rankingList, setRankingList] = useState<teamRanking[]>([]);
  useEffect(() => {
    async function getRanking() {
      const rankingInfo = await rankingAPICall();
      setRankingList(rankingInfo);
    }
    getRanking();
  }, []);

  /*
type HandleChangeType = (
  event: React.ChangeEvent<HTMLInputElement>,
  indice: number,
) => void;
  const handleChangeHome = (
    event: React.ChangeEvent<HTMLInputElement>,
    indice: number,
  ) => {
    gamesList[indice].home_score = Number(event.currentTarget.value);
  };
  const handleChangeAway = (
    event: React.ChangeEvent<HTMLInputElement>,
    indice: number,
  ) => {
    gamesList[indice].away_score = Number(event.currentTarget.value);
  };
  */

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
      <Ranking rankingList={rankingList} />
      <SelectDay currentDay="22" />
      <GamesComponant gamesList={gamesList} />
    </>
  );
}
