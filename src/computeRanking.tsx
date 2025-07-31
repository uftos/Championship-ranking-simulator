import TeamRanking from "./ranking";
import Game from "./games";
import { ScoreModif } from "./App";

export function computeChampionship(
  listGame: Game[],
  scoreModif: ScoreModif,
  ranking: TeamRanking[],
): TeamRanking {
  console.log("recompute");
  console.log(ranking);

  for (const [key] of Object.entries(ranking)) {
    console.log("key", key, "dict", ranking, "access", ranking[key]);
    ranking[key].point_count = -ranking[key].penalty_point_count;
  }

  listGame.forEach((game: Game) => {
    if (game.home_score !== null) {
      if (game.home_score > game.away_score) {
        // Home team wins
        console.log(ranking[game.team_home] !== undefined);
        console.log(game.team_home);
        ranking[game.team_home] += 3;
      } else if (game.away_score > game.home_score) {
        ranking[game.team_away] += 3;
      } else {
        // It's a draw
        ranking[game.team_home] += 1;
        ranking[game.team_away] += 1;
      }
    }
  });
  return ranking;
}
