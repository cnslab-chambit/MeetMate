import React, { useEffect, useState } from 'react'
import {
  ContentInputDiv,
  ContentInput,
  ContentInputButton,
  ContentInputForm,
  ContentInputIconDiv,
} from '@/styled-component/content-component/styled_content'
import PlaceDialog from '@/dialog/PlaceDialog';
import { useRecoilState } from 'recoil';
import { countState, placeState } from '@/atom/atoms';
import CancelIcon from '../public/images/cancel.svg'
function PlacePage() {
  const [count, setCount] = useRecoilState(countState);
  const [open, setOpen] = useState<boolean>(false);
  const [placeAdd, setPlaceAdd] = useRecoilState(placeState);
  const onDelete = (target:number) =>{
    const newPlaces = placeAdd.filter((element)=>{
      console.log(element.id,target)
        return element.id !== target
    })
    
    setPlaceAdd(newPlaces)
  }
  useEffect(() => {
    const newPlaces = [];
    for (let i = placeAdd.length; i < placeAdd.length + (+count); i++) {
      const newPlace = {
        id: i,
        current: `${i + 1}번째 장소`,
      };
      newPlaces.push(newPlace);
    }
    setPlaceAdd([...placeAdd, ...newPlaces]);
    setCount(0)
  }, [count])

  return (
    <ContentInputForm>
      {open ? (<PlaceDialog setOpen={setOpen} setCount={setCount}></PlaceDialog>) : (null)}
      <ContentInputDiv>
        {placeAdd.map((element, index: any) => {
          return index > 1 ? (
            <ContentInputIconDiv>
              <ContentInput active={true} placeholder={element.current} key={element.id}></ContentInput>
                <CancelIcon onClick={()=>onDelete(element.id)}/>
            </ContentInputIconDiv>
          ) : (
            <ContentInput active={false} placeholder={element.current} key={element.id}></ContentInput>
          );
        })}
      </ContentInputDiv>
      <ContentInputButton type='button' value='장소 추가' onClick={() => setOpen(true)} ></ContentInputButton>
      <ContentInputButton type='button' value='장소 찾기'></ContentInputButton>
    </ContentInputForm>
  )
}

export default PlacePage