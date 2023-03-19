import { LocationContainer, LocationDiv, LocationName } from "@/m-styled-component/search_styled.ts/serch_styled";
import { IMarkers, mapAtom, markerAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

function Home() {
    const router = useRouter();
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const mapRecoil = useSetRecoilState<IMarkers>(mapAtom);
    const onDivClicked = (data: IMarkers) => {
        mapRecoil(data);
        router.push("/mobile");
    };

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

export default Home;