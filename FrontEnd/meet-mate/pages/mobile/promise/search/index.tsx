import { LocationContainer, LocationDiv, LocationName } from "@/m-styled-component/search-component/serch_styled";
import { IMarkers, divNumAtom, loadAtom, mapAtom, markerAtom, placeState, promiseIndex, promiseState } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

function SearchList() {
    const router = useRouter();
    const id = useRecoilValue(promiseIndex);
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const setPromiseState = useSetRecoilState(promiseState);
    const [placeAdd, setPlaceAdd] = useRecoilState(placeState);

    const onDivClicked = (data: IMarkers) => {
        setPromiseState((prev) => {
            const updatedPromise = [...prev];
            updatedPromise[id] = {...data};
            return updatedPromise;
        });        
        
        setPlaceAdd((prev) => {
            const updatedPlaceAdd = [...prev];
            updatedPlaceAdd[id] = { ...updatedPlaceAdd[id], current: data.place_name };
            return updatedPlaceAdd;
          });
          router.push("/mobile/promise");
    };
    
    return (
        <LocationContainer>
            {markerRecoil?.map((data: IMarkers, index:number) => 
            <LocationDiv key={index} onClick={() => onDivClicked(data)}>
                <div style={{display:"flex",alignItems:"center"                                             }}>
                    <div>
                        {data.place_name.length > 15 ? `${data.place_name.substr(0, 15)}...`: data.place_name}
                    </div>
                    <div style={{fontSize:"1.5rem", marginLeft:"2rem",fontWeight:"700", color:"#9e9d9d"}}>
                        {data.category_group_name}
                    </div>
                </div>

                <LocationName>
                    {data.road_address_name}
                </LocationName>
            </LocationDiv>
            )}
        </LocationContainer>
    );
}

export default SearchList;