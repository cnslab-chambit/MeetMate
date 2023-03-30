import styled from "styled-components";

export const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    overflow-y: scroll;
    max-height: 50vh;
`
export const ListInformationCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    gap: 5px;
    border-radius: 5px;
    :hover{
        background-color: rgba(255, 209, 225, 0.46);
    }
`
export const NameTextDiv = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
export const TitleNameText = styled.h2`
    font-size: 18px;
    cursor: pointer;
    :hover{
        color: #F03A79;
    }
`
export const GroupNameText = styled.h3`
    color: gray;
    font-size: 13px;
    text-align: center;
`
export const RoadNameText = styled.h3`
    font-size: 13px;
`
export const AddressNameText = styled.h3`
    font-size: 12px;
`