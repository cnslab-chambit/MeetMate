import { ContentPageDiv } from '@/styled-component/content-coponent/styled_content'
import React from 'react'
import { useRecoilState } from 'recoil'
import {pageState} from '../atom/atoms'
import BusPage from './BusPage'
import MapPage from './MapPage'
import PlacePage from './PlacePage'
import SubwayPage from './Subway'
function Contents() {
  const [page] = useRecoilState(pageState)
  const pageRender = () =>{
    if(page.place){
      return (<PlacePage/>)
    }
    if(page.map){
      return (<MapPage/>)
    }
    if(page.bus){
      return (<BusPage/>)
    }
    if(page.subway){
      return (<SubwayPage/>)
    }
  }
  return (
    <ContentPageDiv>
      {pageRender()}
    </ContentPageDiv>
  )
}

export default Contents