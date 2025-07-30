import React, { useState, useEffect } from "react";

interface District {
  cg_no: string;
  name: string;
}

export function DistrictPicker() {
  const districtsInfoRequest = async (): Promise<District[]> => {
    const response = await fetch("http://localhost:8010/proxy/api/cdgs");
    //const response = await fetch("http://localhost:8010/proxy/api/cdgs");
    const json = await response.json();
    return json["hydra:member"];
  };
  const [districtList, setDistrictList] = useState<District[]>([]);
  useEffect(() => {
    async function getData() {
      const districtsInfo = await districtsInfoRequest();
      setDistrictList(districtsInfo);
    }
    getData();
  }, []);
  return (
    <>
      <h1> Choisissez le votre district </h1>
      <select>
        {districtList ? (
          districtList.map((district) => (
            <option key={district.cg_no}>{district.name}</option>
          ))
        ) : (
          <option key="network"> Probleme de reseau </option>
        )}
      </select>
    </>
  );
}

export function ChampionshipPicker() {
  const championshipInfoRequest = async (): Promise<District[]> => {
    const response = await fetch(
      "http://localhost:8010/proxy/api/compets?cg_no=24&competition_type=CH&groups[]=compet_light",
    );
    const json = await response.json();
    return json;
  };
  const [championshipList, setChampionshipList] = useState<District[]>([]);
  useEffect(() => {
    async function getData() {
      const championshipInfo = await championshipInfoRequest();
      setChampionshipList(championshipInfo);
    }
    getData();
  }, []);
  return (
    <>
      <h1> Choisissez votre championnat </h1>
      <select>
        {championshipList.map((district) => (
          <option key={district.cg_no}>{district.name}</option>
        ))}
      </select>
    </>
  );
}

export function PoolPicker() {
  const poolInfoRequest = async (): Promise<District[]> => {
    const response = await fetch(
      "http://localhost:8010/proxy/api/compets?cg_no=24&competition_type=CH&groups[]=compet_light",
    );
    const json = await response.json();
    return json;
  };
  const [poolList, setPoolList] = useState<District[]>([]);
  useEffect(() => {
    async function getData() {
      const poolInfo = await poolInfoRequest();
      setPoolList(poolInfo);
    }
    getData();
  }, []);
  return (
    <>
      <h1> Choisissez votre poule </h1>
      <select>
        {poolList.map((pool) => (
          <option key={pool.cg_no}>{pool.name}</option>
        ))}
      </select>
    </>
  );
}
