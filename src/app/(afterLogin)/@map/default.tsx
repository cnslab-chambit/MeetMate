"use client";
import { Inter } from "next/font/google";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { IMarkers, mapAtom } from "@/src/app/_atom/atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import KakaoMap from "@/src/app/_component/Map/KakaoMap";
import KakaoMarker from "@/src/app/_component/Map/KakaoMarker";
import LocationModal from "@/src/app/_component/Map/LocationModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const mapRecoil = useRecoilValue<IMarkers>(mapAtom);
  const [visible, setVisible] = useState(true);
  const Greet = "Your MeetMate!";

  return (
    <KakaoMap x={mapRecoil.x} y={mapRecoil.y}>
      <KakaoMarker x={mapRecoil.x} y={mapRecoil.y} src="/images/flag.svg" />
      <CustomOverlayMap
        position={{
          lat: parseFloat(mapRecoil.y),
          lng: parseFloat(mapRecoil.x),
        }}
        yAnchor={1.8}
        zIndex={3}
      >
        {visible && (
          <LocationModal
            placeName={
              mapRecoil.place_name !== "장소 찾기"
                ? mapRecoil.place_name
                : Greet
            }
            onClose={() => setVisible(false)}
          />
        )}
      </CustomOverlayMap>
    </KakaoMap>
  );
}
