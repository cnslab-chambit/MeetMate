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
} from '@/styled-component/content-component/styled_content'
import PlaceDialog from '@/dialog/PlaceDialog';
import { useRecoilState } from 'recoil';
import { countState, placeState, placeTextState } from '@/atom/atoms';
import CancelIcon from '../public/images/cancel.svg'
function PlacePage() {

  const [count, setCount] = useRecoilState(countState);
  const [open, setOpen] = useState<boolean>(false);
  const [placeAdd, setPlaceAdd] = useRecoilState(placeState);
  const [text, setText] = useRecoilState(placeTextState)
  const onChange = (e: any) => {
    const { name, value } = e.target
    setText({ ...text, [name]: value })
  }
  const onDelete = (target: number) => {
    const newPlaces = placeAdd.filter((element) => {
      console.log(element.id, target)
      return element.id !== target
    })
    setPlaceAdd(newPlaces)
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
  return (
    <ContentPlaceDiv>
      <ContentInputForm>
        {open ? (<PlaceDialog setOpen={setOpen} setCount={setCount}></PlaceDialog>) : (null)}
        <ContentInputDiv active={true}>
          {placeAdd.map((element, index: any) => {
            return index > 1 ? (
              <ContentInputIconDiv>
                <ContentInput name={element.id.toString()} value={text[element.id.toString()]} active={true} placeholder={element.current} key={element.id} onChange={onChange}></ContentInput>
                <CancelIcon onClick={() => onDelete(element.id)} />
              </ContentInputIconDiv>
            ) : (
              <ContentInput name={element.id.toString()} value={text[element.id.toString()]} active={false} placeholder={element.current} key={element.id} onChange={onChange}></ContentInput>
            );
          })}
        </ContentInputDiv>
      </ContentInputForm>
      <ContentInputButtonDiv>
        <ContentInputButton type='button' value='장소 추가' onClick={() => setOpen(true)} _width='104px' _heigth='49px' />
        <ContentInputButton type='button' value='장소 찾기' _width='104px' _heigth='49px' />
      </ContentInputButtonDiv>
    </ContentPlaceDiv>
  )
}

export default PlacePage