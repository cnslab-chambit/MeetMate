import { busInfoState, busState } from "@/mobile-content/atom";
import { useRecoilValue } from "recoil";
import { MapMarker,Polyline,Map as KakaoMap} from 'react-kakao-maps-sdk';
import { useEffect, useState } from "react";
import { ToggleContainer } from "@/m-styled-component/promise-component/promise_styled";
import RoadInfo from "@/mobile-content/RoadInfo";
import { RoadInfoDiv } from "@/m-styled-component/road-compontnt/road_styled";
import { BusInfoDiv, BusInfoName, BusMainInfo } from "@/m-styled-component/bus-component/bus_styled";
import BusIcon from "@/public/images/bus.svg"
import { ShadowBox } from "@/m-styled-component/content-component/styled_find_bus";

function Map() {
    const busRecoil = useRecoilValue(busState);
    const busInfo = useRecoilValue(busInfoState);
    const [map,setMap] = useState<any>();
    const [graphPos, setGraphPos] = useState<any>([]);
    let bounds;
    
    const drawPolyLine = (lane: any) => {  
      for(let i = 0; i < lane?.length; i++){
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
        bounds.extend(new kakao.maps.LatLng(parseFloat(boundary?.bottom) - 0.15,parseFloat(boundary?.left)))
        bounds.extend(new kakao.maps.LatLng(parseFloat(boundary?.top),parseFloat(boundary?.right))) 
        map?.setBounds(bounds);
      }
    };

      useEffect(() => {
        if(busRecoil){
        setBound(busRecoil?.data?.result.boundary);    
        }
        drawPolyLine(busRecoil?.data?.result.lane[0].section[0].graphPos);
      },[map]);

      console.log(busInfo)
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
            <>
            <MapMarker position={{ lat: graphPos[0].lat, lng: graphPos[0].lng}}
            image={{
              src: "/images/start.svg",
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>
          </>
             :
             null
             }
        </KakaoMap>
        {/* 여기서부터 버스 정보 출력 */}
        <ShadowBox>
          <ToggleContainer visible={true}>
            <BusInfoDiv>
              <BusInfoName>
                <BusIcon/>
                {busInfo.busNo}
              </BusInfoName>
              <BusMainInfo>
                <div>
                  {busInfo.busCityName} | {busInfo.busStartPoint} ↔ {busInfo.busEndPoint}
                </div>
                <div>
                  {busInfo.busFirstTime} ~ {busInfo.busLastTime}
                </div>
                <br/>
                <div style={{color:"black"}}>
                  배차간격 → 평일: {busInfo.bus_Interval_Week}분 토요일: {busInfo.bus_Interval_Sat}분 일요일: {busInfo.bus_Interval_Sun}분 
                </div>
              </BusMainInfo>
            </BusInfoDiv>
          </ToggleContainer>
        </ShadowBox>
    </>
    )
}

export default Map;