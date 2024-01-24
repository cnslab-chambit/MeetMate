import styled from "styled-components";
import { BackButton } from "../promise-component/promise_styled";

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const BasicContainer = styled.div`
  width: 100%;
  min-height: 80vh;
`;

export const ContentPageDiv = styled.div`
  overflow: hidden;
  max-height: 100vh;
`;
export const ContentInputDiv = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.active ? "10px" : "2px")};
`;
export const ContentInput = styled.input<{ active: boolean }>`
  width: 345px;
  height: 49px;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 1rem;
  outline: none;
  border: ${(props) => (props.active ? "none" : "1.5px solid #3E3E3E")};
`;
export const ContentInputButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export const ContentInputButton = styled.input<{
  _width: string;
  _heigth: string;
}>`
  width: ${(props) => props._width};
  height: ${(props) => props._heigth};
  background-color: transparent;
  cursor: pointer;
  background-color: #e1e1e1;
  border: none;
  border-radius: 3px;
  font-family: "GmarketSansBD";
  font-size: 15px;
  transition: 0.3s ease;
  &:hover {
    background-color: #367bf6;
    color: white;
    transition: 0.3s ease;
  }
`;
export const ContentInputForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 65vh;
`;
export const ContentPlaceDiv = styled.div`
  display: grid;
  gap: 20px;
`;
export const ContentInputIconDiv = styled.div`
  display: flex;
  width: 345px;
  border: 1.5px solid #3e3e3e;
  border-radius: 3px;
  svg {
    position: relative;
    right: 10px;
    top: 13px;
    cursor: pointer;
  }
`;
