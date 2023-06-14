import {
    CoordinatesBoxState,
    placeCoordinateState,
    placeIdState,
    placeMarkerState,
} from '@/atom/atoms';
import { IMarkers } from '@/interface/desktop_intergace';
import {
    AddressNameText,
    ListDiv,
    ListInformationCard,
    NameTextDiv,
    RoadNameText,
    TitleNameText,
} from '@/styled-component/list-compoent/styled_keyword_list';
import React from 'react'
import { useRecoilState } from 'recoil';

function PlaceSearchList() {
    const [placeData] = useRecoilState<IMarkers[]>(placeMarkerState);
    const [placeId, setPlaceId] = useRecoilState(placeIdState)
    const [placeCoordinate, setPlaceCoordinate] = useRecoilState(placeCoordinateState)
    const onClick = (lng: string, lat: string, name: string) => {
        setPlaceCoordinate({ ...placeCoordinate, [placeId]: { name: name, lat: lat, lng: lng } })
    }
    return (
        <ListDiv>
            {placeData?.map((data: IMarkers, index: number) =>
                <ListInformationCard key={index}>
                    <NameTextDiv>
                        <TitleNameText onClick={() => onClick(data.x, data.y, data.place_name)} >{data.place_name}</TitleNameText>
                    </NameTextDiv>
                    {data.road_address_name && <RoadNameText>{data.road_address_name}</RoadNameText>}
                    {data.address_name && <AddressNameText>지번: {data.address_name}</AddressNameText>}
                </ListInformationCard>
            )}
        </ListDiv>
    )
}

export default PlaceSearchList