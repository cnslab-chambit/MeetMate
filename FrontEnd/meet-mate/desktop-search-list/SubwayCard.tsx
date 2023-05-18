import { roadLineApi } from '@/apis/apiStorage'
import { roadDataState, roadResultDataState, roadSearchResultState, subPathState, subwayDataState, transportState } from '@/atom/atoms'
import DesktopWay from '@/desktop-contents/DesktopWay'
import { Boldpg, FlexBox, FlexBoxCol, TimeBox, TransferBox } from '@/m-styled-component/content-component/styled_find_bus'
import { BaseBar, WayBar } from '@/m-styled-component/road-compontnt/road_styled'
import Gauge from '@/mobile-content/Gauge'
import Way from '@/mobile-content/Way'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

function SubwayCard() {
    const [roadData, setRoadData] = useRecoilState(subwayDataState);
    const [roadSearchResult, setRoadSearchResult] = useRecoilState(roadSearchResultState);
    const setSubPath = useSetRecoilState(subPathState)
    const onWay = (path: any) => {

        setSubPath(path.subPath.filter((e: any) => e.trafficType === 1))
        // setRoadSearchResult(true)

    }
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
                            <WayBar>
                                {roadData.path.length > 0 ?
                                    path?.subPath.map((subPath: any, index: number) =>
                                        <DesktopWay
                                            key={index}
                                            subwayName={subPath?.lane ? subPath?.lane[0].name : "none"}
                                            sectionTime={subPath.sectionTime}
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

export default SubwayCard