import { Game } from "./games.jsx";
import { teamRanking } from "./ranking";

interface GameJson {
  home: {
    short_name: string;
    club: {
      logo: string;
    };
  };
  away: {
    short_name: string;
    club: {
      logo: string;
    };
  };
  home_score: number;
  away_score: number;
  poule_journee: {
    number: number;
  };
}

export const gamesAPICall = async (): Promise<Game[]> => {
  let page = 1;
  let gamesInfo: Game[] = [];
  let stillGame = true;
  while (stillGame) {
    const response = await fetch(
      "http://localhost:8010/proxy/api/compets/426990/phases/1/poules/1/matchs?page=" +
        page,
    );
    const json = await response.json();
    if (json.hasOwnProperty("hydra:member") && page < 25) {
      gamesInfo = gamesInfo.concat(
        json["hydra:member"].map((game: GameJson) => {
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

export const rankingAPICall = async (): Promise<teamRanking[]> => {
  const response = await fetch(
    "http://localhost:8010/proxy/api/compets/426989/phases/1/poules/1/classement_journees?page=1",
  );
  const json = await response.json();
  return json["hydra:member"];
};
