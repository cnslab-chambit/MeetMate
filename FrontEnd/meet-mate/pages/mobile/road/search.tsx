import { LocationContainer, LocationDiv, LocationName, SearchSVG } from "@/m-styled-component/search-component/serch_styled";
import { IMarkers, divNumAtom, loadAtom, mapAtom, markerAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import Pin from "@/public/images/pin.svg";

function Search() {
    const router = useRouter();
    const [markerRecoil,setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom)
    const [loadRecoil,setLoadRecoil] = useRecoilState<IMarkers[]>(loadAtom);
    const [divNum, setDivNum] = useRecoilState(divNumAtom);
    const onDivClicked = (data: IMarkers) => {
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
        router.push("/mobile/road");
    };

    useEffect(() => {

    },[markerRecoil])
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

export default Search;