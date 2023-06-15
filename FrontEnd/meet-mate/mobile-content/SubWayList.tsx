import { clickState, inputState, markerAtom, roadState, searchState, subwayInputState, subwayMarkerState, subwaySearchState, subwayState } from '@/atom/atoms';
import { IMarkers } from '@/interface/desktop_intergace';
import { ListInformationCard, TitleNameText } from '@/m-styled-component/subway-component/subway_styled';
import {
    AddressNameText,
    GroupNameText,
    ListDiv,
    NameTextDiv,
    RoadNameText,
} from '@/styled-component/list-compoent/styled_keyword_list';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';

function SubWayList() {
    const [subwayData] = useRecoilState<IMarkers[]>(subwayMarkerState);
    const [subway, setSubway] = useRecoilState(subwayState)
    const { start, end } = subway
    const [inputCheck, setInputCheck] = useRecoilState(subwayInputState)
    const [subwaySearch, setSubwaySearch] = useRecoilState(subwaySearchState)
    const [click, setClick] = useState(0)
    const { start_point, end_point } = subwaySearch
    const onClick = (lng: string, lat: string, name: string) => {
        if (inputCheck) {
            setSubway({
                start: name,
                end: end
            })
            setSubwaySearch({
                start_point: { lat, lng },
                end_point: end_point
            })
            setClick(1)
        }
        else {
            setSubway({
                start: start,
                end: name
            })
            setSubwaySearch({
                start_point: start_point,
                end_point: { lat, lng }
            })
            setClick(2)
        }
    }
    console.log(click, inputCheck)
    return (
        <ListDiv>
            {subwayData?.map((data: IMarkers, index: number) =>
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

export default SubWayList