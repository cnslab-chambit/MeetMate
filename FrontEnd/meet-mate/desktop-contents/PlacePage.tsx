/*global kakao*/
import React, { useEffect, useState } from 'react'
import {
  ContentInputDiv,
  ContentInput,
  ContentInputButton,
  ContentInputForm,
  ContentInputIconDiv,
  ContentPlaceDiv,
  ContentInputButtonDiv,
  ContentDiv,
  LodingDiv,
} from '@/styled-component/content-component/styled_content'
import PlaceDialog from '@/dialog/PlaceDialog';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { coordinateDataState, countState, placeCoordinateState, placeIdState, placeMarkerState, placeState, roadPlaceState } from '@/atom/atoms';
import CancelIcon from '../public/images/cancel.svg'
import { placeCoordinateList } from '@/apis/apiStorage';
import { IMarkers } from '@/interface/desktop_intergace';
import PlaceSearchList from '@/desktop-search-list/PlaceSearchList';
import CoordinateCategory from '@/desktop-search-list/CoordinateCategory';
import LodingIcon from '../public/images/Loding.svg'
function PlacePage() {

  const [count, setCount] = useRecoilState(countState);
  const [open, setOpen] = useState<boolean>(false);
  const [placeAdd, setPlaceAdd] = useRecoilState(placeState);
  const [placeCoordinate, setPlaceCoordinate] = useRecoilState(placeCoordinateState)
  const setMarkerRecoil = useSetRecoilState<IMarkers[]>(placeMarkerState);
  const [PlaceList, setPlaceList] = useRecoilState(roadPlaceState)
  const [coordinateData, setCoordinateData] = useRecoilState(coordinateDataState)
  const setPlaceId = useSetRecoilState(placeIdState)
  const [loding, setLoding] = useState(false)
  const onChange = (e: any) => {
    const { name, value } = e.target
    setPlaceCoordinate({ ...placeCoordinate, [name]: { name: value, lat: '', lng: '' } })
  }
  const onDelete = (target: number) => {
    const newPlaces = placeAdd.filter((element) => {
      return element.id !== target
    })
    setPlaceAdd(newPlaces)
    const newPlaceCoordinate = { ...placeCoordinate };
    delete newPlaceCoordinate[target]
    setPlaceCoordinate(newPlaceCoordinate)
  }
  const handleSubmit = (e: any, keyword: string, id: string) => {
    e.preventDefault();
    console.log(keyword)
    const ps = new kakao.maps.services.Places();
    if (ps === undefined || ps === null) return;
    ps.keywordSearch(keyword, (data: IMarkers[], status: any, _pagination: any) => {
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
        setMarkerRecoil(markers);
      }
    })
    setPlaceList(false)
    setPlaceId(id)
  }
  useEffect(() => {
    const newPlaces = [];
    for (let i = placeAdd[placeAdd.length - 1].id + 1; i <= placeAdd[placeAdd.length - 1].id + (+count); i++) {
      const newPlace = {
        id: i,
        current: `${i}번째 장소`,
      };
      newPlaces.push(newPlace);
    }
    setPlaceAdd([...placeAdd, ...newPlaces]);
    setCount(0)
  }, [count])
  const searchPlace = async () => {
    let newLat = 0
    let newLng = 0
    let cnt = 0
    setLoding(true)
    for (let obj of Object.values(placeCoordinate)) {
      newLat += (+obj?.lat)
      newLng += (+obj?.lng)
      cnt += 1
    }
    const data = await placeCoordinateList(newLng / cnt, newLat / cnt)
    setCoordinateData(data)
    setPlaceList(true)
    setLoding(false)
  }
  return (
    <>
      {loding ? (
        <LodingDiv>
          <LodingIcon />
        </LodingDiv>
      ) : (null)}
      <ContentPlaceDiv>
        <ContentDiv>
          {open ? (<PlaceDialog setOpen={setOpen} setCount={setCount}></PlaceDialog>) : (null)}
          <ContentInputDiv active={true}>
            {placeAdd.map((element, index: any) => {
              return index > 1 ? (
                <ContentInputIconDiv onSubmit={(e) => { handleSubmit(e, placeCoordinate[element.id.toString()].name, element.id.toString()); }}>
                  <ContentInput name={element.id.toString()} value={placeCoordinate[element.id.toString()]?.name} active={true} placeholder={element.current} key={element.id} onChange={onChange}></ContentInput>
                  <CancelIcon onClick={() => onDelete(element.id)} />
                </ContentInputIconDiv>
              ) : (
                <ContentInputForm onSubmit={(e) => { handleSubmit(e, placeCoordinate[element.id.toString()].name, element.id.toString()); }}>
                  <ContentInput name={element.id.toString()} value={placeCoordinate[element.id.toString()]?.name} active={false} placeholder={element.current} key={element.id} onChange={onChange}></ContentInput>
                </ContentInputForm>
              );
            })}
          </ContentInputDiv>
        </ContentDiv>
        <ContentInputButtonDiv>
          <ContentInputButton type='button' value='장소 추가' onClick={() => setOpen(true)} _width='104px' _heigth='49px' />
          <ContentInputButton type='button' value='장소 찾기' onClick={() => searchPlace()} _width='104px' _heigth='49px' />
        </ContentInputButtonDiv>
        {PlaceList ? (<CoordinateCategory />) : (<PlaceSearchList />)}
      </ContentPlaceDiv>
    </>
  )
}

export default PlacePage