import PlaceDialog from "@/mobile-content/Dialog";
import { ButtonDiv, LogoDiv, LogoMent, PromiseButton, PromiseButton2, PromiseContainer, PromiseDiv, PromiseInput } from "@/m-styled-component/search-component/serch_styled";
import { countState, placeState } from "@/mobile-content/atom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Logo from "../../../public/images/Logo.svg";
import CancelIcon from "../../../public/images/cancel.svg";
import { NavSearchDiv3 } from "@/m-styled-component/nav-component/nav_styled";

function Promise() {
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
        <PromiseContainer>
            {open ? (<PlaceDialog setOpen={setOpen} setCount={setCount}></PlaceDialog>): null}
            <LogoDiv>
                <Logo/>
                <LogoMent>출발지를 입력하고 <br/>장소찾기를 눌러 주세요!</LogoMent>
            </LogoDiv>
            <LogoDiv>
                {placeAdd.map((element, index) => {
                    return index > 1 ? (
                        <NavSearchDiv3>
                        <PromiseDiv key={element.id}>
                            {element.current}
                        </PromiseDiv>
                        <CancelIcon onClick={()=>onDelete(element.id)}/>
                        </NavSearchDiv3>
                    ):(
                        <PromiseDiv>{element.current}</PromiseDiv>
                    )
                })}
            </LogoDiv>
            <ButtonDiv>
                <PromiseButton onClick={() => setOpen(true)} >장소 추가</PromiseButton>
                <PromiseButton2>장소 찾기</PromiseButton2>
            </ButtonDiv>
        </PromiseContainer>
    );
}

export default Promise;