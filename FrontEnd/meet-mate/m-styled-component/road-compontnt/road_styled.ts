import styled from "styled-components";

export const WayBar = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BaseBar = styled.div`
    display: flex;
    height: 20px;
    width: 50rem;
    border-radius: 10rem;
    background-color: #dad7d7;
    margin-right: 15%;		// 페이지에서 원하는 부분만큼 자유롭게 설정
    margin-left: 15%;
`;


export const RangeContainer = styled.div<{ratio: number}>`
    width: ${(props) => `${props.ratio}%`};
`;

export const SvgConatiner = styled.div<{subwayColor:string}>`
    width:20px;
    height: 20px;    
    border-radius: 10rem;
    border: 1px solid #605a5a;
    transform: translateX(-0.7rem);
    background-color: ${(props) => props.subwayColor === "#c8c7c7" ? "gray" : `${props.subwayColor}`};
`;

export const Range = styled.div<{ratio : number, trafficType: number,subwayColor: string}>`
    text-align: center;
    font-size: 0.8rem;
    color: white;
    height: 20px;
    border-radius: 10rem;
    background-color: ${(props) => `${props.subwayColor}`};
    svg{
        width: 20px;
        height: 20px;
        fill: white;
    }
`;

export const RangeText = styled.div`
    transform: translateX(-0.7rem);
    font-size: 0.01rem;
    margin: 0 auto;
`