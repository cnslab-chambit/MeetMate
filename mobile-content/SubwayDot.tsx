import { subPathState, subwayDataState } from '@/atom/atoms'
import { StationDiv, StationNameText, SubStationDiv, SubwayMapDiv, SubwayPlainText, SubwayViewDiv, SubwayViewDetailDiv, SubwayLaneName, ArrowDiv } from '@/m-styled-component/subway-component/subway_styled'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import DotIcon from '../public/images/dot.svg'
import PrevIcon from '../public/images/PArrow.svg'
import DownIcon from '../public/images/DArrow.svg'
import { BasicContainer } from '@/m-styled-component/index-component/styled_index'
function SubwayDot() {
    const subPath = useRecoilValue(subPathState)
    const getColorBySubwayCode = (subwayCode: number) => {
        switch (subwayCode) {
            case 1:
                return "#11419F";
            case 2:
                return "#37B42D";
            case 3:
                return "#FA5F2C";
            case 4:
                return "#3E7AD6";
            case 5:
                return "#9A58C0";
            case 6:
                return "#9D5316";
            case 7:
                return "#97A05A";
            case 8:
                return "#F073A4";
            case 9:
                return "#C3A52D";
            case 109:
                return "#A9022D";
            case 104:
                return "#7DC4A5";
            case 101:
                return "#70B7E5";
            case 116:
                return "#ffe600";
            case 107:
                return "#80CE79";
            case 22:
                return "#FFB952";
            case 113:
                return "#CAC615";
            case 108:
                return "#26A97F";
            case 117:
                return "#003499";
            case 110:
                return "#FF8E00";
            case 115:
                return "#9F7E20";
            default:
                return "gray";
        }
    };

    const dotGraph = () => {
        return <SubStationDiv>
            {
                subPath
                    .map((e: any, index: number) => {
                        const subwayCode = e?.lane[0].subwayCode;
                        const currentColor = getColorBySubwayCode(subwayCode);
                        const stationsLength = e?.passStopList?.stations?.length
                        return (
                            <SubwayViewDetailDiv>
                                <SubwayLaneName>{e?.lane[0].name}</SubwayLaneName>
                                <SubwayViewDiv>
                                    {(e?.passStopList?.stations
                                        .map((e: any, index: number) => {
                                            return (<div key={index}>
                                                <StationDiv active={currentColor}>
                                                    <DotIcon />
                                                    <StationNameText>
                                                        {e?.stationName}
                                                    </StationNameText>
                                                </StationDiv>
                                                <ArrowDiv>
                                                    {stationsLength - 1 === e.index ? (null) : (<PrevIcon />)}
                                                </ArrowDiv>
                                            </div>)
                                        }
                                        )
                                    )}
                                </SubwayViewDiv>
                                {subPath.length - 1 === index ?
                                    (null) :
                                    (
                                        <DownIcon />
                                    )
                                }
                            </SubwayViewDetailDiv>
                        )
                    }
                    )
            }
        </SubStationDiv>
    }
    console.log(subPath)
    return (
        <BasicContainer>
            <SubwayMapDiv>
                {dotGraph()}
                <SubwayPlainText>
                    {/* 출발역과 도착역을 입력해주세요! */}
                </SubwayPlainText>
            </SubwayMapDiv>
        </BasicContainer>
    )
}

export default SubwayDot