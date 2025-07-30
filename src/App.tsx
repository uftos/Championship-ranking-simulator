import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { changeScoreFuncContext } from "./context";

import {
  DistrictPicker,
  ChampionshipPicker,
  PoolPicker,
} from "./districtPicker";
import { Ranking, teamRanking } from "./ranking";
import { GamesComponant, Game } from "./games.jsx";
import { SelectDay } from "./selectDay";
import { gamesAPICall, rankingAPICall } from "./scraping";

interface ScoreModif {
 [index: number] : {
   home_score: number;
   away_score: number;
 }
}

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

  const [scoreModif, setScoreModif] = useState<ScoreModif>({});

  //TODO use just one function to don't have default score if the modif doesn't exist
  const handleChangeHome = (
    event: React.ChangeEvent<HTMLInputElement>,
    indice: number,
  ) => {
    if (!scoreModif[indice]) {
      scoreModif[indice] = {
        home_score: 0,
        away_score: 0,
      };
    }
    scoreModif[indice].home_score = Number(event.currentTarget.value);
    setScoreModif(scoreModif);
  };
  const handleChangeAway = (
    event: React.ChangeEvent<HTMLInputElement>,
    indice: number,
  ) => {
    if (!scoreModif[indice]) {
      scoreModif[indice] = {
        home_score: 0,
        away_score: 0,
      };
    }
    scoreModif[indice].away_score = Number(event.currentTarget.value);
    setScoreModif(scoreModif);
  };
  const changeScoreFunc = useContext(changeScoreFuncContext);
  changeScoreFunc[0] = handleChangeHome;
  changeScoreFunc[1] = handleChangeAway;

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
