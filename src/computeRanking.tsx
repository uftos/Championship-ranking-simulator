import TeamRanking from "./ranking";
import Game from "./games";
import { ScoreModif } from "./App";

export function computeChampionship(
  listGame: Game[],
  scoreModif: ScoreModif,
  ranking: TeamRanking,
  day: number,
): TeamRanking {
  console.log("recompute");
  ranking = resetRanking(ranking);

  listGame.forEach((game: Game, index: number) => {
    if (scoreModif.has(index)) {
      console.log("modif");
      addMatchToRanking(scoreModif.get(index), ranking);
    } else {
      if (game.day <= day) {
        addMatchToRanking(game, ranking);
      }
    }
  });
  sortRanking(ranking);
  //TODO initiate teamPointPossibilities
  computePossibilities(gameToplay, teamPointPossibilities);
  return ranking;
}
/* eslint-disable */
function sortRanking(ranking: TeamRanking) {
  //ranking.sort((a: TeamRanking, b: TeamRanking) => a.point_count - b.point_count);
}
/* eslint-enable */

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

interface TeamPoint {
  [name: string]: {
    point: number;
  };
}
// recursive
function computePossibilities(
  gameToPlay: Game[],
  teamPointPossibilities: TeamPoint,
): TeamPoint[] {
  let allPossibilities: TeamPoint[];
  if (gameToPlay.length > 0) {
    const game = gameToPlay[0];
    gameToPlay = gameToPlay.slice(1);
    //victory
    const teamPointPossibilitiesVictory = teamPointPossibilities.copy();
    teamPointPossibilitiesVictory[game.teamHome].point += 3;
    allPossibilities = computePossibilities(
      gameToPlay,
      teamPointPossibilitiesVictory,
    );
    //draw
    const teamPointPossibilitiesDraw = teamPointPossibilities.copy();
    teamPointPossibilitiesDraw[game.teamHome].point += 1;
    teamPointPossibilitiesDraw[game.teamAway].point += 1;
    allPossibilities.append(
      computePossibilities(gameToPlay, teamPointPossibilitiesDraw),
    );
    //lost
    const teamPointPossibilitiesDefeat = teamPointPossibilities.copy();
    teamPointPossibilitiesDefeat[game.teamAway].point += 3;
    allPossibilities.append(
      computePossibilities(gameToPlay, teamPointPossibilitiesDefeat),
    );
  } else {
    allPossibilities = teamPointPossibilities;
  }
  return allPossibilities;
}
