"use client";
import BusIcon from "@/public/images/bus.svg";
import KakaoMap from "@/components/Map/KakaoMap";
import {
  BusInfoDiv,
  BusInfoName,
  BusMainInfo,
} from "@/m-styled-component/bus-component/bus_styled";
import { ShadowBox } from "@/m-styled-component/content-component/styled_find_bus";
import { ToggleContainer } from "@/m-styled-component/promise-component/promise_styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import { setBoundary } from "@/src/app/_utils/navigationUtils";
import { , findBusInfoApi } from "@/src/app/apis/route";

export default function BusMap({ id }: { id: string }) {
  const [busInfo, setBusInfo] = useState<any>();
  const [map, setMap] = useState<any>();
  const [graphPos, setGraphPos] = useState<any>([]);
  console.log('asdasd:', busInfo)
  const drawPolyLine = (lane: any) => {
    for (let i = 0; i < lane?.length; i++) {
      const lat = lane[i].y;
      const lng = lane[i].x;
      if (lat && lng) {
        setGraphPos((prev: any) => [...prev, { lat: lat, lng: lng }]);
      }
    }
  };
  useEffect(() => {
    if (busInfo && id) {
      setBoundary(busInfo?.result.boundary, map);
    }
    drawPolyLine(busInfo?.result.lane[0].section[0].graphPos);
  }, [map]);

  useEffect(() => {
    if (id) {
      findBusInfoApi(id, setBusInfo);
    }
  }, [id]);

  return (
    <>
      {id ? (
        <>
          <KakaoMap x={"33.5563"} y={"126.79581"} onCreate={setMap}>
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
            {graphPos.length > 0 && (
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
            )}
          </KakaoMap>
          <ShadowBox>
            <ToggleContainer $visible={true}>
              <BusInfoDiv>
                <BusInfoName>
                  <BusIcon />
                  {busInfo?.busNo}
                </BusInfoName>
                <BusMainInfo>
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
                    {busInfo.bus_Interval_Sat}분 일요일:{" "}
                    {busInfo.bus_Interval_Sun}분
                  </div>
                </BusMainInfo>
              </BusInfoDiv>
            </ToggleContainer>
          </ShadowBox>
        </>
      ) : null}
    </>
  );
}
