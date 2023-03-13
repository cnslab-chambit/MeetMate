import React from 'react'
import { NavIconDiv, NavIconText, IconTextDiv, NavDiv, NavTitle } from '../styled-component/nav-component/styled_desktop_nav';
import PlaceIcon from '../public/images/place.svg';
import MapIcon from '../public/images/map.svg';
import BusIcon from '../public/images/bus.svg';
import SubwayIcon from '../public/images/subway.svg'
function Nav() {
  return (
    <NavDiv>
      <NavTitle>Meet Mate</NavTitle>
      <NavIconDiv>
        <IconTextDiv>
          <PlaceIcon fill="black"/>
          <NavIconText>약속 잡기</NavIconText>
        </IconTextDiv>
        <IconTextDiv>
          <MapIcon fill="black"/>
          <NavIconText>길 찾기</NavIconText>
        </IconTextDiv>
        <IconTextDiv>
          <BusIcon fill="black"/>
          <NavIconText>버스</NavIconText>
        </IconTextDiv>
        <IconTextDiv>
          <SubwayIcon fill="black"/>
          <NavIconText>전철</NavIconText>
        </IconTextDiv>
      </NavIconDiv>
    </NavDiv>

  )
}

export default Nav