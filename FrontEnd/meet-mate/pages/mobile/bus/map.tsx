import { busState } from "@/mobile-content/atom";
import { useRecoilValue } from "recoil";
import { MapMarker,Polyline,Map as KakaoMap} from 'react-kakao-maps-sdk';
import { useEffect, useState } from "react";

function Map() {
    const busRecoil = useRecoilValue(busState);
    const [map,setMap] = useState<any>();
    const [graphPos, setGraphPos] = useState<any>([]);
    let bounds;

    const drawPolyLine = (lane: any) => {  
        for(let i = 0; i < lane.length; i++){
              setGraphPos((prev: any) => [...prev, {lat: lane[i].y, lng: lane[i].x}]);
            }
      };

    const setBound = () => {
      if(map){
        bounds = new kakao.maps.LatLngBounds();
        //bounds.extend(new kakao.maps.LatLng(parseFloat()))
        
      }
    };

      useEffect(() => {
        //setBound();
        drawPolyLine(busRecoil?.data?.result.lane[0].section[0].graphPos);
        console.log(busRecoil);
    },[map]);
console.log(busRecoil);
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
        </KakaoMap>
    </>
    )
}

export default Map;