
import { Inter } from 'next/font/google'
import { NavButton, NavDiv, NavForm, NavIconContainer, Navigation, NavInput, NavLogo, NavSearchDiv, NavSearchDiv2 } from '@/m-styled-component/nav-component/nav_styled'
import { useEffect, useRef, useState } from 'react'
import { IconTextDiv, NavIconDiv, NavIconText } from '@/m-styled-component/nav-component/nav_styled'
import PlaceIcon from '../../public/images/place.svg';
import MapIcon from '../../public/images/map.svg';
import BusIcon from '../../public/images/bus.svg';
import SubwayIcon from '../../public/images/subway.svg'
import SearchIcon from '../../public/images/search.svg';
import { useRouter } from 'next/router'
import { IMarkers, locNameAtom, mapAtom, markerAtom, pageState } from '../atom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { PromiseDiv } from '@/m-styled-component/search-component/serch_styled'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputs, setInputs] = useRecoilState(pageState);
  const {place, map, bus, subway} = inputs;
  
  const onTogle = (path:string,name: string) => {
    setInputs({
      place: name === 'place' ? true : false,
      map: name === 'map' ? true : false,
      bus: name === 'bus' ? true : false,
      subway: name === 'subway' ? true : false,
    });
    router.push(path);
  }

  const [mapRecoil,setMapRecoil] = useRecoilState<IMarkers>(mapAtom);
  const resetMap = useResetRecoilState(mapAtom);
  const resetMarker = useResetRecoilState(markerAtom);
  const router = useRouter();

  const moveRouter = (path: string) => {
    resetMap();
    resetMarker();
    router.push(path);
  };

  return (
    <Navigation>
      <NavDiv>
        <NavLogo onClick={()=> router.push("/mobile")}>Meet Mate</NavLogo>
      </NavDiv>

      <NavSearchDiv2>
          <PromiseDiv onClick={() => router.push("/mobile/search")}>{mapRecoil.place_name}</PromiseDiv>
          <NavButton>
          <SearchIcon/>
          </NavButton>
        </NavSearchDiv2>
      
      <NavIconContainer>
      <NavIconDiv>
        <IconTextDiv isActive={place} onClick={()=> onTogle("/mobile/promise","place")}>
          <PlaceIcon fill="black"/>
          <NavIconText>약속 잡기</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={map} onClick={()=> onTogle("/mobile/road","map")}>
          <MapIcon fill="black"/>
          <NavIconText>길 찾기</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={bus} onClick={()=> onTogle("/mobile/bus","bus")}>
          <BusIcon fill="black"/>
          <NavIconText>버스</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={subway} onClick={()=> onTogle("/mobile/subway","subway")}>
          <SubwayIcon fill="black"/>
          <NavIconText>전철</NavIconText>
        </IconTextDiv>
      </NavIconDiv>
    </NavIconContainer>
    </Navigation>
  )
}