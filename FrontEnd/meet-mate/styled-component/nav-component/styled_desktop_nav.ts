import styled, { css } from "styled-components";
export const NavDiv = styled.div`
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #FFD1E1 0%, rgba(240, 58, 121, 0) 100%);
    gap: 10px;
`
export const NavTitle = styled.h1`
    padding: 10px;
    font-family: 'FredokaOne';
    font-size: 20px;
`
export const NavIconDiv = styled.div`
    display: flex;
    /* padding: 10px; */
    padding-left: 20px;
    padding-right: 20px;    
`
export const NavIconText = styled.h3`
    font-family: 'GmarketSansBD';
    text-align: center;
`
export const IconTextDiv = styled.button<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 25%;
    height: 80px;
    cursor: pointer;
    transition: 0.3s ease;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;

    ${(props) => props.active && css`
        background-color: #F03A79;
        color: white;
        path{
            fill: white;
        }
    `}
    &:hover{
        background-color: #F03A79;
        transition: 0.3s ease;
        color: white;
        path{
            transition: 0.3s ease;
            fill: white;
        }
    }
`