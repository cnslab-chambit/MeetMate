import { clickState, inputState, markerState, roadResultDataState, roadSearchResultState, searchState } from '@/atom/atoms';
import { useDrawPolyLine, useSelectType } from '@/custom-hook/mapBaseHook';
import { useEffect, useState } from 'react';
import { Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';
const ZoomCustem = () => {
  return (
    <>
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
    </>
  )
}
function CustemMap() {
  const [marker, setMarker] = useRecoilState(markerState)
  const [click] = useRecoilState(clickState)
  const [search] = useRecoilState(searchState)
  const [laneData, setLaneData] = useRecoilState(roadResultDataState);
  const [roadSearchResult, setRoadSearchResult] = useRecoilState(roadSearchResultState)
  const { start_point, end_point } = search
  useEffect(() => {
    if (click == 1) {
      setMarker({
        lat: +start_point.lat,
        lng: +start_point.lng,
        img: start_point.img
      })
    }
    if (click == 2) {
      setMarker({
        lat: +end_point.lat,
        lng: +end_point.lng,
        img: end_point.img
      })
    }
  }, [search])
  console.log(marker, search, laneData)
  return (
    roadSearchResult ? (
      <>
        <Map
          center={{ lat: ((+search.start_point.lat) + (+search.end_point.lat)) / 2, lng: ((+search.start_point.lng) + (+search.end_point.lng)) / 2 }}
          style={{ width: "100vw", height: "100vh" }}
          level={8}
        >
          <ZoomCustem />
          {roadSearchResult ? (
            laneData.length !== 0 ?
              laneData.map((data: any, index: number) =>
                <>
                  <Polyline key={index * 2}
                    path={useDrawPolyLine(data)}
                    strokeColor={useSelectType(data.class, data.type)}
                    strokeWeight={7}
                    strokeOpacity={0.8}
                  />
                  <Polyline key={index * 2 - 1}
                    path={useDrawPolyLine(data)}
                    strokeColor='#ffffff'
                    strokeWeight={2}
                    strokeStyle='dash'
                    strokeOpacity={1}
                  />
                </>
              )
              :
              null
          ) : (null)}

          <MapMarker position={{ lat: +search.start_point.lat, lng: +search.start_point.lng }}
            image={{
              src: `${search.start_point.img}`,
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>

          <MapMarker position={{ lat: +search.end_point.lat, lng: +search.end_point.lng }}
            image={{
              src: `${search.end_point.img}`,
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>

        </Map>
      </>
    ) : (
      <>
        <Map
          center={{ lat: marker.lat, lng: marker.lng }}
          style={{ width: "100%", height: "100vh" }}
        >
          <ZoomCustem />

          <MapMarker position={{ lat: marker.lat, lng: marker.lng }}
            image={{
              src: `${marker.img}`,
              size: {
                width: 55,
                height: 55,
              },
            }} >
          </MapMarker>
        </Map>
      </>
    )
  )
}

export default CustemMap;
