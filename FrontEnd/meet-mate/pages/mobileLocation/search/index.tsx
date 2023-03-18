import { IMarkers, mapAtom, markerAtom } from "@/mobile/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const LocationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: scroll;
`;

const LocationDiv = styled.div`
    display:flex;
    flex-direction: column;
    font-size: 3rem;
    border-bottom: 2px solid #9e9d9d;
    cursor: pointer;
    &:hover{
        background-color: #51bbf8;
        transition: 0.3s ease;
        color: white;
        path{
            transition: 0.3s ease;
            fill: white;
        }
    }
`;

const LocationName = styled.div`
    font-size: 2rem;
    color: #9e9d9d;
`;

function Home() {
    const router = useRouter();
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const mapRecoil = useSetRecoilState<IMarkers>(mapAtom);
    const onDivClicked = (data: IMarkers) => {
        mapRecoil(data);
        router.push("/mobileLocation");
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