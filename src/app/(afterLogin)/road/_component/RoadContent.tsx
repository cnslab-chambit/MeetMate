"use client";
import Way from "@/src/app/_component/Bar/Way";
import Gauge from "@/src/app/_component/Bar/Gauge";
import {
  IMarkers,
  divNumAtom,
  loadAtom,
  trafficState,
} from "@/src/app/_atom/atom";
import styles from "./road.module.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import SwapIcon from "@/public/images/cross.svg";
import styled from "styled-components";
import RoadIcon from "@/public/images/roadIcon.svg";
import { useRouter } from "next/navigation";

const CrossIconDiv = styled.div`
  position: absolute;
  right: 0;
  top: 65px;
`;

const ContentSearchDiv = styled.div`
  display: flex;
  position: relative;
  padding: 2rem 0;
  gap: 20px;
  flex-direction: column;
  svg {
    cursor: pointer;
  }
`;

function RoadContent() {
  const [divNum, setDivNum] = useRecoilState(divNumAtom);
  const setPathRecoil = useSetRecoilState(trafficState);
  const router = useRouter();
  const [loadRecoil, setLoadRecoil] = useRecoilState<IMarkers[]>(loadAtom);
  const [pathData, setPathData] = useState<any | null>([]);
  const [swapClick, setSwapClick] = useState(false);
  const setWay = (pathData: any) => {
    setPathRecoil(pathData);
    router.push("/road/map");
  };

  const movePage = (path: string, index: string) => {
    setDivNum(index);
    router.push("/roadsearch");
  };

  const swapRoad = () => {
    if (loadRecoil?.length === 2) {
      setLoadRecoil([loadRecoil[1], loadRecoil[0]]);
      setSwapClick(true);
    }
  };

  useEffect(() => {
    setPathData(null);
    if (loadRecoil.length === 2) {
      const sx = loadRecoil[0].x;
      const sy = loadRecoil[0].y; //출발 좌표
      const ex = loadRecoil[1].x;
      const ey = loadRecoil[1].y; //도착 좌표
      let url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
      (async () => {
        const data = await (await fetch(url)).json();
        if (data) {
          setPathData(data?.result?.path);
        }
      })();
      setSwapClick(false);
    }
  }, [
    loadRecoil.length === 2 &&
      loadRecoil[0]?.place_name !== "장소를 입력해주세요",
    swapClick,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <RoadIcon />
      </div>
      <div className={styles.logoMent}>
        출발지와 도착지를 <br />
        입력해주세요!
      </div>
      <ContentSearchDiv>
        <div
          className={styles.promiseDiv}
          onClick={() => movePage("/roadsearch", "start")}
        >
          {loadRecoil[0] ? loadRecoil[0].place_name : "장소를 입력해주세요"}
        </div>
        <div
          className={styles.promiseDiv}
          onClick={() => movePage("/roadsearch", "end")}
        >
          {loadRecoil[1] ? loadRecoil[1].place_name : "장소를 입력해주세요"}
        </div>
        <CrossIconDiv onClick={swapRoad}>
          <SwapIcon />
        </CrossIconDiv>
      </ContentSearchDiv>
      <div className={styles.transferBox}>
        {pathData?.length > 0
          ? pathData?.map((path: any, index: number) => (
              <div
                className={styles.timeBox}
                key={index}
                onClick={() => setWay(path)}
              >
                <div className={styles.flexBox}>
                  <div className={styles.boldPg}>
                    {Math.floor(path.info.totalTime / 60)}
                  </div>
                  시간
                  <div className={styles.boldPg}>
                    {path.info.totalTime % 60}분
                  </div>
                  <div className={styles.flexBox}>| {path.info.payment}원</div>
                </div>

                <div className={styles.flexBoxCol}>
                  <div className={styles.baseBar}>
                    {pathData.length > 0
                      ? path?.subPath.map((subPath: any, index: number) => (
                          <Gauge
                            key={index}
                            sectionWidth={subPath.sectionTime}
                            totalWidth={path.info.totalTime}
                            trafficType={subPath.trafficType}
                            lane={subPath?.lane ? subPath.lane[0].name : "도보"}
                            subwayCode={
                              subPath?.lane
                                ? subPath?.lane[0].subwayCode
                                : "none"
                            }
                            buswayCode={
                              subPath?.lane ? subPath?.lane[0].type : "none"
                            }
                          />
                        ))
                      : null}
                  </div>
                </div>
                <div className={styles.wayBar}>
                  {pathData.length > 0
                    ? path?.subPath.map((subPath: any, index: number) => (
                        <Way
                          key={index}
                          subwayName={
                            subPath?.lane ? subPath?.lane[0].name : "none"
                          }
                          busNo={
                            subPath?.lane ? subPath?.lane[0].busNo : "none"
                          }
                          trafficType={subPath?.trafficType}
                          subwayCode={
                            subPath?.lane ? subPath?.lane[0].subwayCode : "none"
                          }
                          buswayCode={
                            subPath?.lane ? subPath?.lane[0].type : "none"
                          }
                        />
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default RoadContent;
