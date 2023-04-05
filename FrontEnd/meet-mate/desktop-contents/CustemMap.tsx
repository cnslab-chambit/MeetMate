import { clickState, inputState, markerState, searchState } from '@/atom/atoms';
import { useEffect, useState } from 'react';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';
const ZoomCustem = () => {
  return (
    <>
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
    </>
  )
}
function CustemMap() {
  const [marker, setMarker] = useRecoilState(markerState)
  const [click] = useRecoilState(clickState)
  const [search] = useRecoilState(searchState)
  const { start_point, end_point } = search
  useEffect(() => {
    if (click == 1) {
      setMarker({
        lat: +start_point.lat,
        lng: +start_point.lng,
        img: start_point.img
      })
    }
    else if (click == 2) {
      setMarker({
        lat: +end_point.lat,
        lng: +end_point.lng,
        img: end_point.img
      })
    }

  }, [search])
  console.log(marker, search)
  return (
    <>
      <Map
        center={{ lat: marker.lat, lng: marker.lng }}
        style={{ width: "100%", height: "100vh" }}
      >
        <ZoomCustem />
        <MapMarker position={{ lat: marker.lat, lng: marker.lng }}
          image={{
            src: `${marker.img}`,
            size: {
              width: 55,
              height: 55,
            }, // 마커이미지의 크기입니다.

          }} >
        </MapMarker>
      </Map>
    </>
  )
}

export default CustemMap;
