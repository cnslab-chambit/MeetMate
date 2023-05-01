import styled from "styled-components";

export const WayBar = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BaseBar = styled.div`
    display: flex;
    height: 20px;
    max-width: 350px;
    border-radius: 10rem;
`;


export const RangeContainer = styled.div<{ ratio: number }>`
    width: ${(props) => `${props.ratio}%`};
`;

export const SvgConatiner = styled.div<{ subwayColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 20px;    
    border-radius: 10rem;
    border: 1px solid #605a5a;
    transform: translateX(-0.7rem);
    background-color: ${(props) => props.subwayColor === "#c8c7c7" ? "gray" : `${props.subwayColor}`};
`;

export const Range = styled.div<{ ratio: number, trafficType: number, subwayColor: string }>`
    font-size: 0.8rem;
    color: white;
    height: 15px;
    border-radius: 10rem;
    background-color: ${(props) => `${props.subwayColor}`};
    svg{
        width: 20px;
        height: 20px;
        fill: white;
    }
`;

export const RangeText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-0.7rem);
    font-size: 10px;
    margin: 0 auto;
`
