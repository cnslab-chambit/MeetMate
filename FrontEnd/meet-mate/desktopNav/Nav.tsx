import React, { useState } from 'react'
import { NavIconDiv, NavIconText, IconTextDiv, NavDiv, NavTitle } from '../styled-component/nav-component/styled_desktop_nav';
import PlaceIcon from '../public/images/place.svg';
import MapIcon from '../public/images/map.svg';
import BusIcon from '../public/images/bus.svg';
import SubwayIcon from '../public/images/subway.svg'
function Nav() {
  interface deskTop{
    place:boolean,
    map:boolean,
    bus:boolean,
    subway:boolean
  }
  const [inputs,setInputs] = useState<deskTop>({
    place:true,
    map:false,
    bus:false,
    subway:false
  })
  const {place,map,bus,subway} = inputs
  const onTogle =(name:string)=>{
    setInputs({
      place: name === 'place' ? true : false,
      map: name === 'map' ? true : false,
      bus: name === 'bus' ? true : false,
      subway: name === 'subway' ? true : false,
    });
  }
  return (
    <NavDiv>
      <NavTitle>Meet Mate</NavTitle>
      <NavIconDiv>
        <IconTextDiv onClick={()=>onTogle('place')} active={place}>
          <PlaceIcon fill="black"/>
          <NavIconText>약속 잡기</NavIconText>
        </IconTextDiv>
        <IconTextDiv onClick={()=>onTogle('map')} active={map}>
          <MapIcon fill="black"/>
          <NavIconText>길 찾기</NavIconText>
        </IconTextDiv>
        <IconTextDiv onClick={()=>onTogle('bus')} active={bus}>
          <BusIcon fill="black"/>
          <NavIconText>버스</NavIconText>
        </IconTextDiv>
        <IconTextDiv onClick={()=>onTogle('subway')} active={subway}>
          <SubwayIcon fill="black"/>
          <NavIconText>전철</NavIconText>
        </IconTextDiv>
      </NavIconDiv>
    </NavDiv>

  )
}

export default Nav