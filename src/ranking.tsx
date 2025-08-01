import React from "react";

export interface TeamRanking {
  [name: string]: {
    point_count: number;
    goals_for_count: number;
    goals_against_count: number;
    penalty_point_count: number;
    probabilities?: number[];
  };
}

interface RankingProps {
  rankingList: TeamRanking;
}

export function Ranking(props: RankingProps) {
  const rankingList = props.rankingList;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col"> Equipe </th>
            <th scope="col"> Point </th>
            <th scope="col"> Goalaverage </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rankingList).map(([teamName, stats], index) => (
            <tr key={index}>
              <th scope="row">{teamName}</th>
              <td>{stats.point_count}</td>
              <td>{stats.goals_for_count - stats.goals_against_count}</td>
              {stats.probabilities &&
                stats.probabilities.map((probability, index) => (
                  <td key={index}> {probability} </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
