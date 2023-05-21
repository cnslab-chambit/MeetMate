import { IMarkers, IStore, loadAtom, mapAtom, promiseState, storeState, trafficState } from "@/mobile-content/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Map, MapMarker, Polygon, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import { selectType } from "@/mobile-hook/select-color";
import { callApi } from "@/mobile-content/fx";
import { ButtonContainer, MapConatiner, SelectButton } from "@/m-styled-component/promise-component/promise_styled";
import Shopping from "../../../public/images/shoppingbag.svg";
import Food from "../../../public/images/food.svg";
import Mug from "../../../public/images/mug.svg";
import Camera from "../../../public/images/camera.svg";
import Bike from "../../../public/images/bike.svg";


function PromiseMap() {
    const [map, setMap] = useState<any>()
    const [storeRecoil, setStoreRecoil] = useRecoilState<IStore[]>(storeState);
    const [buttonIndex, setButtonIndex] = useState(-1);
    const [startPoint, setStartPoint] = useState<any>([]);
    const promiseLocation = useRecoilValue<IMarkers[]>(promiseState);
    let bounds;
    const getCenterPosition = () => {
      let x = 0;
      let y = 0;
      for(let i = 0; i < promiseLocation.length; i++){
        x += parseFloat(promiseLocation[i].x);
        y += parseFloat(promiseLocation[i].y);
      }
      x /= promiseLocation.length;
      y /= promiseLocation.length;
      return {x: x, y: y};
    };
  
    const getPolyLine = () => {
      for(let i = 0; i < promiseLocation.length; i++){
        setStartPoint((prev: any) => [...prev,{lat: parseFloat(promiseLocation[i].y), lng: parseFloat(promiseLocation[i].x)}]);
      }
      console.log(startPoint);
    };

    const setBound = () => {
      if(map){      
      bounds = new kakao.maps.LatLngBounds();
      for(let i = 0; i < promiseLocation.length; i++){
        bounds?.extend(new kakao.maps.LatLng(parseFloat(promiseLocation[i]?.y),parseFloat(promiseLocation[i]?.x)))
      }
      map?.setBounds(bounds)
    };      
    }

    const buttonClick = (num: number) => {
      setButtonIndex((prev) => num);
    };

    useEffect(() => {
      const center = getCenterPosition();
      const fetchData = async () => {
        const response = await callApi(center);
        setStoreRecoil(response);
      };
      fetchData();
      getPolyLine();
      setBound();
    }, [map]);
    
    return (
    <div>
      <MapConatiner>
        <Map
        center={{ lat: parseFloat("37.617136272655"), lng: parseFloat("127.048656761384") }}
        style={{ width: "100%", height: "100%" }}
        onCreate={setMap}
        >
          {/* {storeRecoil[3]?.searchList.map((store) => (
            <MapMarker key={store.id}
            position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}/>
          ))} */}
          
          { buttonIndex === -1 ?
          storeRecoil.map((element: any) => (
            element.searchList.map((store: any) =>(
              <MapMarker key={store.id}
              position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}/>
            ))
          ))
        : (
          storeRecoil[buttonIndex]?.searchList.map((store) => (
            <MapMarker key={store.id}
            position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}/>
          ))
        )
        }

          {promiseLocation?.map((location: any) => (
            <MapMarker key={location.id}
            position={{lat: parseFloat(location.y), lng: parseFloat(location.x)}}/>
          ))}

          {promiseLocation ?
          <Polygon
          path={startPoint}
          strokeWeight={3}
          strokeColor={"#39DE2A"} 
          strokeOpacity={0.8} 
          fillColor={"#A2FF99"}
          fillOpacity={0.7}
          />
          :
          null
          }
          
      </Map>

      <ButtonContainer>
              <SelectButton onClick={() => buttonClick(0)}>
                <Shopping/>
                대형마트
              </SelectButton>
              <SelectButton onClick={() => buttonClick(1)}>
                <Bike/>
                문화시설
              </SelectButton>
              <SelectButton onClick={() => buttonClick(2)}>
                <Camera/>
                관광명소
              </SelectButton>
              <SelectButton onClick={() => buttonClick(3)}>
                <Food/>
                음식점
              </SelectButton>
              <SelectButton onClick={() => buttonClick(4)}>
                <Mug/>
                카 페
              </SelectButton>
      </ButtonContainer>
    </MapConatiner>
  </div>
    )
}

export default PromiseMap;