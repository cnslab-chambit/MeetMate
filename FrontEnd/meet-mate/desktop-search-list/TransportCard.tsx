import { roadLineApi } from '@/apis/apiStorage'
import { roadDataState, roadResultDataState, roadSearchResultState, transportState } from '@/atom/atoms'
import { Boldpg, FlexBox, FlexBoxCol, TimeBox, TransferBox } from '@/m-styled-component/content-component/styled_find_bus'
import { BaseBar, WayBar } from '@/m-styled-component/road-compontnt/road_styled'
import Gauge from '@/mobile-content/Gauge'
import Way from '@/mobile-content/Way'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

function TransportCard() {
    const [roadData, setRoadData] = useRecoilState(roadDataState);
    const [laneData, setLaneData] = useRecoilState(roadResultDataState);
    const [roadSearchResult, setRoadSearchResult] = useRecoilState(roadSearchResultState);
    const [trans] = useRecoilState(transportState);
    const [type, setType] = useState<number>(1)
    const onWay = async (path: any) => {
        setLaneData(await roadLineApi(path?.info?.mapObj))
        console.log(laneData)
        setRoadSearchResult(true)
    }
    useEffect(() => {
        if (trans.subway === true) {
            setType(1)
        }
        if (trans.bus === true) {
            setType(2)
        }
        if (trans.subwaybus === true) {
            setType(3)
        }
    }, [trans])
    console.log(type)
    return (
        <TransferBox>
            {roadData.path.length > 0 ? roadData?.path.map((path: any, index: number) => {
                if (type === path.pathType) {
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
                                    {
                                        roadData.path.length > 0 ?
                                            path?.subPath.map((subPath: any, index: number) =>
                                                <Gauge
                                                    key={index}
                                                    sectionWidth={subPath.sectionTime}
                                                    totalWidth={path.info.totalTime}
                                                    trafficType={subPath.trafficType}
                                                    lane={subPath?.lane ? subPath.lane[0].name : "도보"}
                                                    subwayCode={subPath?.lane ? subPath?.lane[0].subwayCode : "none"}
                                                    buswayCode={subPath?.lane ? subPath?.lane[0].type : "none"}
                                                />
                                            ) : null}
                                </BaseBar>
                            </FlexBoxCol>
                            <WayBar>
                                {roadData.path.length > 0 ?
                                    path?.subPath.map((subPath: any, index: number) =>
                                        <Way
                                            key={index}
                                            subwayName={subPath?.lane ? subPath?.lane[0].name : "none"}
                                            busNo={subPath?.lane ? subPath?.lane[0].busNo : "none"}
                                            trafficType={subPath?.trafficType}
                                            subwayCode={subPath?.lane ? subPath?.lane[0].subwayCode : "none"}
                                            buswayCode={subPath?.lane ? subPath?.lane[0].type : "none"}
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

export default TransportCard