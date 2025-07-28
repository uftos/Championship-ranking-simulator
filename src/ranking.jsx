import React, { useState, useEffect } from 'react';

export function Ranking() {
  const rankingInfoRequest = async () => {
    const response = await fetch('http://localhost:8010/proxy/api/compets/426989/phases/1/poules/1/classement_journees?page=1');
    const json = await response.json();
    return json["hydra:member"];
  };
  const [rankingList, setRankingList] = useState([]);
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
        {rankingList.map((team) =>
          <tr>
            <th scope="row">{team.equipe.short_name}</th>
            <td>{team.point_count}</td>
            <td>{team.goals_for_count - team.goals_against_count}</td>
          </tr>
        )}
      </tbody>
    </table>
    </>
          
  );
}
