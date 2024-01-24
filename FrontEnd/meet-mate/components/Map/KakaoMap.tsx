import { Dispatch } from "react";
import { Map } from "react-kakao-maps-sdk";

interface MapProps {
  x: string;
  y: string;
  onCreate?: Dispatch<any>;
  children?: React.ReactNode;
}

function KakaoMap(props: MapProps) {
  return (
    <Map
      center={{ lat: parseFloat(props.y), lng: parseFloat(props.x) }}
      style={{ width: "100%", height: "79vh", maxHeight: "100vh" }}
      id="map"
      onCreate={props.onCreate}
    >
      {props.children}
    </Map>
  );
}

export default KakaoMap;
