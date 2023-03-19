import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Map,MapMarker } from 'react-kakao-maps-sdk'
import { NavButton, NavDiv, NavForm, NavIconContainer, Navigation, NavInput, NavLogo, NavMenu, NavSearchDiv } from '@/m-styled-component/nav-component/nav_styled'
import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { IconTextDiv, NavIconDiv, NavIconText } from '@/m-styled-component/nav-component/nav_styled'
import PlaceIcon from '../../public/images/place.svg';
import MapIcon from '../../public/images/map.svg';
import BusIcon from '../../public/images/bus.svg';
import SubwayIcon from '../../public/images/subway.svg'
import SearchIcon from '../../public/images/search.svg';
import Menu from '../../public/images/menu.svg';
import { useRouter } from 'next/router'
import { IMarkers, markerAtom } from '../atom'
import { useRecoilState } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [place, setPlace] = useState("");
  const [markers, setMarkers] = useState<any[]>([]);
  const [markerRecoil, setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom);
  const router = useRouter();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    setPlace(keyword);
    if(place === null) return;
     
    // const container = document.getElementById("map");
    // const options = {
    //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // };
    // const tempMap = new kakao.maps.Map(container as any,options);
    // setMap(tempMap);
    
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(keyword,(data: IMarkers[], status: any, _pagination: any ) => {
        if(status === kakao.maps.services.Status.OK){
          let bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for(let i = 0; i < data.length; i++){
            console.log(data[i]);
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
          console.log(markers);
          setMarkerRecoil(markers);
          router.push("/mobile/search");
        }
      })
  };

  const onChange = (e:any) => {
    setKeyword(e.target.value);
  };
  return (
    <Navigation>
      <NavDiv>
        <NavLogo onClick={()=>router.push("/mobile")}>Meet Mate</NavLogo>
        <NavMenu><Menu/></NavMenu>
      </NavDiv>
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
      <NavIconContainer>
      <NavIconDiv>
        <IconTextDiv isActive={router.asPath === "/mobile/promise"} onClick={() => router.push("/mobile/promise")}>
          <PlaceIcon fill="black"/>
          <NavIconText>약속 잡기</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={router.asPath === "/"}>
          <MapIcon fill="black"/>
          <NavIconText>길 찾기</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={router.asPath === "/"}>
          <BusIcon fill="black"/>
          <NavIconText>버스</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={router.asPath === "/"}>
          <SubwayIcon fill="black"/>
          <NavIconText>전철</NavIconText>
        </IconTextDiv>
      </NavIconDiv>
    </NavIconContainer>
    </Navigation>
  )
}