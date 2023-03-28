import { NavBasicDiv, NavButton, NavColDiv, NavDiv, NavForm, Navigation, NavInput, NavLogo, NavMenu, NavSearchDiv, NavSearchDiv2 } from "@/m-styled-component/nav-component/nav_styled";
import { PromiseDiv } from "@/m-styled-component/search_styled.ts/serch_styled";
import { useRouter } from "next/router";
import Menu from "../../public/images/menu.svg";
import SearchIcon from "../../public/images/search.svg";
import MapIcon from "../../public/images/map2.svg";
import XIcon from "../../public/images/X.svg";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { IMarkers, markerAtom } from "../atom";

function SearchNav() {
    const [keyword, setKeyword] = useState("");
    const [place, setPlace] = useState("");
    const [markers, setMarkers] = useState<any[]>([]);
    const [markerRecoil, setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom);
    const markerReset = useResetRecoilState(markerAtom);
    
    const router = useRouter();
    const handleSubmit = (e:any) => {
      e.preventDefault();
      // setPlace(keyword);
      // if(place === null) return;


      // const container = document.getElementById("map");
      // const options = {
      //   center: new kakao.maps.LatLng(33.450701, 126.570667),
      //   level: 3,
      // };
      // const tempMap = new kakao.maps.Map(container as any,options);
      // setMap(tempMap);
      
        const ps = new kakao.maps.services.Places();
        if(ps === undefined || ps === null) return;
        ps.keywordSearch(keyword,(data: IMarkers[], status: any, _pagination: any ) => {
          console.log(e.target.value);
          console.log(kakao.maps.services.Status.OK);
          if(status === kakao.maps.services.Status.OK){
            let bounds = new kakao.maps.LatLngBounds();
            let markers = [];
  
            for(let i = 0; i < data.length; i++){
              
              markers.push({
                address_name: data[i].address_name,
                category_group_code: data[i].category_group_code,
                category_group_name: data[i].category_group_name,
                category_name: data[i].category_name,
                distance: data[i].distance,
                id: data[i].id,
                phone: data[i].phone,
                place_name: data[i].place_name,
                place_url: data[i].place_url,
                road_address_name: data[i].road_address_name,
                x: data[i].x,
                y: data[i].y
              });
              bounds.extend(new kakao.maps.LatLng(parseFloat(data[i].y) ,parseFloat(data[i].x)));
            }
            setMarkers(markers);
            
            setMarkerRecoil(markers);
          }
        })
    };

    const onXIconClicked = () => {
      setMarkerRecoil([]);
      router.back();
    }
  
    const onChange = (e:any) => {
      setKeyword(e.target.value);
      if(e.target.value.length > 1){
        handleSubmit(e);
      }
      else if(e.target.value.length === 0){
        markerReset();
      }
    };

    const moveOtherPage = (path: string) => {
      router.push(path);
    };

    return (
        <Navigation>
          <NavDiv>
            <NavLogo onClick={() => moveOtherPage("/mobile")}>Meet Mate</NavLogo>
            <NavMenu><Menu/></NavMenu>
          </NavDiv>
          <NavBasicDiv>
            <NavColDiv onClick={() => moveOtherPage("/mobile")}>
                <MapIcon/>
                지도
            </NavColDiv>
            <NavSearchDiv>
                <NavForm
                onSubmit={handleSubmit}
                >
                    <NavInput  type="text" placeholder='키워드(ex 광운대, 석계역)' onChange={onChange}></NavInput>
                    <NavButton>
                        <SearchIcon onSubmit={handleSubmit}/>
                    </NavButton>
                </NavForm>
            </NavSearchDiv>
            <NavColDiv>
                <XIcon onClick={onXIconClicked}/>
            </NavColDiv>
          </NavBasicDiv>         
        </Navigation>
      )
}

export default SearchNav;