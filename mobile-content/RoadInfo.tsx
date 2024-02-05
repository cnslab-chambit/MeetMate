import {
  Boldpg,
  FlexBox,
  FlexBoxCol,
  TimeBox,
  TransferBox,
} from "@/m-styled-component/content-component/styled_find_bus";
import { InfoDiv } from "@/m-styled-component/promise-component/promise_styled";
import {
  BaseBar,
  RoadInfoDiv,
  WayBar,
} from "@/m-styled-component/road-compontnt/road_styled";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { trafficState } from "./atom";
import Gauge from "./Gauge";
import Way from "./Way";

function RoadInfo(pathRecoil: any) {
  const pathValue = useRecoilValue(trafficState);
  return (
    <RoadInfoDiv>
      {pathRecoil.pathRecoil ? (
        <TransferBox>
          <TimeBox>
            <FlexBox>
              <Boldpg>
                {Math.floor(pathRecoil.pathRecoil?.info?.totalTime / 60)}
              </Boldpg>
              시간
              <Boldpg>{pathRecoil.pathRecoil?.info?.totalTime % 60}분</Boldpg>
              <FlexBox>| {pathRecoil.pathRecoil?.info.payment}원</FlexBox>
            </FlexBox>
            <FlexBoxCol>
              <BaseBar>
                {pathRecoil.pathRecoil?.subPath.map(
                  (subPath: any, index: number) => (
                    <Gauge
                      key={index}
                      sectionWidth={subPath.sectionTime}
                      totalWidth={pathRecoil.pathRecoil.info.totalTime}
                      trafficType={subPath.trafficType}
                      lane={subPath?.lane ? subPath.lane[0].name : "도보"}
                      subwayCode={
                        subPath?.lane ? subPath?.lane[0].subwayCode : "none"
                      }
                      buswayCode={
                        subPath?.lane ? subPath?.lane[0].type : "none"
                      }
                    />
                  )
                )}
              </BaseBar>
            </FlexBoxCol>
            <WayBar>
              {pathRecoil.pathRecoil?.subPath.map(
                (subPath: any, index: number) => (
                  <Way
                    key={index}
                    subwayName={subPath?.lane ? subPath?.lane[0].name : "none"}
                    busNo={subPath?.lane ? subPath?.lane[0].busNo : "none"}
                    trafficType={subPath?.trafficType}
                    subwayCode={
                      subPath?.lane ? subPath?.lane[0].subwayCode : "none"
                    }
                    buswayCode={subPath?.lane ? subPath?.lane[0].type : "none"}
                  />
                )
              )}
            </WayBar>
          </TimeBox>
        </TransferBox>
      ) : null}
    </RoadInfoDiv>
  );
}

export default RoadInfo;
