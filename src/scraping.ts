import { Game } from "./games.jsx";
import { TeamRanking } from "./ranking";

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
            teamHome: {
              name: game.home.short_name,
              logo: game.home.club.logo,
            },
            teamAway: {
              name: game.away.short_name,
              logo: game.away.club.logo,
            },
            score: {
              goalsHome: game.home_score,
              goalsAway: game.away_score,
            },
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

export interface TeamRankingJson {
  equipe: {
    short_name: string;
  };
  point_count: number;
  goals_for_count: number;
  goals_against_count: number;
  penalty_point_count: number;
}

export const rankingAPICall = async (): Promise<TeamRanking> => {
  const response = await fetch(
    "http://localhost:8010/proxy/api/compets/426990/phases/1/poules/1/classement_journees?page=1",
  );
  const json = await response.json();
  return json["hydra:member"].reduce(
    (accumulator: TeamRanking, team: TeamRankingJson) => {
      accumulator[team.equipe.short_name] = {
        point_count: Number(team.point_count),
        goals_for_count: Number(team.goals_for_count),
        goals_against_count: Number(team.goals_against_count),
        penalty_point_count: Number(team.penalty_point_count),
      };
      return accumulator;
    },
    {},
  );
};
