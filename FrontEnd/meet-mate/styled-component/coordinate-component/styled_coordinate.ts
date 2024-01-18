import styled from "styled-components";

export const CoordinateDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* height: 100vh; */
    overflow: scroll;
`
export const CoordinateCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 3px;
    transition:  0.3s ease;
    &:hover{
        background-color: #F03A79;
        color: white;
        transition:  0.3s ease;
    }
    cursor: pointer;
`
export const CoordinatePlaceText = styled.div`
    font-size: 17px;
    font-weight: bold;
`

export const CoordinateAddressText = styled.div`
    font-size: 13px;
`
export const CoordinateRateText = styled.div`
    font-size: 13px;
`
export const CoordinateLinkText = styled.div`
    font-size: 13px;
`
export const MarkerDiv = styled.div`
    font-size: 14px;
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 160px;
    height: 40px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.25);
    
`
export const MarkerText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    overflow:hidden;
    text-overflow:ellipsis;
`
export const MarKerLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 0px 10px 10px 0px;
    transition:  0.3s ease;
    :hover{
        background-color: #F03A79;
        color: white;
        transition:  0.3s ease;
    }
`