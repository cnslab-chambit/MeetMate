import styled, { css } from "styled-components";

export const ContentPageDiv = styled.div`
    padding: 10px;
    overflow-y: scroll;
    height: 100vh;
`
export const ContentInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const ContentInput = styled.input<{active:boolean}>`
    width: 345px;
    height: 49px;
    padding: 10px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 3px;
    outline: none;  
    border: ${(props)=> props.active ? 'none' :'1.5px solid #3E3E3E' };
`
export const ContentInputButton = styled.input`
    width: 104px;
    height: 49px;
    background-color: transparent;
    cursor: pointer;
    /* border: 1.5px solid #3E3E3E; */
    background-color: #E1E1E1;
    border: none;
    border-radius: 3px;
    font-family: 'GmarketSansBD';
    font-size: 15px;
    transition: 0.3s ease;
    &:hover{
        background-color: #F03A79;
        color: white;
        transition:  0.3s ease;
    }

`
export const ContentInputForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
`
export const ContentInputIconDiv = styled.div`
    display: flex;      
    width: 345px;
    border: 1.5px solid #3E3E3E;
    border-radius: 3px;
    svg{
        position: relative;
        right: 10px;
        top: 13px;  
        cursor: pointer;
    }
`