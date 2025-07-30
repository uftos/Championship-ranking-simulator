import "./App.css";
import React, { useState, useEffect } from "react";

import {
  DistrictPicker,
  ChampionshipPicker,
  PoolPicker,
} from "./districtPicker";
import { Ranking } from "./ranking";
import { GamesComponant, Game } from "./games.jsx";
import { SelectDay } from "./selectDay";
import { gamesAPICall } from "./scraping";

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
      <Ranking />
      <SelectDay currentDay="22" />
      <GamesComponant gamesList={gamesList} />
    </>
  );
}
