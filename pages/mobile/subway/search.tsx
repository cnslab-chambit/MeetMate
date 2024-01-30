import { LocationContainer, LocationDiv, LocationName } from "@/m-styled-component/search-component/serch_styled";
import { IMarkers, divNumAtom, loadAtom, mapAtom, markerAtom, subwayDivNum } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

function Search() {
    const router = useRouter();
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const divNum = useRecoilValue(subwayDivNum);
    const onDivClicked = (data: IMarkers) => {
        if(divNum === 1){
            
        }
        router.push("/mobile/subway");
    };

    useEffect(() => {

    },[markerRecoil])
    return (
        <LocationContainer>
            {markerRecoil?.filter((e)=> e.category_group_code =='SW8').map((data: IMarkers, index:number) => 
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

export default Search;