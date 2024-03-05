"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../bus/_component/busMap.module.css";
import { busInfoState, busState } from "@/mobile-content/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LogoMent } from "@/m-styled-component/search-component/serch_styled";
import BusLogo from "@/public/images/busLogo.svg";
import { useRouter } from "next/navigation";

const BusSearch = () => {
  const [busNo, setBusNo] = useState<string>();
  const [result, setResult] = useState<string>();
  const [busLanes, setBusLanes] = useState<any | null>([]);
  const setBusInfo = useSetRecoilState(busInfoState);
  const setBusRecoil = useSetRecoilState(busState);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusNo(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    findBusId();
    setResult(busNo);
  };

  const findBusInfo = async (busId: any) => {
    try {
      const response = await axios.get(
        `https://api.odsay.com/v1/api/loadLane?lang=0&mapObject=0:0@${busId}:1:-1:-1&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`
      );
      setBusRecoil(response);
    } catch (error) {
      console.log(error);
    }
  };

  const findBusId = async () => {
    try {
      const response = await axios.get(
        `https://api.odsay.com/v1/api/searchBusLane?lang=0&busNo=${busNo}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`
      );
      setBusLanes(response?.data?.result?.lane);
    } catch (error) {}
  };

  const onBusClicked = (busID: any, lane: any) => {
    if (lane) {
      findBusInfo(busID);
      setBusInfo(lane);
    }
    router.push("/bus/map");
  };

  return (
    <div className={styles.container}>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <BusLogo />
        </div>
        <h2 className={styles.intro}>버스 번호 입력</h2>
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.busInput}
            type="text"
            value={busNo || ""}
            onChange={handleInputChange}
          />
        </form>
      </div>
      {busLanes?.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 2rem",
          }}
        >
          <LogoMent>{result}번 검색결과</LogoMent>
          <div className={styles.resultWrapper}>
            {busLanes.map((lane: any) => (
              <div
                className={styles.resultCard}
                key={lane?.busID}
                onClick={() => onBusClicked(lane?.busID, lane)}
              >
                <div className={styles.basicInfoWrapper}>
                  {lane?.busNo}
                  <span>{lane?.busCityName}</span>
                </div>
                <div className={styles.pointWrapper}>
                  <span>
                    {lane?.busStartPoint} ↔ {lane?.busEndPoint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BusSearch;
