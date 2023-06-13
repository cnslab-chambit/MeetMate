import styled from "styled-components";

export const PromiseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

export const LogoMent = styled.h2`
    font-family: 'GmarketSansBD';
    font-size: 3rem;
    text-align: center;
`;

export const LogoDiv = styled.div`
    font-family: 'GmarketSansBD';
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
`;

export const PromiseInput = styled.input`
    font-family: 'GmarketSansBD';
    font-size: 2rem;
    height: 4rem;
    width: 30rem;
    color: #666666;
    margin-top: 2rem;
    &:focus{
        color: black;
    }
`; 

export const PromiseButton = styled.button`
    background-color: white;
    border: 0.15rem solid;
    border-radius: 1rem;
    font-size: 2rem;
    width: 10rem;
    height: 5rem;
    font-family: 'GmarketSansBD';
    cursor: pointer;
    &:hover{
        background-color: #9a9999;
    }
`;

export const PromiseButton2 = styled(PromiseButton)`
    background-color: #3880FF;
    &:hover{
        background-color: #0381ca;
    }
`;

export const ButtonDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    margin-top: 4rem;
`;

export const PromiseDiv = styled.div`
    display: flex;
    align-items: center;
    font-family: 'GmarketSansBD';
    font-size: 1.5rem;
    height: 4rem;
    width: 30rem;
    color: #666666;
    border-radius: 1rem;
    padding-left: 1rem;
    margin-top: 2rem;
    border: 0.15rem solid;
    &:focus{
        color: black;
    }
    
`;


export const LocationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: scroll;
`;

export const LocationDiv = styled.div`
    display:flex;
    flex-direction: column;
    font-size: 3rem;
    padding: 1rem;
    border-bottom: 2px solid #9e9d9d;
    cursor: pointer;
    &:hover{
        background-color: #367BF6;
        transition: 0.3s ease;
        color: white;
        path{
            transition: 0.3s ease;
            fill: white;
        }
    }
`;

export const LocationName = styled.div`
    font-size: 2rem;
`;
