import { ContentPageDiv } from '@/styled-component/content-component/styled_content'
import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '../atom/atoms'
import BusPage from './BusPage'
import RoadPage from './RoadPage'
import PlacePage from './PlacePage'
import SubwayPage from './Subway'
function Contents() {
  const [page] = useRecoilState(pageState)
  const pageRender = () => {
    if (page.place) {
      return (<PlacePage />)
    }
    if (page.map) {
      return (<RoadPage />)
    }
    if (page.bus) {
      return (<BusPage />)
    }
    if (page.subway) {
      return (<SubwayPage />)
    }
  }
  return (
    <ContentPageDiv>
      {pageRender()}
    </ContentPageDiv>
  )
}

export default Contents