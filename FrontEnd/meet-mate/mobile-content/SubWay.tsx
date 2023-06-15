import { roadSearchResultState, subPathState, subwayDataState } from "@/atom/atoms";
import { Boldpg, FlexBox, FlexBoxCol, TimeBox, TransferBox } from "@/m-styled-component/content-component/styled_find_bus";
import { BaseBar, WayBar } from "@/m-styled-component/road-compontnt/road_styled";
import { useRecoilState, useSetRecoilState } from "recoil";
import Gauge from "./Gauge";
import Way from "./Way";
import { subwayPathState } from "./atom";

function SubWay() {
    const [roadData, setRoadData] = useRecoilState(subwayDataState);
    const [roadSearchResult, setRoadSearchResult] = useRecoilState(roadSearchResultState);
    const setSubwayState = useSetRecoilState(subwayPathState);
    const setSubPath = useSetRecoilState(subPathState)
    const onWay = (path: any) => {

        setSubPath(path.subPath.filter((e: any) => e.trafficType === 1))
        // setRoadSearchResult(true)
        setSubwayState(true);
    }
    console.log(roadData);
    
    return (
        <TransferBox>
            {roadData.path.length > 0 ? roadData?.path.map((path: any, index: number) => {
                if (1 === path.pathType) {
                    return (
                        <TimeBox key={index} onClick={() => onWay(path)}>
                            <FlexBox>
                                <Boldpg>{Math.floor(path.info.totalTime / 60)}</Boldpg>시간
                                <Boldpg>{path.info.totalTime % 60}분</Boldpg>
                                <FlexBox>
                                    요금 {path.info.payment}원
                                </FlexBox>
                            </FlexBox>

                            <FlexBoxCol>
                                <BaseBar>
                                {roadData.path.length > 0 ?
                                    path?.subPath.map((subPath: any, index: number) =>
                                        <Gauge
                                        key={index}
                                        sectionWidth={subPath.sectionTime}
                                        totalWidth={path.info.totalTime}
                                        trafficType={subPath.trafficType}
                                        lane={subPath?.lane ? subPath.lane[0].name : "도보"}
                                        subwayCode={subPath?.lane? subPath?.lane[0].subwayCode : "none"}
                                        buswayCode={subPath?.lane? subPath?.lane[0].type : "none"}
                                        />
                                    ) : null}
                                </BaseBar>
                            </FlexBoxCol>
                            <WayBar>
                            {roadData.path.length > 0 ?
                            path?.subPath.map((subPath: any, index: number) =>     
                                <Way
                                key={index}
                                subwayName={subPath?.lane? subPath?.lane[0].name : "none"}
                                busNo={subPath?.lane? subPath?.lane[0].busNo : "none"}
                                trafficType={subPath?.trafficType}
                                subwayCode={subPath?.lane? subPath?.lane[0].subwayCode : "none"}
                                buswayCode={subPath?.lane? subPath?.lane[0].type : "none"}
                                />
                            ) : null}
                    </WayBar>
                        </TimeBox>
                    )
                }
            }

            )
                :
                null
            }
        </TransferBox>
    )
}

export default SubWay