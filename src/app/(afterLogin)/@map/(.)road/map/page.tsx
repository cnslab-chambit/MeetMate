"use client";
import { loadAtom, trafficState } from "@/src/app/_atom/atom";
import { selectType } from "@/src/app/_utils/colorSelection";
import { useEffect, useState } from "react";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import RoadInfo from "@/src/app/(afterLogin)/road/_component/RoadInfo";
import DefaultMap from "@/src/app/_component/DefaultMap";
import { setBoundary } from "@/src/app/_utils/navigationUtils";
import { IMarkers } from "@/src/app/_interfaces/interface";
import { useDrawPolyLine } from "@/src/app/_utils/mapBaseHook";
import { callMapObjRoadApiAJAX } from "@/src/app/apis/route";

function Road() {
  const loadRecoil = useRecoilValue<IMarkers[]>(loadAtom);
  const [laneData, setLaneData] = useState<any | null>([]);
  const [map, setMap] = useState<any>();
  const pathRecoil = useRecoilValue(trafficState);
  const latLngVar = {
    y_1: parseFloat(loadRecoil[0]?.y) + 0.005,
    x_1: parseFloat(loadRecoil[0]?.x),
    y_2: parseFloat(loadRecoil[1]?.y) - 0.16,
    x_2: parseFloat(loadRecoil[1]?.x),
  }
  useEffect(() => {
    setLaneData([]);
    setBoundary(latLngVar, map);
    callMapObjRoadApiAJAX(pathRecoil.info.mapObj, setLaneData);
  }, [map, pathRecoil]);

  return (
    <>
      <DefaultMap onCreate={setMap}>
        {laneData.length !== 0
          ? laneData.map((data: any, index: number) => (
            <div key={index}>
              <Polyline
                path={useDrawPolyLine(data)}
                strokeColor={selectType(data) as string}
                strokeWeight={8}
              />
              <Polyline
                key={index + 10}
                path={useDrawPolyLine(data)}
                strokeColor="white"
                strokeWeight={2}
                strokeStyle="dash"
                strokeOpacity={1}
              />
            </div>
          ))
          : null}
        <>
          <MapMarker
            position={{
              lat: parseFloat(loadRecoil[0].y),
              lng: parseFloat(loadRecoil[0].x),
            }}
            image={{
              src: "/images/start.svg",
              size: {
                width: 55,
                height: 55,
              },
            }}
          ></MapMarker>
          <MapMarker
            position={{
              lat: parseFloat(loadRecoil[1].y),
              lng: parseFloat(loadRecoil[1].x),
            }}
            image={{
              src: "/images/end.svg",
              size: {
                width: 55,
                height: 55,
              },
            }}
          ></MapMarker>
        </>
      </DefaultMap>
      <RoadInfo pathRecoil={pathRecoil} />
    </>
  );
}

export default Road;
