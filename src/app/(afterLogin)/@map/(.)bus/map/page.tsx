"use client";
import { useRecoilValue } from "recoil";
import styles from "../_component/busMap.module.css";
import { busInfoState, busState } from "@/src/app/_atom/atom";
import DefaultMap from "@/src/app/_component/DefaultMap";
import { useEffect, useState } from "react";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import BusIcon from "@/public/images/bus.svg";
import { setBoundary } from "@/src/app/_utils/navigationUtils";

export default function Search() {
  const busRecoil = useRecoilValue(busState);
  const busInfo = useRecoilValue(busInfoState);
  const [map, setMap] = useState<any>();
  const [graphPos, setGraphPos] = useState<any>([]);

  const drawPolyLine = (lane: any) => {
    for (let i = 0; i < lane?.length; i++) {
      const lat = lane[i].y;
      const lng = lane[i].x;
      if (lat && lng) {
        setGraphPos((prev: any) => [...prev, { lat: lat, lng: lng }]);
      }
    }
  };

  const setBound = (boundary: any) => {
    setBoundary(boundary, map);
  };

  useEffect(() => {
    if (busRecoil) {
      setBound(busRecoil?.data?.result.boundary);
    }
    drawPolyLine(busRecoil?.data?.result.lane[0].section[0].graphPos);
  }, [map]);

  return (
    <>
      <DefaultMap onCreate={setMap}>
        <Polyline
          path={graphPos}
          strokeColor="blue"
          strokeWeight={9}
          strokeOpacity={1}
        />
        <Polyline
          path={graphPos}
          strokeColor="white"
          strokeWeight={2}
          strokeOpacity={1}
          strokeStyle="dash"
        />
        {graphPos.length > 0 ? (
          <>
            <MapMarker
              position={{ lat: graphPos[0].lat, lng: graphPos[0].lng }}
              image={{
                src: "/images/start.svg",
                size: {
                  width: 55,
                  height: 55,
                },
              }}
            ></MapMarker>
          </>
        ) : null}
      </DefaultMap>
      <div className={styles.modalContainer}>
        <div className={styles.toggle_container}>
          <div className={styles.busInfoWrapper}>
            <div className={styles.busName}>
              <BusIcon />
              {busInfo.busNo}
            </div>
            <div className={styles.mainInfo}>
              <div>
                {busInfo.busCityName} | {busInfo.busStartPoint} ↔{" "}
                {busInfo.busEndPoint}
              </div>
              <div>
                {busInfo.busFirstTime} ~ {busInfo.busLastTime}
              </div>
              <br />
              <div style={{ color: "black" }}>
                배차간격 → 평일: {busInfo.bus_Interval_Week}분 토요일:{" "}
                {busInfo.bus_Interval_Sat}분 일요일: {busInfo.bus_Interval_Sun}
                분
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
