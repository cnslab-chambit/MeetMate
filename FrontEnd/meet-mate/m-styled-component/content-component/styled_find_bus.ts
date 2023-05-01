import styled from "styled-components";

export const TransferBox = styled.div`
    display: flex;
    flex-direction: column;
    
    max-height: 50vh;
`;
export const TransInfoDiv = styled.div`
    /* position: absolute; */
    width: 400px;
    height: 80vh;
    background-color: red;
    left: 32%;
    top: 0%;
`

export const TimeBox = styled.div`
    display:flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 550;
    background-color: white;
    color:black;
    border-bottom: 0.1px solid gray;
`;

export const Boldpg = styled.div`
    font-family: 'GmarketSansBD';
    font-weight: 800;
    font-size: 1.5rem;
`;

export const FlexBox = styled.div`
    /* justify-content: center; */
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    font-weight: 400;
    gap: 2px;
    padding: 2px;
`;

export const FlexBoxCol = styled.div`
    align-items: center;
    flex-direction: column;
    display: flex;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 400;
`;
