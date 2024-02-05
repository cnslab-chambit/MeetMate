import styled from "styled-components";

export const NavButtonDiv = styled.div<{active:boolean}>`
    display: flex;
    align-items: center;
    background-color: white;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    z-index: 2;
    left: ${(props)=> props.active ? '380px' : '0'};
    height: 50px;
    cursor: pointer;
    border-radius: 0px 3px 3px 0px ;
    .arrow{
        transform: ${(props)=> props.active ? '' : 'rotate(180deg)'};
        transition: 0.2s ease;
    }
`