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

export default function BusMap({ id }: { id: string }) {
  const [busInfo, setBusInfo] = useState<any>();
  const [map, setMap] = useState<any>();
  const [graphPos, setGraphPos] = useState<any>([]);
  let bounds;

  const findBusInfo = async (busId: any) => {
    try {
      const response = await axios.get(
        `https://api.odsay.com/v1/api/loadLane?lang=0&mapObject=0:0@${busId}:1:-1:-1&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`
      );
      console.log("우마이", response);
      setBusInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    if (map) {
      bounds = new kakao.maps.LatLngBounds();
      bounds.extend(
        new kakao.maps.LatLng(
          parseFloat(boundary?.bottom) - 0.15,
          parseFloat(boundary?.left)
        )
      );
      bounds.extend(
        new kakao.maps.LatLng(
          parseFloat(boundary?.top),
          parseFloat(boundary?.right)
        )
      );
      map?.setBounds(bounds);
    }
  };

  useEffect(() => {
    if (busInfo && id) {
      setBound(busInfo?.result.boundary);
    }
    drawPolyLine(busInfo?.result.lane[0].section[0].graphPos);
  }, [map]);

  useEffect(() => {
    if (id) {
      findBusInfo(id);
    }
  }, []);

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
