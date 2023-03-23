import styled from "styled-components";
import React from "react";


export const Container = styled.div`
  display:flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
`;

export const NavIconDiv = styled.div`
    display: flex;
    /* padding: 10px; */
    padding-left: 6rem;
    padding-right: 6rem; 
`;


export const NavIconText = styled.h3`
    font-family: 'GmarketSansBD';
    text-align: center;
`;

export const IconTextDiv = styled.div<{isActive:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    gap: 5px;
    width: 25%;
    height: 80px;
    
    cursor: pointer;
    background-color: ${(props) => props.isActive ? "#ffffff" : ""};
    transition: 0.3s ease;
    color: ${(props) => props.isActive ? "#666666" : "white"};
    path{
            transition: 0.3s ease;
            fill: ${(props) => props.isActive ? "#00A3FF" : "white"};
        }
    :hover{
        background-color: #00A3FF;
        transition: 0.3s ease;
        color: #666666;
        path{
            transition: 0.3s ease;
            fill: white;
        }
    }
`;

export const Navigation = styled.div`
display:flex;
flex-direction: column;
width:100%;
background-color: #367BF6;
height:100%;
justify-content: center;
align-items: center;
`;

export const NavColDiv = styled.div`
  display: flex;
  flex-direction: column;
  fill: white;  
`

export const NavLogo = styled.div`
display:flex;
margin: 0 auto;
color: white;
font-size: 2rem;
font-family: 'GmarketSansBD';
margin-top: 1rem;
font-weight: 700;
cursor: pointer;
`;

export const NavMenu = styled.div`
display: flex;
position: absolute;
right:0;
padding-top: 1rem;
padding-right: 1rem;
`;

export const NavSearchDiv = styled.label`
  position: relative;
  input {
    border: none;
    padding: 0 15px;
    height: 4rem;
    border-radius: 1rem;
  }
  button {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

export const NavSearchDiv2 = styled(NavSearchDiv)`
  
  button {
    position: absolute;
    top: 3rem;
    right: 3rem;
  }
  div{
    display: flex;
    align-items: center;
    font-family: 'GmarketSansBD';
    font-size: 2rem;
    height: 4rem;
    width: 50rem;
    color: #666666;
    margin-bottom: 2rem;
    background-color: white;
    }`

export const NavForm = styled.form`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  `;

export const NavInput = styled.input`
  width: 50rem;
  height: 3rem;
  font-size: 2rem;
`;

export const NavDiv = styled.div`
  position:relative;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
`;

export const NavIconContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const NavButton = styled.button`
  background-color: white;
  border:none;
  cursor: pointer;
`;

export const NavBasicDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`