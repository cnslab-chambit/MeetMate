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
