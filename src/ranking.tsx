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
export function Ranking() {
  const rankingInfoRequest = async (): Promise<teamRanking[]> => {
    const response = await fetch(
      "http://localhost:8010/proxy/api/compets/426989/phases/1/poules/1/classement_journees?page=1",
    );
    const json = await response.json();
    return json["hydra:member"];
  };
  const [rankingList, setRankingList] = useState<teamRanking[]>([]);
  useEffect(() => {
    async function getData() {
      const rankingInfo = await rankingInfoRequest();
      setRankingList(rankingInfo);
    }
    getData();
  }, []);
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
