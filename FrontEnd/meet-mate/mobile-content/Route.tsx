import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import RoadInfo from "./RoadInfo";

const SlideContainer = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  display: flex;
  flex-wrap: nowrap; /* 슬라이드 아이템을 한 줄에 배치합니다. */
  width: 100%;
  height: 30rem;
  margin-top: 1rem;
  z-index: 2;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 2px 2px 1px 1px #666666;
  overflow: hidden;
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  font-size: 2rem;
  width: 100%;
`;

const SliderButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const Route = (placeRoute: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToLeft = () => {
    const container = document.getElementById("slideContainer");
    if (container) {
      container.scrollTo({
        left: scrollPosition - container.clientWidth, // 슬라이드 컨테이너의 너비만큼 스크롤합니다.
        behavior: "smooth",
      });
      setScrollPosition(scrollPosition - container.clientWidth);
    }
  };

  const scrollToRight = () => {
    const container = document.getElementById("slideContainer");
    if (container) {
      container.scrollTo({
        left: scrollPosition + container.clientWidth, // 슬라이드 컨테이너의 너비만큼 스크롤합니다.
        behavior: "smooth",
      });
      setScrollPosition(scrollPosition + container.clientWidth);
    }
  };

  return (
    <>
      <SlideContainer id="slideContainer">
        {placeRoute?.placeRoute?.map((location: any, index: number) => (
          <SlideItem key={index}>
            <h2>{index + 1}번째 사람</h2>
            <RoadInfo pathRecoil={location.result.path[0]}/>  
          </SlideItem>
        ))}
      </SlideContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SliderButton onClick={scrollToLeft}>&lt;</SliderButton>
        <SliderButton onClick={scrollToRight}>&gt;</SliderButton>
      </div>
    </>
  );
};

export default Route;
