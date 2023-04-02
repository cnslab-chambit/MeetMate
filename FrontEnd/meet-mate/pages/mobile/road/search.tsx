import { LocationContainer, LocationDiv, LocationName } from "@/m-styled-component/search_styled.ts/serch_styled";
import { IMarkers, loadAtom, mapAtom, markerAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

function Search() {
    const router = useRouter();
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const [loadRecoil,setLoadRecoil] = useRecoilState<IMarkers[]>(loadAtom);
    const onDivClicked = (data: IMarkers) => {
        setLoadRecoil((prev) => [...prev, data]);
        router.push("/mobile/road");
    };

    useEffect(() => {

    },[markerRecoil])

    return (
        <LocationContainer>
            {markerRecoil?.map((data: IMarkers, index:number) => 
            <LocationDiv key={index} onClick={() => onDivClicked(data)}>
                {data.place_name}
                <LocationName>
                    {data.road_address_name}
                </LocationName>
            </LocationDiv>
            )}
        </LocationContainer>
    );
}

export default Search;