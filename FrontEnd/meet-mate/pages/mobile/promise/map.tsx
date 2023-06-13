import { IMarkers, IStore, loadAtom, mapAtom, promiseState, storeState, trafficState } from "@/mobile-content/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Map, MapMarker, Polygon, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';
import { selectType } from "@/mobile-hook/select-color";
import { callApi, callMapObjApiAJAX, drawPolyLine, findPlaceRoute, setMarkerUrl } from "@/mobile-content/fx";
import { BackButton, ButtonContainer, DecisionDiv, InfoDiv, MapConatiner, SelectButton, StoreInfoDiv, StoreName, ToggleButton, ToggleContainer, ToggleMenuDiv } from "@/m-styled-component/promise-component/promise_styled";
import Shopping from "../../../public/images/shoppingbag.svg";
import Food from "../../../public/images/food.svg";
import Mug from "../../../public/images/mug.svg";
import Camera from "../../../public/images/camera.svg";
import Bike from "../../../public/images/bike.svg";
import Menu from "../../../public/images/menu.svg";
import Info from "@/mobile-content/promise/Info";
import Start from "../../../public/images/start.svg";
import Route from "@/mobile-content/Route";

function PromiseMap() {
    const [map, setMap] = useState<any>()
    const [placeRoute, setPlaceRoute] = useState<any>([]);
    const [storeRecoil, setStoreRecoil] = useRecoilState<IStore[]>(storeState);
    const [buttonIndex, setButtonIndex] = useState(-1);
    const [startPoint, setStartPoint] = useState<any>([]);
    const [toggle, setToggle] = useState(false);
    const [center, setCetner] = useState<any>([]);
    const [info, setInfo] = useState<any>();
    const [clickedRoad, setClickedRoad] = useState(false);
    const [polyline,setPolyLine] = useState<any>([]);
    const promiseLocation = useRecoilValue<IMarkers[]>(promiseState);
    const color = ["#a5e495", "#95b3e7","#eb9191","#bc83fd","#A9E1ED","#d6f3ad"];
    let linArr: any = [];
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
      if(startPoint.length > 0) return;
      for(let i = 0; i < promiseLocation.length; i++){
        setStartPoint((prev: any) => [...prev,{lat: parseFloat(promiseLocation[i].y), lng: parseFloat(promiseLocation[i].x)}]);
      }
      setStartPoint((prev: any) => [...prev, {lat: parseFloat(promiseLocation[0].y), lng: parseFloat(promiseLocation[0].x)}])
    };

    const setBound = (center:any) => {
      if(map && !toggle){      
      let bounds = new kakao.maps.LatLngBounds();
      for(let i = 0; i < promiseLocation.length; i++){
        bounds?.extend(new kakao.maps.LatLng(parseFloat(promiseLocation[i]?.y),parseFloat(promiseLocation[i]?.x)))
      }
      map?.setBounds(bounds)
      }      
      else if(map && toggle){
        let bounds = new kakao.maps.LatLngBounds();
        bounds?.extend(new kakao.maps.LatLng(parseFloat(center.y), parseFloat(center.x)));
        map?.setBounds(bounds);
      }
    };

    const setRoadBound = (center:any) => {
      if(map){      
      let bounds = new kakao.maps.LatLngBounds();
      for(let i = 0; i < promiseLocation.length; i++){
        bounds?.extend(new kakao.maps.LatLng(parseFloat(promiseLocation[i]?.y),parseFloat(promiseLocation[i]?.x)))
      }
      map?.setBounds(bounds)
      setToggle((prev: boolean) => !prev);
    }
    };

    const divSetBound = (store :any) => {
      let bounds = new kakao.maps.LatLngBounds();
      bounds?.extend(new kakao.maps.LatLng(parseFloat(store.y) - 0.0005,parseFloat(store.x)))      
      map.setBounds(bounds);
    };

    const buttonClick = (num: number) => {
      if(num === buttonIndex){
        setButtonIndex((prev) => -1);
      }
      else{
      setButtonIndex((prev) => num);
      }
    };

    const toggleClick = () => {
      if(toggle === true){
        setClickedRoad(true);
      }
      else{
        setClickedRoad(false);
      }
      setToggle((prev) => !prev);
      setInfo("");
    }

    const clickFindRoad = async(store: any) => {
      setClickedRoad((prev: boolean) => false);
      setPlaceRoute([]);
      const promises = promiseLocation.map(async (location) => {
      const result = await findPlaceRoute([location], store, setPlaceRoute);
      console.log(result);
      return result;
  });

      const placeRoutes = await Promise.all(promises);

      for (let i = 0; i < promiseLocation.length; i++) {
        const response = await callMapObjApiAJAX(placeRoutes[i]?.result.path[0].info.mapObj);
        if (response) {
          const arr = await drawPolyLine(response.result.lane);
          setPolyLine((prev: any[]) => [...prev, arr]);
        }
    }

  const center = getCenterPosition();
  setRoadBound(center);
  };

    useEffect(() => {
      if(map){
      const center = getCenterPosition();
      const fetchData = async () => {
        const response = await callApi(center);
        setStoreRecoil(response);
      };
      fetchData();
      getPolyLine();
      setBound(center);
    }
    }, [map]);

    useEffect(() => {
      const center = getCenterPosition();
      setBound(center);
    },[toggle]);

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
              <div key={store.id}>
              <MapMarker
              position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}
              image={{
                src: setMarkerUrl(element.category_name),
                size: {
                  width: 42,
                  height: 45,
                },
              }}
              onClick={() => setInfo(store.place_name)}
                >
                </MapMarker>
                {info && info === store.place_name && (
                  <CustomOverlayMap
                  position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}
                  yAnchor={1.8}
                  zIndex={3}
                  >
                    <StoreInfoDiv>
                      <StoreName>
                        {store.place_name}
                      </StoreName>
                      <DecisionDiv onClick={() => clickFindRoad(store)}>
                        길 찾기
                      </DecisionDiv>
                      <BackButton onClick={() => setInfo("")}>x</BackButton>
                    </StoreInfoDiv>
                  </CustomOverlayMap>
                )}
                </div>
            ))
          ))
        : (
          storeRecoil[buttonIndex]?.searchList.map((store) => (
            <div key={store.id}>
            <MapMarker
            position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}
            image={{
              src: setMarkerUrl(storeRecoil[buttonIndex].category_name),
              size: {
                width: 42,
                height: 45,
              },
            }}
            onClick={() => setInfo(store.place_name)}
            >
              </MapMarker>
              {info && info === store.place_name && (
                <CustomOverlayMap
                position={{lat: parseFloat(store.y), lng: parseFloat(store.x)}}
                yAnchor={1.8}
                zIndex={3}>
                  <StoreInfoDiv>
                      <StoreName>
                        {store.place_name}
                      </StoreName>
                      <DecisionDiv>
                        길 찾기
                      </DecisionDiv>
                      <BackButton onClick={() => setInfo("")}>x</BackButton>
                    </StoreInfoDiv>  
                </CustomOverlayMap>
              )}
              </div>
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

          {/* {promiseLocation ?
          <Polygon
          path={startPoint}
          fillColor={"#f87b87"}
          strokeWeight={3}
          strokeColor={"#FF4154"} 
          strokeOpacity={0.8}
          fillOpacity={0.15}
          />
          :
          null
          } */}

          {center ?
            startPoint.slice(0,startPoint.length -1).map((point: any, index: number) => (
              <Polygon 
              key={index}
              path={[center, startPoint[index], startPoint[index + 1]]}
              fillColor={"#f87b87"}
              fillOpacity={0.2}
              strokeOpacity={0}
              />
            ))
            :
            null
          }

          
          {polyline.length > 0 ? 
          polyline.map((line: any,index: number) => (
            <div key={index+40}>
            <Polyline
            key={index + 10}
            path={line}
            strokeColor={color[index % 6]}
            strokeWeight={8}
            strokeOpacity={1}
            />
            <Polyline
            key={index + 0}
            path={line}
            strokeColor="white"
            strokeStyle="dash"
            strokeWeight={2}
            strokeOpacity={1}
            />
            </div>
          ))
            :
            null}
          
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
        
      
          <ToggleButton onClick={toggleClick}>
            {toggle ? 
            <ToggleMenuDiv>목록 접기</ToggleMenuDiv> :
            <ToggleMenuDiv>
              <Menu/>
              목록
            </ToggleMenuDiv>
            }
          </ToggleButton>
          {toggle ?
              <Info buttonIndex={buttonIndex} placeRoute={placeRoute} setInfo={setInfo} divSetBound={divSetBound} clickedRoad={clickedRoad}/>
            :
            <Route placeRoute={placeRoute}/>
          }
      </ToggleContainer>
    </MapConatiner>
  </div>
    )
}

export default PromiseMap;