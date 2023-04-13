import { LocationContainer, LocationDiv, LocationName } from "@/m-styled-component/search-component/serch_styled";
import { IMarkers, divNumAtom, loadAtom, mapAtom, markerAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

function Search() {
    const router = useRouter();
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const [loadRecoil,setLoadRecoil] = useRecoilState<IMarkers[]>(loadAtom);
    const [divNum, setDivNum] = useRecoilState(divNumAtom);
    const onDivClicked = (data: IMarkers) => {
        console.log(loadRecoil.length);
        if(divNum === "start"){
            if(loadRecoil.length === 0){
                setLoadRecoil([data]);
            }
            else{
                setLoadRecoil([data,...loadRecoil.slice(1)]);
            }
        }
        else if(divNum === "end"){
            if(loadRecoil.length === 0){
                setLoadRecoil((prev) => [...prev,data]);
            }
            else{
                setLoadRecoil([...loadRecoil.slice(0,1),data]);
            }
        }
        console.log(loadRecoil.length);
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