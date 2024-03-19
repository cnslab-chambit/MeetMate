"use client";
import {
  IMarkers,
  IStore,
  promiseState,
  storeState,
} from "@/src/app/_atom/atom";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Polygon, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import {
  callApi,
  callMapObjApiAJAX,
  drawPolyLine,
  findPlaceRoute,
  setMarkerUrl,
} from "@/src/app/_utils/fx";
import styles from "./_component/map.module.css";
import Shopping from "@/public/images/shoppingbag.svg";
import Food from "@/public/images/food.svg";
import Mug from "@/public/images/mug.svg";
import Camera from "@/public/images/camera.svg";
import Bike from "@/public/images/bike.svg";
import Menu from "@/public/images/menu.svg";
import Route from "@/src/app/(afterLogin)/@map/(.)promise/map/_component/PromiseSlider";
import CategoryButton from "./_component/CategoryButton";
import KakaoMap from "@/src/app/_component/Map/KakaoMap";
import KakaoMarker from "@/src/app/_component/Map/KakaoMarker";
import Button from "@/src/app/_component/Map/Button/Button";
import Info from "./_component/Info";

function PromiseMap() {
  const [map, setMap] = useState<any>();
  const [placeRoute, setPlaceRoute] = useState<any>([]);
  const [storeRecoil, setStoreRecoil] = useRecoilState<IStore[]>(storeState);
  const [buttonIndex, setButtonIndex] = useState(-1);
  const [startPoint, setStartPoint] = useState<any>([]);
  const [toggle, setToggle] = useState(false);
  const [center, setCetner] = useState<any>([]);
  const [info, setInfo] = useState<any>();
  const [clickedRoad, setClickedRoad] = useState(false);
  const [polyline, setPolyLine] = useState<any>([]);
  const promiseLocation = useRecoilValue<IMarkers[]>(promiseState);
  const color = [
    "#a5e495",
    "#95b3e7",
    "#eb9191",
    "#bc83fd",
    "#A9E1ED",
    "#d6f3ad",
  ];
  let linArr: any = [];
  const getCenterPosition = () => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < promiseLocation.length; i++) {
      x += parseFloat(promiseLocation[i].x);
      y += parseFloat(promiseLocation[i].y);
    }
    x /= promiseLocation.length;
    y /= promiseLocation.length;
    setCetner({ lat: y, lng: x });
    return { x: x, y: y };
  };

  const getPolyLine = () => {
    if (startPoint.length > 0) return;
    for (let i = 0; i < promiseLocation.length; i++) {
      setStartPoint((prev: any) => [
        ...prev,
        {
          lat: parseFloat(promiseLocation[i].y),
          lng: parseFloat(promiseLocation[i].x),
        },
      ]);
    }
    setStartPoint((prev: any) => [
      ...prev,
      {
        lat: parseFloat(promiseLocation[0].y),
        lng: parseFloat(promiseLocation[0].x),
      },
    ]);
  };

  const setBound = (center: any) => {
    if (map && !toggle && clickedRoad) {
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < promiseLocation.length; i++) {
        bounds?.extend(
          new kakao.maps.LatLng(
            parseFloat(promiseLocation[i]?.y),
            parseFloat(promiseLocation[i]?.x)
          )
        );
      }
      map?.setBounds(bounds);
    } else if (map && toggle && !clickedRoad) {
      let bounds = new kakao.maps.LatLngBounds();
      bounds?.extend(
        new kakao.maps.LatLng(parseFloat(center.y), parseFloat(center.x))
      );
      map?.setBounds(bounds);
    } else if (map && !toggle) {
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < promiseLocation.length; i++) {
        bounds?.extend(
          new kakao.maps.LatLng(
            parseFloat(promiseLocation[i]?.y),
            parseFloat(promiseLocation[i]?.x)
          )
        );
      }
      map?.setBounds(bounds);
    }
  };

  const setRoadBound = (center: any) => {
    if (map) {
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < promiseLocation.length; i++) {
        bounds?.extend(
          new kakao.maps.LatLng(
            parseFloat(promiseLocation[i]?.y),
            parseFloat(promiseLocation[i]?.x)
          )
        );
      }
      map?.setBounds(bounds);
      setToggle((prev: boolean) => !prev);
    }
  };

  const divSetBound = (store: any) => {
    let bounds = new kakao.maps.LatLngBounds();
    bounds?.extend(
      new kakao.maps.LatLng(parseFloat(store.y) - 0.0005, parseFloat(store.x))
    );
    map.setBounds(bounds);
  };

  const buttonClick = (num: number) => {
    console.log("hi");
    if (num === buttonIndex) {
      setButtonIndex((prev) => -1);
    } else {
      setButtonIndex((prev) => num);
    }
  };

  const toggleClick = () => {
    setToggle((prev) => !prev);
    setInfo("");
  };

  const roadToggleClick = () => {
    setClickedRoad((prev: boolean) => !prev);
  };

  const clickFindRoad = async (store: any) => {
    setPlaceRoute([]);
    const promises = promiseLocation.map(async (location) => {
      const result = await findPlaceRoute([location], store, setPlaceRoute);
      setClickedRoad((prev: boolean) => true);
      return result;
    });

    const placeRoutes = await Promise.all(promises);

    for (let i = 0; i < promiseLocation.length; i++) {
      const response = await callMapObjApiAJAX(
        placeRoutes[i]?.result.path[0].info.mapObj
      );
      if (response) {
        const arr = await drawPolyLine(response.result.lane);
        setPolyLine((prev: any[]) => [...prev, arr]);
      }
    }

    const center = getCenterPosition();
    setRoadBound(center);
  };

  useEffect(() => {
    if (map) {
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
  }, [toggle]);

  console.log(clickedRoad);

  return (
    <div className={styles.mapContainer}>
      <KakaoMap y="37.617136272655" x="127.048656761384" onCreate={setMap}>
        {buttonIndex === -1
          ? storeRecoil?.map((element: any) =>
              element.searchList.map((store: any) => (
                <div key={store.id}>
                  <KakaoMarker
                    x={store.x}
                    y={store.y}
                    src={setMarkerUrl(element.category_name)}
                    width={42}
                    height={45}
                    onClick={() => setInfo(store.place_name)}
                  />
                  {info && info === store.place_name && (
                    <CustomOverlayMap
                      position={{
                        lat: parseFloat(store.y),
                        lng: parseFloat(store.x),
                      }}
                      yAnchor={1.8}
                      zIndex={3}
                    >
                      <div className={styles.storeInfoDiv}>
                        <div className={styles.storeName}>
                          {store.place_name}
                        </div>
                        <div
                          className={styles.decisionDiv}
                          onClick={() => clickFindRoad(store)}
                        >
                          루트 찾기
                        </div>
                        <div
                          className={styles.backButton}
                          onClick={() => setInfo("")}
                        >
                          x
                        </div>
                      </div>
                    </CustomOverlayMap>
                  )}
                </div>
              ))
            )
          : storeRecoil[buttonIndex]?.searchList.map((store) => (
              <div key={store.id}>
                <KakaoMarker
                  x={store.x}
                  y={store.y}
                  src={setMarkerUrl(storeRecoil[buttonIndex].category_name)}
                  width={42}
                  height={45}
                  onClick={() => setInfo(store.place_name)}
                />
                {info && info === store.place_name && (
                  <CustomOverlayMap
                    position={{
                      lat: parseFloat(store.y),
                      lng: parseFloat(store.x),
                    }}
                    yAnchor={1.8}
                    zIndex={3}
                  >
                    <div className={styles.storeInfoDiv}>
                      <div className={styles.storeName}>{store.place_name}</div>
                      <div className={styles.decisionDiv}>길 찾기</div>
                      <div
                        className={styles.backButton}
                        onClick={() => setInfo("")}
                      >
                        x
                      </div>
                    </div>
                  </CustomOverlayMap>
                )}
              </div>
            ))}

        {promiseLocation?.map((location: any) => (
          <KakaoMarker
            key={location.id}
            x={location.x}
            y={location.y}
            width={64}
            height={64}
            src="/images/start.svg"
          />
        ))}

        <KakaoMarker
          x={center.x}
          y={center.y}
          width={64}
          height={69}
          src="/images/end.svg"
        />

        {center
          ? startPoint
              .slice(0, startPoint.length - 1)
              .map((point: any, index: number) => (
                <Polygon
                  key={index}
                  path={[center, startPoint[index], startPoint[index + 1]]}
                  fillColor={"#f87b87"}
                  fillOpacity={0.2}
                  strokeOpacity={0}
                />
              ))
          : null}

        {polyline.length > 0
          ? polyline.map((line: any, index: number) => (
              <div key={index + 40}>
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
          : null}
      </KakaoMap>

      <div className={styles.buttonContainer}>
        <div
          onClick={() => buttonClick(0)}
          className={cx(styles.nonActived, buttonIndex === 0 && styles.clicked)}
        >
          <Shopping />
          대형마트
        </div>
        <div
          onClick={() => buttonClick(1)}
          className={cx(styles.nonActived, buttonIndex === 1 && styles.clicked)}
        >
          <Bike />
          문화시설
        </div>
        <div
          onClick={() => buttonClick(2)}
          className={cx(styles.nonActived, buttonIndex === 2 && styles.clicked)}
        >
          <Camera />
          관광명소
        </div>
        <div
          onClick={() => buttonClick(3)}
          className={cx(styles.nonActived, buttonIndex === 3 && styles.clicked)}
        >
          <Food />
          음식점
        </div>
        <div
          onClick={() => buttonClick(4)}
          className={cx(styles.nonActived, buttonIndex === 4 && styles.clicked)}
        >
          <Mug />카 페
        </div>
      </div>

      <div
        className={cx(styles.toggleContainer, toggle && styles.visibleToggle)}
      >
        <div className={styles.toggleButtonDiv}>
          <div onClick={toggleClick} className={styles.toggleButton}>
            {toggle ? (
              <div className={styles.toggleMenuDiv}>목록 접기</div>
            ) : (
              <div className={styles.toggleMenuDiv}>
                <Menu />
                목록
              </div>
            )}
          </div>
          {toggle && placeRoute.length && (
            <div
              className={cx(clickedRoad ? styles.actived : styles.toggleButton)}
              onClick={roadToggleClick}
            >
              길 찾기
            </div>
          )}
        </div>
        {toggle && !clickedRoad ? (
          <Info
            buttonIndex={buttonIndex}
            placeRoute={placeRoute}
            setInfo={setInfo}
            divSetBound={divSetBound}
            clickedRoad={clickedRoad}
          />
        ) : (
          toggle &&
          clickedRoad && <Route placeRoute={placeRoute} colorArr={color} />
        )}
      </div>
    </div>
  );
}

export default PromiseMap;
