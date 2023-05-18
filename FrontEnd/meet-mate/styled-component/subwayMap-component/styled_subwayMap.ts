import styled from "styled-components";

export const SubwayMapDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    max-height: 150vh;
    overflow-y: scroll;
    padding: 10px;
`
export const SubwayPlainText = styled.h1`
    font-size: 26px;
`
export const SubwayViewDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`
export const SubwayLaneName = styled.div`
    font-size: 15px;
    font-weight: bold;
`
export const SubwayViewDetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
export const StationNameText = styled.h2`
    text-align: center;
    font-size: 12px;
`
export const ArrowDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 50px;
    svg{
        position: relative;
        bottom: 22%;
    }
`
export const SubStationDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    
`
export const StationDiv = styled.div<{ active: string }>`
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    circle{
        fill: ${(props) => props.active};
    }

`