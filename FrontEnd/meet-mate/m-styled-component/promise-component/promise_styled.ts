import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 2;
  top: 1rem;
  padding: 0 2rem;
  justify-content: space-between;
  cursor: pointer;
`;

export const MapConatiner = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  max-height: 100vh;
`;

export const SelectButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 10rem;
    height: 3rem;
    border: 2px solid gray;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: white;
`;