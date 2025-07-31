import TeamRanking from "./ranking";
import Game from "./games";
import { ScoreModif } from "./App";

export function computeChampionship(
  listGame: Game[],
  scoreModif: ScoreModif,
  ranking: TeamRanking[],
): TeamRanking {

  console.log("recompute");
  for (const [key] of Object.entries(ranking)) {
    ranking[key].point_count = -ranking[key].penalty_point_count;
    ranking[key].goals_for_count = 0;
    ranking[key].goals_against_count = 0;
  }

  listGame.forEach((game: Game) => {
    if (game.home_score !== null) {
      if (game.home_score > game.away_score) {
        // Home team wins
        ranking[game.team_home].point_count += 3;
      } else if (game.away_score > game.home_score) {
        ranking[game.team_away].point_count += 3;
      } else {
        // It's a draw
        ranking[game.team_home].point_count += 1;
        ranking[game.team_away].point_count += 1;
      }
      ranking[game.team_home].goals_for_count += game.home_score;
      ranking[game.team_home].goals_against_count += game.away_score;
      ranking[game.team_away].goals_for_count += game.away_score;
      ranking[game.team_away].goals_against_count += game.home_score;
    }
  });
  return ranking;
}
