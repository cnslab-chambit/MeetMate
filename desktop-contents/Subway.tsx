import { ContentInput, ContentInputButton, ContentInputDiv } from '@/styled-component/content-component/styled_content';
import { CrossIconDiv, CrossInputDiv, RoadButtonDiv, RoadDiv, RoadForm } from '@/styled-component/content-component/styled_road';
import CrossIcon from '../public/images/cross.svg'
import React, { useState } from 'react'
import SearchList from '@/desktop-search-list/SearchList';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IMarkers } from '@/interface/desktop_intergace';
import { subwayDataState, subwayInputState, subwayListState, subwayMarkerState, subwaySearchState, subwayState } from '@/atom/atoms';
import SubwaySearchList from '@/desktop-search-list/SubwaySearchList';
import { roadSearchApi } from '@/apis/apiStorage';
import SubwayCard from '@/desktop-search-list/SubwayCard';

function SubwayPage() {
  const [subway, setSubway] = useRecoilState(subwayState)
  const [markerRecoil, setMarkerRecoil] = useRecoilState<IMarkers[]>(subwayMarkerState);
  const [subwayList, setSubwayList] = useRecoilState(subwayListState)
  const setSubwayInputCheck = useSetRecoilState(subwayInputState)
  const [subwaySearch, setSubwaySearch] = useRecoilState(subwaySearchState)
  const setSubwayData = useSetRecoilState(subwayDataState)
  const { start, end } = subway
  const onChange = (e: any) => {
    const { name, value } = e.target
    setSubway({
      ...subway,
      [name]: value
    })
  }
  const onSearch = async () => {
    let subwayData = await roadSearchApi(subwaySearch)
    if (!subwayData) {
      return
    }
    setSubwayData(subwayData)
    setSubwayList(true)
  }
  const handleSubmit = (e: any, keyword: string) => {
    e.preventDefault();

    !keyword.includes('역') ? keyword += '역' : null

    const ps = new kakao.maps.services.Places();

    if (ps === undefined || ps === null) return;
    ps.keywordSearch(keyword, (data: IMarkers[], status: any, _pagination: any) => {
      console.log(e.target.value);
      console.log(kakao.maps.services.Status.OK);
      if (status === kakao.maps.services.Status.OK) {
        let markers = [];
        markers = data
          .filter((e) => e.category_group_code == 'SW8')
          .map((e) => {
            return ({
              address_name: e.address_name,
              category_group_code: e.category_group_code,
              category_group_name: e.category_group_name,
              category_name: e.category_name,
              distance: e.distance,
              id: e.id,
              phone: e.phone,
              place_name: e.place_name,
              place_url: e.place_url,
              road_address_name: e.road_address_name,
              x: e.x,
              y: e.y
            })
          })
        setMarkerRecoil(markers);
      }
    })
    setSubwayList(false)
    e.target.name === 'start' ? setSubwayInputCheck(true) : setSubwayInputCheck(false)
  }
  const onCross = () => {
    setSubway({
      start: end,
      end: start
    })
    setSubwaySearch({
      start_point: { lat: subwaySearch.end_point.lat, lng: subwaySearch.end_point.lng },
      end_point: { lat: subwaySearch.start_point.lat, lng: subwaySearch.start_point.lng }
    })
    onSearch()
  }
  const onReset = () => {
    setSubway({
      start: '',
      end: ''
    })
  }
  return (
    <RoadDiv>
      <CrossInputDiv>
        <ContentInputDiv>
          <RoadForm name='start' onSubmit={(e) => { handleSubmit(e, start); }}>
            <ContentInput active={false} name='start' value={start} onChange={onChange} placeholder='출발역' />
          </RoadForm>
          <RoadForm name='end' onSubmit={(e) => { handleSubmit(e, end); }}>
            <ContentInput active={false} name='end' value={end} onChange={onChange} placeholder='도착역' />
          </RoadForm>
        </ContentInputDiv>
        <CrossIconDiv onClick={onCross}>
          <CrossIcon />
        </CrossIconDiv>
      </CrossInputDiv>
      <RoadButtonDiv>
        <ContentInputButton type='button' onClick={onReset} value='다시 입력' _width='80px' _heigth='45px' />
        <ContentInputButton type='button' onClick={onSearch} value='전철 검색' _width='80px' _heigth='45px' />
      </RoadButtonDiv>
      {subwayList ? (<SubwayCard />) : (<SubwaySearchList />)}
    </RoadDiv>
  )
}

export default SubwayPage