import { roadLineApi } from '@/apis/apiStorage'
import { coordinateDataState, coordinateState, roadDataState, roadPlaceCenterState, roadResultDataState, roadSearchOnWayState, roadSearchResultState, roadSearchTypeState, transportState } from '@/atom/atoms'
import DesktopWay from '@/desktop-contents/DesktopWay'
import Gauge from '@/mobile-content/Gauge'
import Way from '@/mobile-content/Way'
import { CoordinateAddressText, CoordinateCardDiv, CoordinateDiv, CoordinateLinkText, CoordinatePlaceText, CoordinateRateText } from '@/styled-component/coordinate-component/styled_coordinate'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

function CoordinateCard() {
    const [coordinateData, setCoordinateData] = useRecoilState(coordinateDataState);
    const [laneData, setLaneData] = useRecoilState(roadResultDataState);
    const [roadSearchResult, setRoadSearchResult] = useRecoilState(roadSearchResultState);
    const coordinate = useRecoilValue(coordinateState);
    const [type, setType] = useRecoilState(roadSearchTypeState)
    const setOnWayCilck = useSetRecoilState(roadSearchOnWayState)
    const setCenter = useSetRecoilState(roadPlaceCenterState)
    const onWay = async (path: any) => {
        setCenter({ lat: +path.y, lng: +path.x })
        setOnWayCilck(true)

    }
    useEffect(() => {
        switch (true) {
            case coordinate.restaurant:
                setType('음식점');
                break;
            case coordinate.cafe:
                setType('카페');
                break;
            case coordinate.supermarket:
                setType('대형마트');
                break;
            case coordinate.cultural:
                setType('문화시설');
                break;
            case coordinate.tourist:
                setType('관광명소');
                break;
            default:
                break;
        }
    }, [coordinate])
    console.log(type)
    return (
        <>
            {coordinateData.length > 0 ? coordinateData?.map((info: any, index: number) => {
                if (type === info.category_name) {
                    return (
                        <CoordinateDiv key={index}>
                            {info.searchList.map((e: any, index: number) => {
                                return (
                                    <CoordinateCardDiv onClick={() => onWay(e)} key={index}>
                                        <CoordinatePlaceText>{e.place_name}</CoordinatePlaceText>
                                        <CoordinateAddressText>{e.address}</CoordinateAddressText>
                                        <CoordinateRateText>평점: {e.star_rate}</CoordinateRateText>
                                    </CoordinateCardDiv>
                                )
                            })}
                        </CoordinateDiv>
                    )
                }
            }

            )
                :
                null
            }
        </>
    )
}

export default CoordinateCard