import TeamRanking from "./ranking";
import Game from "./games";
import { ScoreModif } from "./App";

export function computeChampionship(
  listGame: Game[],
  scoreModif: ScoreModif,
  ranking: TeamRanking,
): TeamRanking {
  console.log("recompute");
  ranking = resetRanking(ranking);

  listGame.forEach((game: Game, index: number) => {
    if (scoreModif.has(index)) {
      console.log("modif");
      addMatchToRanking(scoreModif.get(index), ranking);
    } else {
      addMatchToRanking(game, ranking);
    }
  });
  return ranking;
}

function resetRanking(ranking: TeamRanking) {
  if (ranking !== undefined) {
    for (const [key] of Object.entries(ranking)) {
      ranking[key].point_count = -ranking[key].penalty_point_count;
      ranking[key].goals_for_count = 0;
      ranking[key].goals_against_count = 0;
    }
  } else {
    ranking = {};
  }
  return ranking;
}

function addMatchToRanking(game: Game, ranking: TeamRanking) {
  if (checkHaveBeenplayed(game)) {
    if (game.score.goalsHome > game.score.away_score) {
      // Home team wins
      ranking[game.teamHome.name].point_count += 3;
    } else if (game.score.goalsAway > game.score.goalsHome) {
      ranking[game.teamAway.name].point_count += 3;
    } else {
      // It's a draw
      ranking[game.teamHome.name].point_count += 1;
      ranking[game.teamAway.name].point_count += 1;
    }
    ranking[game.teamHome.name].goals_for_count += game.score.goalsHome;
    ranking[game.teamHome.name].goals_against_count += game.score.goalsAway;
    ranking[game.teamAway.name].goals_for_count += game.score.goalsAway;
    ranking[game.teamAway.name].goals_against_count += game.score.goalsHome;
  }
}
function checkHaveBeenplayed(game: Game) {
  return game.score.goalsHome !== null;
}
