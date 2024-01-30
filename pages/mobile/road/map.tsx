import { IEachLocation, IMarkers, loadAtom, locationAtom, mapAtom, trafficState } from "@/mobile-content/atom";
import { selectType } from "@/mobile-hook/select-color";
import { useEffect, useMemo, useRef, useState } from "react";
import { Map,MapMarker,Polyline} from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue } from "recoil";
import start from "../../../public/images/start.svg";
import { InfoDiv } from "@/m-styled-component/promise-component/promise_styled";
import { RoadInfoContainer } from "@/m-styled-component/road-compontnt/road_styled";
import RoadInfo from "@/mobile-content/RoadInfo";

function Road() {
    const loadRecoil = useRecoilValue<IMarkers[]>(loadAtom);
    const [laneData2, setLaneData2] = useState<any | null>([]);
    const [map, setMap] = useState<any>()
    const mapRecoil = useRecoilValue(mapAtom);
    const pathRecoil = useRecoilValue(trafficState);
    
    let lineArr = new Array();
    let bounds;

    const setBound = () => {
      if(map){      
      bounds = new kakao.maps.LatLngBounds();
        bounds?.extend(new kakao.maps.LatLng(parseFloat(loadRecoil[0]?.y)+ 0.005,parseFloat(loadRecoil[0]?.x)))  
        bounds?.extend(new kakao.maps.LatLng(parseFloat(loadRecoil[1]?.y)- 0.16,parseFloat(loadRecoil[1]?.x)))
      
      map?.setBounds(bounds)
    };      
    }
	
  const callMapObjApiAJAX = (mapObj: string) => {
    const url = `https://api.odsay.com/v1/api/loadLane?mapObject=0:0@${mapObj}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
    (async () => {
        const data = await (await fetch(url)).json();
        if(data){
          for(let i = 0; i < data?.result?.lane.length; i++){
            setLaneData2((prev: any) => [...prev,data.result?.lane[i]])
          }
      }
    })()
};

const drawPolyLine = (lane: any) => {  
  lineArr = [];  
  for(let j=0 ; j < lane?.section.length; j++){
      for(let k = 0; k < lane.section[j].graphPos.length; k++){
        lineArr.push({lat: lane.section[j].graphPos[k].y, lng: lane.section[j].graphPos[k].x});
      }
    }
    return lineArr;
}

    useEffect(() => {
      setBound();  
      callMapObjApiAJAX(pathRecoil.info.mapObj);
    },[map]);

    return (
    <>
      <Map
      center={{ lat: parseFloat("33.55635"), lng: parseFloat("126.795841") }}
      style={{ width: "100%", height: "85vh" ,maxHeight:"100vh"}}
      onCreate={setMap}
    >
      {laneData2.length !== 0 ? 
    laneData2.map((data: any, index:number) =>
    <div
    key={index}>
    <Polyline
    path={drawPolyLine(data)}
    strokeColor={selectType(data) as string}
    strokeWeight={8}
    />
    <Polyline key={index + 10}
    path={drawPolyLine(data)}
    strokeColor="white"
    strokeWeight={2}
    strokeStyle="dash"
    strokeOpacity={1}
    />
    </div>
    )
    :
    null  
    }
        <>
          <MapMarker position={{ lat: parseFloat(loadRecoil[0].y), lng: parseFloat(loadRecoil[0].x)}}
            image={{
              src: "/images/start.svg",
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>
          <MapMarker position={{ lat: parseFloat(loadRecoil[1].y), lng: parseFloat(loadRecoil[1].x)}}
            image={{
              src: "/images/end.svg",
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>
        </>
    </Map>
    <RoadInfoContainer>
      <RoadInfo pathRecoil={pathRecoil}/>
    </RoadInfoContainer>
    </>
    )
}

export default Road;