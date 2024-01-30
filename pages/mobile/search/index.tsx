import { LocationContainer, LocationDiv, LocationName, SearchSVG } from "@/m-styled-component/search-component/serch_styled";
import { IMarkers, mapAtom, markerAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Pin from "../../../public/images/pin.svg";

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
                <SearchSVG>
                    <Pin/>
                </SearchSVG>
                <div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div>
                            {data.place_name.length > 14 ? `${data.place_name.substr(0, 14)}...`: data.place_name}
                        </div>
                        <div style={{fontSize:"1.5rem", marginLeft:"2rem",fontWeight:"700", color:"#9e9d9d"}}>
                            {data.category_group_name}
                    </div>
                </div>
                {data.road_address_name ? 
                <LocationName>
                    {data.road_address_name}
                </LocationName>
                : 
                <div style={{display:"none"}}></div>
                }
                </div>

            </LocationDiv>
            )}
        </LocationContainer>
    );
}

export default Home;