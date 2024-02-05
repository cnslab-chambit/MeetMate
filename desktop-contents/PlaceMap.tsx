import { multiroadSearchApi, roadLineApi } from '@/apis/apiStorage';
import { CoordinatesBoxState, coordinateDataState, placeCoordinateState, placeIdState, placeResultDataState, placeSearchResultState, roadPlaceCenterState, roadPlaceState, roadSearchTypeState, searchState } from '@/atom/atoms';
import { ConvexHull } from '@/convex-hull/ConvexHull';
import { ZoomCustem } from '@/custom-hook/ZoomCustem';
import { useDrawPolyLine, useMultiDrawPolyLine, useMultiuSelectType, useSelectType } from '@/custom-hook/mapBaseHook';
import { MarKerLink, MarkerDiv, MarkerText } from '@/styled-component/coordinate-component/styled_coordinate';
import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, Polygon, Polyline, useMap } from 'react-kakao-maps-sdk';
import { useRecoilState, useRecoilValue } from 'recoil';

function PlaceMap() {
    const [placeCoordinate, setPlaceCoordinate] = useRecoilState(placeCoordinateState);
    const [laneData, setLaneData] = useRecoilState(placeResultDataState);
    const coordinateData = useRecoilValue(coordinateDataState);
    const type = useRecoilValue(roadSearchTypeState);
    const [typeImg, setTypeImg] = useState('/images/foodPlace.svg');
    const [placeId, setPlaceId] = useRecoilState(placeIdState);
    const [path, setPath] = useState<any>([]);
    const [pathMarker, setPathMarker] = useState<any>([]);
    const placeList = useRecoilValue(roadPlaceState);
    const [center, setCenter] = useRecoilState(roadPlaceCenterState);
    const [search, setSearch] = useRecoilState(searchState);
    const [roadSearchResult, setRoadSearchResult] = useRecoilState(placeSearchResultState);
    let newLat = 0;
    let newLng = 0;
    let cnt = 0;

    useEffect(() => {
        if (placeCoordinate[placeId]?.lat !== '') {
            const newPath = [];  // Initialize an empty array
            for (let obj of Object.values(placeCoordinate)) {
                if (obj?.lat === '' || obj?.lng === '') {
                    continue;
                }
                cnt += 1;
                newPath.push({ lat: obj?.lat, lng: obj?.lng });
                newLat += +obj?.lat;
                newLng += +obj?.lng;
            }
            setPath(ConvexHull(newPath));
            setPathMarker(newPath);
            setCenter({ ...center, ['lat']: newLat / cnt, ['lng']: newLng / cnt });
        }
    }, [placeCoordinate, setPath, setPathMarker, setCenter]);

    useEffect(() => {
        switch (true) {
            case type === '음식점':
                setTypeImg('/images/foodPlace.svg');
                break;
            case type === '카페':
                setTypeImg('/images/cafe.svg');
                break;
            case type === '대형마트':
                setTypeImg('/images/shopping.svg');
                break;
            case type === '문화시설':
                setTypeImg('/images/activity.svg');
                break;
            case type === '관광명소':
                setTypeImg('images/travel.svg');
                break;
            default:
                break;
        }
    }, [type]);

    const EventMarkerContainer = (e: any) => {
        const [isOpen, setIsOpen] = useState(false);
        const onClick = async (pathMarker: object, lat: string, lng: string) => {
            setRoadSearchResult(false);
            const data = await multiroadSearchApi({ pathMarker, lat, lng });
            const box = await Promise.all(
                data.map(async (e: any) => {
                    const data = async () => await roadLineApi(e?.result?.path[0]?.info?.mapObj);
                    return await data();
                })
            );
            setLaneData(box);
            setRoadSearchResult(true);
        };
        return (
            <>
                <MapMarker
                    position={{ lat: e?.element?.y, lng: e?.element?.x }}
                    image={{
                        src: e?.img,
                        size: {
                            width: 40,
                            height: 40,
                        },
                    }}
                    onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}
                />
                {isOpen ? (
                    <CustomOverlayMap position={{ lat: e?.element?.y, lng: e?.element?.x }} yAnchor={2}>
                        <MarkerDiv>
                            <MarkerText>{e?.element?.place_name}</MarkerText>
                            <MarKerLink onClick={() => onClick(pathMarker, e?.element?.y, e?.element?.x)}>길찾기</MarKerLink>
                        </MarkerDiv>
                    </CustomOverlayMap>
                ) : null}
            </>
        );
    };

    return (
        <>
            <Map
                center={center.lat ? center : { lat: 37.6192404638865, lng: 127.058270608867 }}
                style={{ width: '100%', height: '100vh' }}
                level={placeList ? 1 : 8}
            >
                {Object.entries(pathMarker).map(([id, { lat, lng }]) => (
                    <MapMarker
                        key={id}
                        position={{ lat, lng }}
                        image={{
                            src: '/images/start.svg',
                            size: {
                                width: 40,
                                height: 40,
                            },
                        }}
                    />
                ))}
                {center ? (
                    <MapMarker
                        position={center}
                        image={{
                            src: '/images/middle.svg',
                            size: {
                                width: 50,
                                height: 50,
                            },
                        }}
                    />
                ) : null}
                {placeList ? (
                    coordinateData.map((info: any, index: number) => {
                        if (type === info.category_name) {
                            return info?.searchList?.map((e: any) => (
                                <EventMarkerContainer element={e} img={typeImg} />
                            ));
                        }
                    })
                ) : null}
                <Polygon
                    path={path}
                    strokeWeight={2}
                    fillColor="#f87b87"
                    fillOpacity={0.5}
                    strokeOpacity={path.length > 2 ? 0 : 1}
                />
                {roadSearchResult && laneData.length !== 0
                    ? laneData.map((data: any, index: number) =>
                        data.map((e: any) => (
                            <>
                                <Polyline
                                    key={index * 2}
                                    path={useDrawPolyLine(e)}
                                    strokeColor={useSelectType(e.class, e.type)}
                                    strokeWeight={7}
                                    strokeOpacity={0.8}
                                />
                                <Polyline
                                    key={index * 2 - 1}
                                    path={useDrawPolyLine(e)}
                                    strokeColor="#ffffff"
                                    strokeWeight={2}
                                    strokeStyle="dash"
                                    strokeOpacity={1}
                                />
                            </>
                        ))
                    )
                    : null}
            </Map>
        </>
    );
}

export default PlaceMap;
