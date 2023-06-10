import styled, { css, keyframes } from "styled-components";

export const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

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

export const SelectButton = styled.div<{active:boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 10rem;
    height: 3rem;
    border: 2px solid gray;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: ${(props) => props.active ? "#C7D6FF" : "white"};
    color: ${(props) => props.active ? "white" : "black"};
`;

export const ToggleContainer = styled.div<{visible:boolean}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  z-index: 2;
  padding: 0 2rem;
  cursor: pointer;
  bottom : 10rem;
  justify-content: center;
  align-items: center;
  animation: ${({ visible }) =>
    visible
      ? css`
          ${slideIn} 0.5s forwards
        `
      : css`
          ${slideOut} 0.5s forwards
        `};
`;

export const ToggleButton = styled.div`
    display: flex;
    align-items: center;
    height: 3rem;
    border: 2px solid gray;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    width: 15rem;
    background-color: white;
    path{
      stroke: #00A3FF;
    }  
    box-shadow: 0px 1px 0px 0px #000000;
`;

export const ToggleMenuDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30rem;
  margin-top: 1rem;
  z-index: 2;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 2px 2px 1px 1px #666666;
  overflow: auto;
`;

export const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  height: 14rem;
  padding: 1rem;
  justify-content: space-evenly;
  border-bottom: 1px solid gray;
`;

export const PlaceInfoDiv = styled.div`
    display: flex;
    gap: 2rem;
`

export const PlaceName = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 700;
  path{
    fill: #FFC910;
  }
`;

export const NonStoreDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 800;
  width: 100%;
  height: 100%;
`;

export const ImageBox = styled.div`
  width: 7rem;
  height: 7rem;
  background-image: url("/images/sad.svg");
`;

export const PlaceAddress = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  color: #666666;
`;

export const StarSpan = styled.div`
  font-size: 1.5rem;
`;

export const CategotyDiv = styled.div`
  margin-left: 2rem;
  font-size: 1.5rem;
  color: #666666;
`;

export const RoadButton = styled.div`
    display: flex;
    align-items: center;
    height: 3rem;
    border: 2px solid gray;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    width: 10rem;
    background-color: white;
    margin-top: 1rem;
    path{
      fill: #00A3FF;
    }  
    box-shadow: 0px 1px 0px 0px #000000;
`;

export const StoreInfoDiv = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 20rem;
  height:8rem;
  overflow: hidden;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-radius: 1rem;
  font-weight: 700;
  box-shadow: 2px 2px 1px 0px gray;
`;

export const StoreName = styled.div`
  display: flex;
  width: 70%;
  justify-content: center;
`;

export const DecisionDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 30%;
  height: 100%;
  background-color: #D95050;
  color: white;
  border-radius: 0 1rem 1rem 0;
  border: none;
`;

export const BackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -1rem;
  top: -1rem;
  width: 2rem;
  height: 2rem;
  border: 2px solid black;
  background-color: white;
  border-radius: 1rem;
`;