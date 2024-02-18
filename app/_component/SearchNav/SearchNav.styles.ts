import { FlexCenterCSS } from "@/styles/common";
import styled from "styled-components";

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  background-color: #367bf6;
  justify-content: center;
  align-items: center;
`;

export const NavSearchDiv2 = styled.label`
  position: relative;
  ${FlexCenterCSS}
  width: 100%;

  & > button {
    position: absolute;
    right: 15%;
    top: 2.7rem;
  }
`;

export const NavLogo = styled.div`
  display: flex;
  margin: 0 auto;
  color: white;
  font-size: 2rem;
  font-family: "GmarketSansBD";
  margin-top: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

export const NavIconDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* padding: 10px; */
  min-height: 6rem;
`;

export const NavIconText = styled.h3`
  font-family: "GmarketSansBD";
  text-align: center;
`;

export const IconTextDiv = styled.div<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  cursor: pointer;

  background-color: ${(props) => (props.isActive ? "#ffffff" : "")};
  transition: 0.3s ease;
  color: ${(props) => (props.isActive ? "#666666" : "white")};
  path {
    transition: 0.3s ease;
    fill: ${(props) => (props.isActive ? "#00A3FF" : "white")};
  }
  :hover {
    background-color: ${(props) => (props.isActive ? null : "#00A3FF")};
    transition: 0.3s ease;
    color: #666666;
    path {
      transition: 0.3s ease;
      fill: ${(props) => (props.isActive ? "#00A3FF" : "white")};
    }
  }
`;

export const NavDiv = styled.div`
  position: relative;
  ${FlexCenterCSS}
  width: 100%;
  color: white;
`;

export const NavIconContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
`;

export const NavButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;
