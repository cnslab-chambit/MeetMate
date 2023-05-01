import { IEachLocation, IMarkers, loadAtom, locationAtom, mapAtom, trafficState } from "@/mobile-content/atom";
import { selectType } from "@/mobile-hook/select-color";
import { useEffect, useMemo, useRef, useState } from "react";
import { Map,MapMarker,Polyline} from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue } from "recoil";
import start from "../../../public/images/start.svg";

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
      for(let i   = 0; i < 2; i++){
        bounds?.extend(new kakao.maps.LatLng(parseFloat(loadRecoil[i]?.y),parseFloat(loadRecoil[i]?.x)))
      }

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
    <Polyline key={index}
    path={drawPolyLine(data)}
    strokeColor={selectType(data) as string}
    strokeWeight={5}
    />
    )
    :
    null  
    }
    {loadRecoil.map((load:IMarkers,index:number) => 
      <MapMarker key={index}
      position={{lat: parseFloat(load.y), lng: parseFloat(load.x)}}
      />
    )}
    </Map>

    </>
    )
}

export default Road;