import { markerAtom } from '@/atom/atoms';
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
    return (
        <ListDiv>
            {markerRecoil?.map((data: IMarkers, index: number) =>
                <ListInformationCard key={index}>
                    <NameTextDiv>
                        <TitleNameText>{data.place_name}</TitleNameText>
                        <GroupNameText>{data.category_group_name}</GroupNameText>
                    </NameTextDiv>
                    <RoadNameText>{data.road_address_name}</RoadNameText>
                    <AddressNameText>지번: {data.address_name}</AddressNameText>
                </ListInformationCard>
            )}
        </ListDiv>
    )
}

export default SearchList