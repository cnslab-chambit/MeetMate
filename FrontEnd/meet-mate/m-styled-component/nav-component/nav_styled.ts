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
    padding-left: 20px;
    padding-right: 20px;    
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
    gap: 5px;
    width: 25%;
    height: 80px;
    cursor: pointer;
    background-color: ${(props) => props.isActive ? "#ffffff" : ""};
    transition: 0.3s ease;
    color: ${(props) => props.isActive ? "#666666" : ""};
    path{
            transition: 0.3s ease;
            fill: ${(props) => props.isActive ? "#00A3FF" : ""};
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

export const NavLogo = styled.div`
display:flex;
margin: 0 auto;
color: white;
font-size: 3rem;
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
  }
  button {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

export const NavForm = styled.form`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  `;

export const NavInput = styled.input`
  width: 50rem;
  height: 3rem;
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