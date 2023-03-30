import React, { useState } from 'react'
import {
  ContentInputDiv,
  ContentInput,
  ContentInputButton,
} from '@/styled-component/content-component/styled_content'
import {
  RoadDiv,
  CrossInputDiv,
  CrossIconDiv,
  RoadButtonDiv,
  RoadForm
} from '@/styled-component/content-component/styled_road'
import CrossIcon from '../public/images/cross.svg'
import { useRecoilState } from 'recoil'
import { markerAtom, roadState } from '@/atom/atoms'
import { useQuery } from 'react-query'
import { Test } from '../apis/apiStorage'
import { Search } from '@/apis/naverApi'
import { IMarkers } from '@/interface/desktop_intergace'
import SearchList from '@/desktop-search-list/SearchList'
function MapPage() {
  const [road, setRoad] = useRecoilState(roadState)
  const [markerRecoil, setMarkerRecoil] = useRecoilState<IMarkers[]>(markerAtom);
  const [markers, setMarkers] = useState<any[]>([]);
  const { start, end } = road
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
  }
  const onCross = () => {
    setRoad({
      start: end,
      end: start
    })
  }
  const onSearch = () => {
    console.log(Search(start))
  }
  const handleSubmit = (e: any, keyword: string) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();
    if (ps === undefined || ps === null) return;
    ps.keywordSearch(keyword, (data: IMarkers[], status: any, _pagination: any) => {
      console.log(e.target.value);
      console.log(kakao.maps.services.Status.OK);
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
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
          bounds.extend(new kakao.maps.LatLng(parseFloat(data[i].y), parseFloat(data[i].x)));
        }
        setMarkers(markers);

        setMarkerRecoil(markers);
      }
    })
  }
  console.log(markerRecoil, markers)
  console.log(start, end)
  return (
    <RoadDiv>
      <CrossInputDiv>
        <ContentInputDiv active={false}>
          <RoadForm onSubmit={(e) => handleSubmit(e, start)}>
            <ContentInput active={false} name='start' value={start} onChange={onChange} placeholder='출발 장소' />
          </RoadForm>
          <RoadForm onSubmit={(e) => handleSubmit(e, end)}>
            <ContentInput active={false} name='end' value={end} onChange={onChange} placeholder='도착 장소' />
          </RoadForm>
        </ContentInputDiv>
        <CrossIconDiv onClick={onCross} >
          <CrossIcon />
        </CrossIconDiv>
      </CrossInputDiv>
      <RoadButtonDiv>
        <ContentInputButton type='button' onClick={onReset} value='다시 입력' _width='80px' _heigth='35px' />
        <ContentInputButton type='button' onClick={onSearch} value='길찾기' _width='80px' _heigth='35px' />
      </RoadButtonDiv>
      <SearchList />
    </RoadDiv>
  )
}

export default MapPage