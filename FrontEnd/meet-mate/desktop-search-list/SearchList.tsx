import { clickState, inputState, markerAtom, roadState, searchState } from '@/atom/atoms';
import { IMarkers } from '@/interface/desktop_intergace';
import {
    AddressNameText,
    GroupNameText,
    ListDiv,
    ListInformationCard,
    NameTextDiv,
    RoadNameText,
    TitleNameText,

} from '@/styled-component/list-compoent/styled_list';
import React from 'react'
import { useRecoilState } from 'recoil';

function SearchList() {
    const [markerRecoil] = useRecoilState<IMarkers[]>(markerAtom);
    const [road, setRoad] = useRecoilState(roadState)
    const { start, end } = road
    const [inputCheck, setInputCheck] = useRecoilState(inputState)
    const [search, setSearch] = useRecoilState(searchState)
    const [click, setClick] = useRecoilState(clickState)
    const { start_point, end_point } = search
    const onClick = (lng: string, lat: string, name: string) => {
        if (inputCheck) {
            setRoad({
                start: name,
                end: end
            })
            setSearch({
                start_point: { lat, lng, img: '/images/start.svg' },
                end_point: end_point
            })
            setClick(1)
        }
        else {
            setRoad({
                start: start,
                end: name
            })
            setSearch({
                start_point: start_point,
                end_point: { lat, lng, img: '/images/end.svg' }
            })
            setClick(2)
        }
    }
    console.log(click, inputCheck)
    return (
        <ListDiv>
            {markerRecoil?.map((data: IMarkers, index: number) =>
                <ListInformationCard key={index}>
                    <NameTextDiv>
                        <TitleNameText onClick={() => onClick(data.x, data.y, data.place_name)} >{data.place_name}</TitleNameText>
                        {data.category_group_name && <GroupNameText>{data.category_group_name}</GroupNameText>}
                    </NameTextDiv>
                    {data.road_address_name && <RoadNameText>{data.road_address_name}</RoadNameText>}
                    {data.address_name && <AddressNameText>지번: {data.address_name}</AddressNameText>}
                </ListInformationCard>
            )}
        </ListDiv>
    )
}

export default SearchList