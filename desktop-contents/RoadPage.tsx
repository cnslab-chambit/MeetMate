import React, { useState } from 'react'
import {
  ContentInputDiv,
  ContentInput,
  ContentInputButton,
} from '@/components/Layout/body/Body.styles'
import {
  RoadDiv,
  CrossInputDiv,
  CrossIconDiv,
  RoadButtonDiv,
  RoadForm
} from '@/styled-component/content-component/styled_road'
import CrossIcon from '../public/images/cross.svg'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { inputState, markerAtom, roadDataState, roadSearchState, roadState, searchState } from '@/atom/atoms'
import { roadLineApi, roadSearchApi } from '../apis/apiStorage'
import { IMarkers } from '@/interface/desktop_intergace'
import SearchList from '@/desktop-search-list/SearchList'
import PublicTransportList from '@/desktop-search-list/PublicTransportList'

function MapPage() {
  const [road, setRoad] = useRecoilState(roadState)
  const [markerRecoil, setMarkerRecoil] = useRecoilState(markerAtom);
  const [markers, setMarkers] = useState<any[]>([]);
  const [roadList, setRoadList] = useRecoilState(roadSearchState)
  const { start, end } = road
  const setInputCheck = useSetRecoilState(inputState)
  const [search, setSearch] = useRecoilState(searchState)
  const setRoadData = useSetRecoilState(roadDataState)
  const onChange = (e: any) => {
    const { name, value } = e.target
    setRoad({
      ...road,
      [name]: value
    })
  }
  const onReset = () => {
    setRoad({
      start: '',
      end: ''
    })
    setSearch({
      start_point: { lat: search.end_point.lat, lng: search.end_point.lng, img: search.start_point.img },
      end_point: { lat: search.start_point.lat, lng: search.start_point.lng, img: search.end_point.img }
    })
  }
  const onCross = () => {
    setRoad({
      start: end,
      end: start
    })
    setSearch({
      start_point: { lat: search.end_point.lat, lng: search.end_point.lng, img: search.start_point.img },
      end_point: { lat: search.start_point.lat, lng: search.start_point.lng, img: search.end_point.img }
    })
    onSearch()
  }
  const onSearch = async () => {
    const rodaData = await roadSearchApi(search)
    if (!rodaData) {
      return
    }
    setRoadData(rodaData)
    setRoadList(true)
  }
  const handleSubmit = (e: any, keyword: string) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();
    if (ps === undefined || ps === null) return;
    ps.keywordSearch(keyword, (data: IMarkers[], status: any, _pagination: any) => {
      console.log(e.target.value);
      console.log(kakao.maps.services.Status.OK);
      if (status === kakao.maps.services.Status.OK) {
        let markers = [];

        for (let i = 0; i < data.length; i++) {

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
        }
        setMarkers(markers);
        setMarkerRecoil(markers);
      }
    })
    setRoadList(false)
    e.target.name === 'start' ? setInputCheck(true) : setInputCheck(false)
  }
  console.log(markerRecoil, markers)
  console.log(start, end)
  return (
    <RoadDiv>
      <CrossInputDiv>
        <ContentInputDiv>
          <RoadForm name='start' onSubmit={(e) => { handleSubmit(e, start); }}>
            <ContentInput active={false} name='start' value={start} onChange={onChange} placeholder='출발 장소' />
          </RoadForm>
          <RoadForm name='end' onSubmit={(e) => { handleSubmit(e, end); }}>
            <ContentInput active={false} name='end' value={end} onChange={onChange} placeholder='도착 장소' />
          </RoadForm>
        </ContentInputDiv>
        <CrossIconDiv onClick={onCross} >
          <CrossIcon />
        </CrossIconDiv>
      </CrossInputDiv>
      <RoadButtonDiv>
        <ContentInputButton type='button' onClick={onReset} value='다시 입력' _width='80px' _heigth='45px' />
        <ContentInputButton type='button' onClick={onSearch} value='길 찾기' _width='80px' _heigth='45px' />
      </RoadButtonDiv>
      {roadList ? (<PublicTransportList />) : (<SearchList />)}
    </RoadDiv>
  )
}

export default MapPage