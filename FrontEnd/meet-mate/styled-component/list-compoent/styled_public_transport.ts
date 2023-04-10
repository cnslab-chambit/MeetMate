import styled from "styled-components"

export const TransportTypeDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-around;
    border-bottom: 1px solid #B1B1B1;
`
export const TransportTypeTextDiv = styled.div<{ active: boolean }>`
    display: flex;
    font-size: 18px;
    font-weight: bold;
    padding: 12px;
    cursor: pointer;
    transition: 0.3s ease;
    border-radius: 5px;
    background-color: ${(props) => props.active ? ('#F03A79') : ('none')};
    color: ${(props) => props.active ? ('white') : ('none')};
    :hover{
        background-color: #F03A79;
        transition: 0.3s ease;
        color: white;
    }
`