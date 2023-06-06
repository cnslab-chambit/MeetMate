import { CoordinatesBoxState, placeCoordinateState, placeIdState } from '@/atom/atoms'
import { ConvexHull } from '@/convex-hull/ConvexHull'
import { ZoomCustem } from '@/custom-hook/ZoomCustem'
import React, { useEffect, useState } from 'react'
import { Map, MapMarker, Polygon, Polyline } from 'react-kakao-maps-sdk'
import { useRecoilState } from 'recoil'

function PlaceMap() {

    const [placeCoordinate, setPlaceCoordinate] = useRecoilState(placeCoordinateState)
    const [placeId, setPlaceId] = useRecoilState(placeIdState)
    const [path, setPath] = useState<any>([])
    const [pathMarker, setPathMarker] = useState<any>([])
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0
    })
    let newLat = 0
    let newLng = 0
    let cnt = 0
    useEffect(() => {
        if (placeCoordinate[placeId]?.lat !== '') {
            const newPath = [];  // Initialize an empty array
            for (let obj of Object.values(placeCoordinate)) {
                if ((obj?.lat === '' || obj?.lng === '')) {
                    continue
                }
                cnt += 1
                newPath.push({ lat: obj?.lat, lng: obj?.lng })
                newLat += (+obj?.lat)
                newLng += (+obj?.lng)
                // newPath.push({ lat: newLat / cnt, lng: newLng / cnt })
            }
            setPath(ConvexHull(newPath))
            setPathMarker(newPath)
            setCenter({ ...center, ['lat']: newLat / cnt, ['lng']: newLng / cnt })
        }
    }, [placeCoordinate]);
    console.log(path, placeCoordinate)
    return (
        <>
            <Map

                center={center.lat ? (center) : ({ lat: 37.6192404638865, lng: 127.058270608867 })}
                style={{ width: "100%", height: "100vh" }}
                level={8}
            >
                <ZoomCustem />
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
                <Polygon
                    path={path}
                    strokeWeight={4}
                    fillColor={"#f87b87"}
                    fillOpacity={0.3}
                    strokeOpacity={0}
                />
            </Map>
        </>
    )
}

export default PlaceMap