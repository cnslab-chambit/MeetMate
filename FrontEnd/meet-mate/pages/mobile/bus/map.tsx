import { busState } from "@/mobile-content/atom";
import { useRecoilValue } from "recoil";
import { MapMarker,Polyline,Map as KakaoMap} from 'react-kakao-maps-sdk';
import { useEffect, useState } from "react";
import Start from "../../../public/images/start.svg";

function Map() {
    const busRecoil = useRecoilValue(busState);
    const [map,setMap] = useState<any>();
    const [graphPos, setGraphPos] = useState<any>([]);
    let bounds;
    
    const drawPolyLine = (lane: any) => {  
      for(let i = 0; i < lane.length; i++){
          const lat = lane[i].y;
          const lng = lane[i].x;
          if (lat && lng) {
              setGraphPos((prev: any) => [...prev, {lat: lat, lng: lng}]);
          }
      }
  };
    const setBound = (boundary: any) => {
      if(map){
        bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(parseFloat(boundary?.bottom),parseFloat(boundary?.left)))
        bounds.extend(new kakao.maps.LatLng(parseFloat(boundary?.top),parseFloat(boundary?.right))) 
        map?.setBounds(bounds);
      }
    };

      useEffect(() => {
        if(busRecoil){
        setBound(busRecoil?.data?.result.boundary);    
        }
        drawPolyLine(busRecoil?.data?.result.lane[0].section[0].graphPos);
      console.log(graphPos[0]);
      },[map]);
      return (
        <>
        <KakaoMap
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100vh" ,maxHeight:"100vh"}}
        onCreate={setMap}
        >
          <Polyline
            path={graphPos}
            strokeColor="blue"
            strokeWeight={9}
            strokeOpacity={1}
            />  
            <Polyline
            path={graphPos}
            strokeColor="white"
            strokeWeight={2}
            strokeOpacity={1}
            strokeStyle="dash"
            />  
            {graphPos.length > 0 ?
            <MapMarker position={{ lat: graphPos[0].lat, lng: graphPos[0].lng}}
            image={{
              src: "../../../public/images/start.svg",
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>
             :
             null
             }
        </KakaoMap>
    </>
    )
}

export default Map;