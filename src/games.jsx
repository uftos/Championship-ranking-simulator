import React, { useState, useEffect } from "react";

export function Games() {
  const gamesInfoRequest = async () => {
    var page = 1;
    var gamesInfo = [];
    var stillGame = true;
    while (stillGame) {
      const response = await fetch(
        "http://localhost:8010/proxy/api/compets/426990/phases/1/poules/1/matchs?page=" +
          page,
      );
      const json = await response.json();
      if (json.hasOwnProperty("hydra:member") && page < 25) {
        gamesInfo = gamesInfo.concat(
          json["hydra:member"].map((game) => {
            return {
              team_home: game.home.short_name,
              team_away: game.away.short_name,
              logo_home: game.home.club.logo,
              logo_away: game.away.club.logo,
              home_score: game.home_score,
              away_score: game.away_score,
              day: game.poule_journee.number,
            };
          }),
        );

        page++;
      } else {
        stillGame = false;
      }
    }
    return gamesInfo;
  };
  const [gamesList, setgamesList] = useState([]);
  useEffect(() => {
    async function getData() {
      const gamesInfo = await gamesInfoRequest();
      setgamesList(gamesInfo);
    }
    getData();
  }, []);
  return (
    <>
      {gamesList.map((gameInfo, index) => (
        <Game gameInfo={gameInfo} key={index} />
      ))}
    </>
  );
}

function Game(props) {
  const gameInfo = props["gameInfo"];
  return (
    <>
      <div>
        <div> {gameInfo.team_home} </div>
        <div> {gameInfo.team_away} </div>
        <div> {gameInfo.home_score} </div>
        <div> {gameInfo.away_score} </div>
      </div>
    </>
  );
}
