import styled from "styled-components";
import React from "react";
export const Container = styled.div`
  display:flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  height:10vh;
  background-color: #367BF6;
  /* @media screen and (max-width:768px){
    background-color: black;
  } */
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

export const NavLogo = styled.div`
display:flex;
color: white;
font-size: 2rem;
font-weight: 700;
`;

export const NavMenu = styled.div`
display: flex;
position: absolute;
right:0;
padding-top: 1rem;
padding-right: 1rem;
`;
