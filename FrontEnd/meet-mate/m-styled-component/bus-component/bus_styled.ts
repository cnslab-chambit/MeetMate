import styled from "styled-components";

export const BusContainer = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
`;

export const BusDescript = styled.span`
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 2rem;
`;

export const BusNoInput = styled.input`
    width: 45rem;
    height: 5rem;
    font-size: 2rem;
    border: 2px solid black;
    border-radius: 2rem;
    margin-bottom: 2rem;
    padding-left: 2rem;
`;

export const BusResultContainer = styled.div`
    display: flex;
    width: 45rem;
    flex-direction: column;
    border: 2px solid black;    
`;

export const BusResultCard = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    font-size: 1.5rem;
    border-bottom: 1px solid gray;
    height: 7rem;
    padding: 1rem 1rem;
    cursor: pointer;
`;

export const BusLocal = styled.span`
    color: gray;
`;

export const BusBasicInfo = styled.div`
    display: flex;
    gap: 2rem;
`;

export const BusPointInfo = styled.div`
    display: flex;
`;

export const FlexColDiv = styled.div`
    display: flex;
    flex-direction: column;
`;