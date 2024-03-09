import { MapMarker } from "react-kakao-maps-sdk";

interface MarkerProps {
  x: string;
  y: string;
  src?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

function KakaoMarker({
  x,
  y,
  src,
  width = 60,
  height = 60,
  onClick,
}: MarkerProps) {
  const markerImage = src
    ? {
        src: src,
        size: {
          width: width,
          height: height,
        },
      }
    : undefined;

  return (
    <MapMarker
      position={{
        lat: parseFloat(y),
        lng: parseFloat(x),
      }}
      image={markerImage}
      onClick={onClick}
    />
  );
}

export default KakaoMarker;
