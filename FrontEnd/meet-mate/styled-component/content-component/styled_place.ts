import styled from "styled-components";

export const PlaceAddDialog = styled.dialog`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    border-radius: 3px;
    gap: 20px;
    font-family: 'GmarketSansBD';
    border: 2px solid black;
    left: 60px;
    top: 25vh;
`
export const TextDialog = styled.p`
    text-align: center;
    padding: 10px;
`
export const InputDialog = styled.input`
    width: 100px;
    height: 30px;
    font-size: 14px;
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
    padding: 2px;
    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    }
    ::placeholder{
        font-size: 10px;
    }
`
export const HandleButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-bottom: 10px;
`
export const HandleButton = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 45px;
    background-color: #E1E1E1;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s ease;
    border: none;
    font-family: 'GmarketSansBD';
    &:hover{
        background-color: #F03A79;
        color: white;
        transition:  0.3s ease;
    }
`