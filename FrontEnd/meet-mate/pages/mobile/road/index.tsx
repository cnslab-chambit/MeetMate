import { IEachLocation, locationAtom, mapAtom } from "@/mobile-content/atom";
import { type } from "os";
import { useEffect, useRef, useState } from "react";
import { Map,MapMarker,Polyline} from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue } from "recoil";

interface ISubPath{
  distance: number;
  x: number;
  y: number;
}

interface ILoad{
  result:{
    path:{
      subPath:ISubPath[]
    }
  }
}


function Road() {
    const [apiData, setApiData] = useState<any>();
    const [locationRecoil, setLocationRecoil] = useRecoilState<IEachLocation[]>(locationAtom);
    const [laneData, setLaneData] = useState<any | null>([]);
    const mapRecoil = useRecoilValue(mapAtom);
    const laneRef: any = useRef({type: null, LntLng:{lat: null, lng: null}});
    let lineArr = new Array();
    let typeArr = new Array();
    let linetotal = new Array();
    // let xhr = new XMLHttpRequest();
    let sx = 127.058270608867;
    let sy = 37.6192404638865;
    let ex = 126.9145430;
    let ey = 37.5499421;
	let url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
	// xhr.open("GET", url, true);
	// xhr.send();
	// xhr.onreadystatechange = function() {
	// 	if (xhr.readyState == 4 && xhr.status == 200) {
	// 		console.log( xhr.responseText ); // <- xhr.responseText 로 결과를 가져올 수 있음
	// 	}
	// }

  const fillData = () => {
    const refer = apiData?.result.path[0].subPath;
    for(let i = 0; i < refer?.length; i++){
      
    }
    // setLocationRecoil((prev) => [...prev,{
      // id: 1,
      // loaction: ,
      // place_name: string;
      // x: string;
      // y: string;

    // }])
  }


  
  const callMapObjApiAJAX = (mapObj: string) => {
    const url = `https://api.odsay.com/v1/api/loadLane?mapObject=0:0@${mapObj}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
    (async () => {
        const data = await (await fetch(url)).json();
        console.log(data);
        if(data){
        drawPolyLine(data);
      }
    })()
};
const drawPolyLine = (data: any) => {
  for(let i = 0 ; i < data?.result?.lane.length; i++){
    let lineArray;
    for(let j=0 ; j <data?.result?.lane[i].section.length; j++){
      lineArray = null;      
      lineArray = new Array();
      for(let k = 0; k < data?.result?.lane[i].section[j].graphPos.length; k++){
        lineArray.push(new kakao.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
        setLaneData((prev: any) => [...prev,{type:data.result.lane[i].type,LatLng:{lat: data.result.lane[i].section[j].graphPos[k].y, lng: data.result.lane[i].section[j].graphPos[k].x}}])
      }   //위 코드에 배열 형태가 아닌 객체 형태로 넣어 주면 되는거자낭
    }
  }
}

    const selectLatnLng = (data: any) => {
      for(let i = 0; i < data.length; i++){
        lineArr.push({lat: data[i].LatLng.lat, lng: data[i].LatLng.lng});
        typeArr.push(data[i].type);
      }
      return lineArr;
    }

    const selectType = (type: number) => {
       
      if(type == 1){
        return {
          strokeWeight: 5,
          strokeColor: "#FFAE00",
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
    >
      
      
      {laneData.length !== 0 ?
      <Polyline
      path={selectLatnLng(laneData)}
      strokeWeight={3} // 선의 두께입니다
      strokeColor={selectType(laneData).strokeColor} // 선의 색깔입니다
      strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      strokeStyle={"solid"} 
      />
    : (null)
    }
      
      {/* <>
      <MapMarker  
      position={laneData[0]}
      ></MapMarker>
      <MapMarker
      position={laneData[laneData.length -1]} 
      ></MapMarker> 
      </> */}

      <MapMarker position={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}>
      </MapMarker>
    </Map>

    </>
    )
}

export default Road;