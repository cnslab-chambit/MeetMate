import { Dispatch } from "react";
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface MapProps {
  x: string;
  y: string;
  onCreate?: Dispatch<any>;
  children?: React.ReactNode;
}

function KakaoMap(props: MapProps) {
  return (
    <S.Container>
      <Map
        center={{ lat: parseFloat(props.y), lng: parseFloat(props.x) }}
        style={{ width: "100%", height: "100%" }}
        id="map"
        onCreate={props.onCreate}
      >
        {props.children}
      </Map>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;

    @media screen and (max-width: 1024px) {
      height: 80vh;
    }
  `,
};

export default KakaoMap;
