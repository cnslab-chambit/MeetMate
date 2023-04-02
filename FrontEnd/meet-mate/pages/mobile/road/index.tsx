import { HandleButton } from "@/m-styled-component/content-component/styled_place";
import { NavForm, NavSearchDiv2 } from "@/m-styled-component/nav-component/nav_styled";
import { LogoDiv, PromiseDiv, PromiseInput } from "@/m-styled-component/search_styled.ts/serch_styled";
import { IMarkers, loadAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

function Input() {
    const router = useRouter();
    const loadRecoil = useRecoilValue<IMarkers[]>(loadAtom);
    console.log(loadRecoil);
    return (
        <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
            <NavSearchDiv2>
                <PromiseDiv onClick={()=> router.push("/mobile/road/search")}>
                    {loadRecoil[0] ? loadRecoil[0].place_name : "장소를 입력해주세요"}
                </PromiseDiv>
                <PromiseDiv onClick={()=> router.push("/mobile/road/search")}>
                    {loadRecoil[1] ? loadRecoil[1].place_name : "장소를 입력해주세요"}
                </PromiseDiv>
            </NavSearchDiv2>
            
            {loadRecoil.length === 2 ? <button onClick={() => router.push("/mobile/road/map")}>길찾기</button> : null}
        </div>
    )
}

export default Input;