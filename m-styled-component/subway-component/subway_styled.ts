import styled from "styled-components";

export const SubwayMapDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
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
    gap: 5px;
`
export const SubwayLaneName = styled.div`
    font-size: 15px;
    font-weight: bold;
`
export const SubwayViewDetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`
export const StationNameText = styled.h2`
    text-align: center;
    font-size: 12px;
`
export const ArrowDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 30px;
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
    gap: 10px;
    
`
export const StationDiv = styled.div<{ active: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    circle{
        fill: ${(props) => props.active};
    }

`
export const RoadDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    min-height: 80vh;
    /* background-color: red; */
`
export const CrossInputDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;
    margin-top: 3rem;
    svg{
        cursor: pointer;
    }
`
export const CrossIconDiv = styled.div`
    position: relative;
    right: 20px;
`
export const RoadButtonDiv = styled.div`
    display: flex;
    width: 350px;
    margin-left: 20px;
    gap: 3rem;
    justify-content: center;
    padding: 7px;
    margin-top: 30px;
`

export const RoadForm = styled.form`
`

export const TitleNameText = styled.h2`
    font-size: 18px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 280px;
    :hover{
        color: #367BF6;
    }
`;

export const ListInformationCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    gap: 5px;
    width: 30rem;
    :hover{
        background-color: rgba(54, 123, 246, 0.46);
    }
`
