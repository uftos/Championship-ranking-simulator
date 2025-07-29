import TeamRanking from "./ranking";
import Game from "./games";


function computeChampionship(listGame: Game[], ranking: TeamRanking[]): TeamRanking {
  
  ranking.forEach((teamRanking: TeamRanking) => {
    teamRanking.point_count = -teamRanking.penalty_point_count;
  });

  listGame.forEach((game: Game) => {
    if (game.home_score !== null) {
      if (game.home_score > game.away_score) {
        // Home team wins
        const winningRanking = ranking.find((teamRanking) => teamRanking.team_name === game.home_team);
        if (winningRanking) {
          winningRanking.point_count += 3; // Add 3 points for the win
        }
      } else if (game.away_score > game.home_score) {
        const winningRanking = ranking.find((teamRanking) => teamRanking.team_name === game.team_away);
        if (winningRanking) {
          winningRanking.point_count += 3; // Add 3 points for the win
        }
      } else {
        // It's a draw
        const homeRanking = ranking.find((teamRanking) => teamRanking.team_name === game.homeTeam);
        const awayRanking = ranking.find((teamRanking) => teamRanking.team_name === game.awayTeam);

        if (homeRanking) {
          homeRanking.point_count += 1; // Add 1 point for the draw
        }
        if (awayRanking) {
          awayRanking.point_count += 1; // Add 1 point for the draw
        }
      }
    }
  });
}
