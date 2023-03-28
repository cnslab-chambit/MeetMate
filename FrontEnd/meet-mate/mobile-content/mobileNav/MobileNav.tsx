
import { Inter } from 'next/font/google'
import { NavButton, NavDiv, NavForm, NavIconContainer, Navigation, NavInput, NavLogo, NavMenu, NavSearchDiv, NavSearchDiv2 } from '@/m-styled-component/nav-component/nav_styled'
import { useEffect, useRef, useState } from 'react'
import { IconTextDiv, NavIconDiv, NavIconText } from '@/m-styled-component/nav-component/nav_styled'
import PlaceIcon from '../../public/images/place.svg';
import MapIcon from '../../public/images/map.svg';
import BusIcon from '../../public/images/bus.svg';
import SubwayIcon from '../../public/images/subway.svg'
import SearchIcon from '../../public/images/search.svg';
import Menu from '../../public/images/menu.svg';
import { useRouter } from 'next/router'
import { IMarkers, locNameAtom, mapAtom, markerAtom } from '../atom'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { PromiseDiv } from '@/m-styled-component/search_styled.ts/serch_styled'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [place, setPlace] = useState("");
  const [markers, setMarkers] = useState<any[]>([]);
  const [markerRecoil, setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom);
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
        <NavLogo onClick={()=>router.push("/mobile")}>Meet Mate</NavLogo>
        <NavMenu><Menu/></NavMenu>
      </NavDiv>

      <NavSearchDiv2>
          <PromiseDiv onClick={() => router.push("/mobile/search")}>{mapRecoil.place_name}</PromiseDiv>
          <NavButton>
          <SearchIcon/>
          </NavButton>
        </NavSearchDiv2>
      
      <NavIconContainer>
      <NavIconDiv>
        <IconTextDiv isActive={router.asPath === "/mobile/promise"} onClick={() => moveRouter("/mobile/promise")}>
          <PlaceIcon fill="black"/>
          <NavIconText>약속 잡기</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={router.asPath === "/mobile/road"} onClick={() => moveRouter("/mobile/road")}>
          <MapIcon fill="black"/>
          <NavIconText>길 찾기</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={router.asPath === "/mobile/bus"} onClick={() => moveRouter("/mobile/bus")}>
          <BusIcon fill="black"/>
          <NavIconText>버스</NavIconText>
        </IconTextDiv>
        <IconTextDiv isActive={router.asPath === "/mobile/subway"} onClick={() => moveRouter("/mobile/subway")}>
          <SubwayIcon fill="black"/>
          <NavIconText>전철</NavIconText>
        </IconTextDiv>
      </NavIconDiv>
    </NavIconContainer>
    </Navigation>
  )
}