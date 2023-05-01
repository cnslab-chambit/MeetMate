import styled from "styled-components";

export const BusContainer = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BusDescript = styled.span`
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 2rem;
`;

export const BusNoInput = styled.input`
    width: 30rem;
    height: 5rem;
    font-size: 2rem;
    border: 2px solid black;
    border-radius: 2rem;
`;

export const BusResultContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    width: 80%;
    border: 2px solid black;
    margin-top: 2rem;
`;

export const BusResultCard = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1px;
    font-size: 1.5rem;
    border-bottom: 1px solid gray;
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