import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import RoadInfo from "./RoadInfo";
import { placeState } from "./atom";

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
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
`;

const SliderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  font-weight: 800;
  border-radius: 2rem;
`;

const SliderButtonDiv = styled.div`
  display: flex;
  position: absolute;
  bottom: 3rem;
  left: 20rem;
  gap: 10rem;
`;

const LocalColorDiv = styled.div<{color:string}>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.color};
`

const Route = (placeRoute: any, color: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const colorArr = ["#a5e495", "#95b3e7","#eb9191","#bc83fd","#A9E1ED","#d6f3ad"];
  const [placeAdd, setPlaceAdd] = useRecoilState(placeState);
  console.log(color);

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
            <div style={{display:"flex",paddingLeft:"1rem",alignItems:"center"}}>
            {index + 1}번 &nbsp;
            <LocalColorDiv color={colorArr[index % 6]}> {placeAdd[index].current} </LocalColorDiv>
            &nbsp; 출발
            </div>
            <RoadInfo pathRecoil={location.result.path[0]}/>  
          </SlideItem>
        ))}
        
      <SliderButtonDiv>
        <SliderButton onClick={scrollToLeft}>&lt;</SliderButton>
        <SliderButton onClick={scrollToRight}>&gt;</SliderButton>
      </SliderButtonDiv>
      </SlideContainer>
    </>
  );
};

export default Route;
