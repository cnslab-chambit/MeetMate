import PlaceDialog from "@/mobile-content/Dialog";
import { ButtonDiv, LogoDiv, LogoMent, PromiseButton, PromiseButton2, PromiseContainer, PromiseDiv, PromiseInput } from "@/m-styled-component/search-component/serch_styled";
import { countState, placeState, promiseIndex, promiseRoute, promiseState } from "@/mobile-content/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Logo from "../../../public/images/Logo.svg";
import CancelIcon from "../../../public/images/cancel.svg";
import { NavSearchDiv3 } from "@/m-styled-component/nav-component/nav_styled";
import { useRouter } from "next/router";

function Promise() {
    const router = useRouter();
    const [count, setCount] = useRecoilState(countState);
    const [open, setOpen] = useState<boolean>(false);
    const [placeAdd, setPlaceAdd] = useRecoilState(placeState);
    const setIndex = useSetRecoilState(promiseIndex);
    
    const onDelete = (target:number) =>{
    const newPlaces = placeAdd.filter((element)=>{
        return element.id !== target
    });
    
    setPlaceAdd(newPlaces)
  };

    const changePage = (id: number) => {
        setIndex(id);
        console.log(id);
        router.push(`/mobile/promise/search`);
    };

    const findPlace = (url: string) => {
      router.push(url);
    };

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
  }, [count]);
  
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
                        <NavSearchDiv3 key={element.id}>
                        <PromiseDiv
                        onClick={() => changePage(element.id)}>
                            {element.current}
                        </PromiseDiv>
                        <CancelIcon onClick={()=>onDelete(element.id)}/>
                        </NavSearchDiv3>
                    )
                    :
                    (
                        <PromiseDiv
                        key={element.id}
                        onClick={() => changePage(element.id)}
                        >{element.current}
                        </PromiseDiv>
                    )
                })}
            </LogoDiv>
            <ButtonDiv>
                <PromiseButton onClick={() => setOpen(true)} >장소 추가</PromiseButton>
                <PromiseButton2 onClick={() => findPlace("/mobile/promise/map")}>장소 찾기</PromiseButton2>
            </ButtonDiv>
        </PromiseContainer>
    );
}

export default Promise;