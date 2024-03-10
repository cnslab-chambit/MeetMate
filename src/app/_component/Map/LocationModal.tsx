import { FlexBetweenCSS, FlexCenterCSS } from "@/styles/common";
import styled from "styled-components";

interface ModalProps {
  placeName: string;
  onClose: () => void;
  color?: string;
}

function LocationModal({ placeName, onClose, color = "#ffd94c" }: ModalProps) {
  return (
    <S.IndexInfoDiv color={color}>
      <S.IndexLocName>{placeName}</S.IndexLocName>
      <S.IndexBackButton onClick={onClose}>x</S.IndexBackButton>
    </S.IndexInfoDiv>
  );
}

const S = {
  IndexInfoDiv: styled.div<{ color: string }>`
    ${FlexBetweenCSS}
    font-size: 1.5rem;
    padding: 30px;
    overflow: hidden;
    background: linear-gradient(#ffd94c, #fff4cc);
    border: none;
    border-radius: 1rem;
    font-weight: 700;
    box-shadow: 1px 1px 0px 0px gray;
  `,

  IndexLocName: styled.div`
    ${FlexCenterCSS}
    width: 100%;
    font-family: "GmarketSansBD";
  `,

  IndexBackButton: styled.div`
    ${FlexCenterCSS}
    position: absolute;
    right: -1rem;
    top: -1rem;
    width: 2rem;
    height: 2rem;
    border: 2px solid black;
    background-color: white;
    border-radius: 1rem;
    background-color: #595548;
    border: none;
    color: white;
    padding-bottom: 2px;
    cursor: pointer;
  `,
};

export default LocationModal;
