import "./App.css";
import React from "react";

import {
  DistrictPicker,
  ChampionshipPicker,
  PoolPicker,
} from "./districtPicker";
import { Ranking } from "./ranking.jsx";
import { Games } from "./games.jsx";

function App() {
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
      <Games />
    </>
  );
}

export default App;
