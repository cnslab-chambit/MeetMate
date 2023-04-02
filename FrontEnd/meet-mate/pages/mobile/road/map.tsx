import { IEachLocation, IMarkers, loadAtom, locationAtom, mapAtom } from "@/mobile-content/atom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Map,MapMarker,Polyline} from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue } from "recoil";

function Road() {
    const [apiData, setApiData] = useState<any>();
    const loadRecoil = useRecoilValue<IMarkers[]>(loadAtom);
    const [laneData, setLaneData] = useState<any | null>([]);
    const [laneData2, setLaneData2] = useState<any | null>([]);
    const mapRecoil = useRecoilValue(mapAtom);
    const mapRef: any = useRef();
    let lineArr = new Array();
    let sx = loadRecoil[0].x;
    let sy = loadRecoil[0].y;  //출발 좌표
    let ex = loadRecoil[1].x;
    let ey = loadRecoil[1].y;  //도착 좌표
    const bounds = useMemo(() => {
      const bounds = new kakao.maps.LatLngBounds();
      for(let i = 0; i < 2; i++){
        bounds.extend(new kakao.maps.LatLng(parseFloat(loadRecoil[i].y),parseFloat(loadRecoil[i].x)))
      }
      return bounds;
    },[])

	let url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
	
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
    mapRef.current.setBounds(bounds);
    return lineArr;
}

    const selectType = (type: number) => {
       
      if(type == 1){
        return {
          strokeWeight: 5,
          strokeColor: "#fffb00",
          strokeOpacity:0.7,
          strokeStyle: "solid"
        };
      }
      else if(type == 2){
        return{
          strokeWeight: 5,
          strokeColor: "#37b42d",
          strokeOpacity:0.7,
          strokeStyle: "solid"
        }
      }
      else{
        return {
          strokeColor: "#f368d9",
          strokeWeight: 5,
        }
      }
    }

    
    useEffect(() => {
        (async () => {
            const data = await (await fetch(url)).json();
            setApiData(data);  
            if(data){
              callMapObjApiAJAX(data?.result?.path[0].info.mapObj); 
            }
        })()
    },[]);

    return (
    <>
      <Map
      center={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}
      style={{ width: "100%", height: "85vh" ,maxHeight:"100vh"}}
      id="map"
      ref={mapRef}
    >
      {laneData2.length !== 0 ? 
    laneData2.map((data: any, index:number) =>
    <Polyline key={index}
    path={drawPolyLine(data)}
    strokeColor={selectType(data.type).strokeColor}
    strokeWeight={5}
    />
    )
    :
    null  
    }
    {loadRecoil.map((load:IMarkers,index:number) => 
      <MapMarker key={index}
      position={{lat: parseFloat(load.y), lng: parseFloat(load.x)}}/>
    )}

      <MapMarker position={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}>
      </MapMarker>
    </Map>

    </>
    )
}

export default Road;