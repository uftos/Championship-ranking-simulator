import React, { useState, useEffect } from "react";

export interface teamRanking {
  equipe: {
    short_name: string;
  };
  point_count: number;
  goals_for_count: number;
  goals_against_count: number;
  penalty_point_count: number;
}

interface RankingProps {
  rankingList: teamRanking[];
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
          {rankingList.map((team, index) => (
            <tr key={index}>
              <th scope="row">{team.equipe.short_name}</th>
              <td>{team.point_count}</td>
              <td>{team.goals_for_count - team.goals_against_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
