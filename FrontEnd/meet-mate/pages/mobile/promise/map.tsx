import { IMarkers, IStore, loadAtom, mapAtom, promiseState, storeState, trafficState } from "@/mobile-content/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Map, MapMarker, Polygon, Polyline, ZoomControl,RoadviewInfoWindow } from 'react-kakao-maps-sdk';
import { selectType } from "@/mobile-hook/select-color";
import { callApi } from "@/mobile-content/fx";
import { ButtonContainer, InfoDiv, MapConatiner, SelectButton, ToggleButton, ToggleContainer, ToggleMenuDiv } from "@/m-styled-component/promise-component/promise_styled";
import Shopping from "../../../public/images/shoppingbag.svg";
import Food from "../../../public/images/food.svg";
import Mug from "../../../public/images/mug.svg";
import Camera from "../../../public/images/camera.svg";
import Bike from "../../../public/images/bike.svg";
import Menu from "../../../public/images/menu.svg";
import Info from "@/mobile-content/Info";
import Start from "../../../public/images/start.svg";

function PromiseMap() {
    const [map, setMap] = useState<any>()
    const [storeRecoil, setStoreRecoil] = useRecoilState<IStore[]>(storeState);
    const [buttonIndex, setButtonIndex] = useState(-1);
    const [startPoint, setStartPoint] = useState<any>([]);
    const [toggle, setToggle] = useState(false);
    const [center, setCetner] = useState<any>([]);
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
      setCetner({lat: y, lng: x});
      return {x: x, y: y};
    };
  
    const getPolyLine = () => {
      for(let i = 0; i < promiseLocation.length; i++){
        setStartPoint((prev: any) => [...prev,{lat: parseFloat(promiseLocation[i].y), lng: parseFloat(promiseLocation[i].x)}]);
      }
    };

    const setBound = (center:any) => {
      if(map && !toggle){      
      bounds = new kakao.maps.LatLngBounds();
      for(let i = 0; i < promiseLocation.length; i++){
        bounds?.extend(new kakao.maps.LatLng(parseFloat(promiseLocation[i]?.y),parseFloat(promiseLocation[i]?.x)))
      }
      map?.setBounds(bounds)
      }      
      else if(map && toggle){
        bounds = new kakao.maps.LatLngBounds();
        bounds?.extend(new kakao.maps.LatLng(parseFloat(center.y), parseFloat(center.x)));
        map?.setBounds(bounds);
      }
    };

    const buttonClick = (num: number) => {
      if(num === buttonIndex){
        setButtonIndex((prev) => -1);
      }
      else{
      setButtonIndex((prev) => num);
      }
    };

    const setMarkerUrl = (category: any) => {
      if(category === "대형마트") return "/images/shopping.svg";
      else if(category === "문화시설") return "/images/activity.svg";
      else if(category === "관광명소") return "/images/travel.svg";
      else if(category === "음식점") return "/images/foodPlace.svg";
      else if(category === "카페") return "/images/cafe.svg";
      return "";
    }

    useEffect(() => {
      const center = getCenterPosition();
      const fetchData = async () => {
        const response = await callApi(center);
        setStoreRecoil(response);
      };
      fetchData();
      getPolyLine();
      setBound(center);
    }, [map]);

    useEffect(() => {
      const center = getCenterPosition();
      setBound(center);
    },[toggle]);
    console.log(storeRecoil);
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
          storeRecoil?.map((element: any) => (
            element.searchList.map((store: any) =>(
              <MapMarker key={store.id}
              position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}
              image={{
                src: setMarkerUrl(element.category_name),
                size: {
                  width: 42,
                  height: 45,
                },
              }}
                />
            ))
          ))
        : (
          storeRecoil[buttonIndex]?.searchList.map((store) => (
            <MapMarker key={store.id}
            position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}
            image={{
              src: setMarkerUrl(storeRecoil[buttonIndex].category_name),
              size: {
                width: 42,
                height: 45,
              },
            }}/>
          ))
        )
        }

          {promiseLocation?.map((location: any) => (
            <MapMarker key={location.id}
            position={{lat: parseFloat(location.y), lng: parseFloat(location.x)}}
            image={{
              src: "/images/start.svg",
              size: {
                width: 64,
                height: 69,
              },
            }}
            />
          ))}

            <MapMarker
            position={center}
            image={{
              src: "/images/end.svg",
              size: {
                width: 64,
                height: 69,
              },
            }}
            zIndex={2}
            />

          {promiseLocation ?
          <Polygon
          path={startPoint}
          fillColor={"#39DE2A"}
          strokeWeight={3}
          strokeColor={"#39DE2A"} 
          strokeOpacity={0.8}
          />
          :
          null
          }
          
      </Map>

      <ButtonContainer>
              <SelectButton onClick={() => buttonClick(0)} active={buttonIndex === 0}>
                <Shopping/>
                대형마트
              </SelectButton>
              <SelectButton onClick={() => buttonClick(1)}  active={buttonIndex === 1}>
                <Bike/>
                문화시설
              </SelectButton>
              <SelectButton onClick={() => buttonClick(2)}  active={buttonIndex === 2}>
                <Camera/>
                관광명소
              </SelectButton>
              <SelectButton onClick={() => buttonClick(3)}  active={buttonIndex === 3}>
                <Food/>
                음식점
              </SelectButton>
              <SelectButton onClick={() => buttonClick(4)}  active={buttonIndex === 4}>
                <Mug/>
                카 페
              </SelectButton>
      </ButtonContainer>
      
      <ToggleContainer visible={toggle}>
          <ToggleButton onClick={() => setToggle((prev) => !prev)}>
            {toggle ? 
            <ToggleMenuDiv>목록 접기</ToggleMenuDiv> :
            <ToggleMenuDiv>
              <Menu/>
              목록
            </ToggleMenuDiv>
            }
          </ToggleButton>
          {toggle ?
              <Info buttonIndex={buttonIndex}/>
            :
            null
        }
      </ToggleContainer>



    </MapConatiner>
  </div>
    )
}

export default PromiseMap;