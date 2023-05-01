import { SubwayMapDiv, SubwayPlainText } from '@/styled-component/subwayMap-component/styled_subwayMap'
import React from 'react'
function SubwayMap() {
    return (
        <SubwayMapDiv>
            <SubwayPlainText>
                출발역과 도착역을 입력해주세요!
            </SubwayPlainText>
        </SubwayMapDiv>
    )
}

export default SubwayMap