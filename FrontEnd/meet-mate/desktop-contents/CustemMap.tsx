import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import { useRef } from 'react';

const ZoomCustem = () => {
  kakao.maps.CopyrightPosition.BOTTOMRIGHT
  return (
    <>
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
    </>
  )
}
function CustemMap() {
  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100vh" }}

      >
        <ZoomCustem />
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        </MapMarker>
      </Map>
    </>
  )
}

export default CustemMap;
