import { useEffect } from "react";
import styled from "styled-components";
import SubwayIcon from "../public/images/subway.svg";
import BusIcon from "../public/images/bus.svg";

const RangeContainer = styled.div<{ratio: number}>`
    width: ${(props) => `${props.ratio}%`};
    
`;

const Range = styled.div<{ratio : number, trafficType: number}>`
    text-align: center;
    font-size: 0.8rem;
    color: ${(props) => props.trafficType === 3 ? "gray" : "white"};
    height: 20px;
    border-radius: 10rem;
    background-color: ${(props) => props.trafficType === 1 ? "red" : props.trafficType === 2 ? "blue" : null};	// 그라데이션 설정
    svg{
        width: 50;
        height: 50;
        fill:#00A3FF;
    }
`;

function Gauge(props: any) {
    let ratio = Math.round(((props.sectionWidth) as number / (props.totalWidth) as number) * 100)
    const section = props.sectionWidth;
    let color;
    // useEffect(() => {
    //     if(props.trafficType as number === 3){

    //     }
    // },[])

    return (
    <RangeContainer
    ratio={section === 0 ? 0 :section < 6 ? 5 : ratio}>
        
        {section > 0 ? 
        <Range
        ratio={ratio as number}
        trafficType={props.trafficType as number}
        >
            {section !== 0 ? `${section}분` : null}
        </Range>
        :null}
    </RangeContainer>
    )
}

export default Gauge;