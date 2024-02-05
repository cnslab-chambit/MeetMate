import { ContentPageDiv } from '@/components/Layout/body/Body.styles'
import React from 'react'
import { useRecoilState } from 'recoil'
import { pageState } from '@/atom/atoms'
import BusPage from '@/desktop-contents/BusPage'
import RoadPage from '@/desktop-contents/RoadPage'
import PlacePage from '@/desktop-contents/PlacePage'
import SubwayPage from '@/desktop-contents/Subway'
export const Body = () => {
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

