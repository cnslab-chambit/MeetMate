import {
  NavBasicDiv,
  NavButton,
  NavColDiv,
  NavDiv,
  NavForm,
  Navigation,
  NavInput,
  NavLogo,
  NavMenu,
  NavSearchDiv,
  NavSearchDiv2,
} from "@/m-styled-component/nav-component/nav_styled";
import { PromiseDiv } from "@/m-styled-component/search-component/serch_styled";
import { useRouter } from "next/router";
import Menu from "../../public/images/menu.svg";
import SearchIcon from "../../public/images/search.svg";
import MapIcon from "../../public/images/map2.svg";
import XIcon from "../../public/images/X.svg";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { IMarkers, markerAtom, searchAtom } from "../atom";
import axios from "axios";

function SearchNav() {
  const [keyword, setKeyword] = useState("");
  const [markers, setMarkers] = useState<any[]>([]);
  const [markerRecoil, setMarkerRecoil] =
    useRecoilState<IMarkers[]>(markerAtom);
  const markerReset = useResetRecoilState(markerAtom);
  const router = useRouter();
  const searchRecoil = useRecoilValue<any>(searchAtom);
  const url = "https://dapi.kakao.com/v2/local/search/keyword.json";

  const onXIconClicked = () => {
    setMarkerRecoil([]);
    router.back();
  };

  const onChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const moveOtherPage = (path: string) => {
    router.push(path);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchKeyword();
  };

  const searchKeyword = async () => {
    (async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOMAP_REST_API_KEY}`,
        },
        params: {
          query: keyword,
        },
      });

      let markers = [];

      for (let i = 0; i < response?.data.documents.length; i++) {
        markers.push({
          address_name: response?.data.documents[i].address_name,
          category_group_code: response?.data.documents[i].category_group_code,
          category_group_name: response?.data.documents[i].category_group_name,
          category_name: response?.data.documents[i].category_name,
          distance: response?.data.documents[i].distance,
          id: response?.data.documents[i].id,
          phone: response?.data.documents[i].phone,
          place_name: response?.data.documents[i].place_name,
          place_url: response?.data.documents[i].place_url,
          road_address_name: response?.data.documents[i].road_address_name,
          x: response?.data.documents[i].x,
          y: response?.data.documents[i].y,
        });
      }
      setMarkers(markers);

      setMarkerRecoil(markers);
    })();
  };

  // useEffect(() => {
  //   searchKeyword();
  // },[]);

  return (
    <Navigation>
      <NavDiv>
        <NavLogo onClick={() => moveOtherPage("/mobile")}>Meet Mate</NavLogo>
        <NavMenu></NavMenu>
      </NavDiv>
      <NavBasicDiv>
        <NavColDiv onClick={() => moveOtherPage("/mobile")}>
          <MapIcon />
          지도
        </NavColDiv>
        <NavSearchDiv>
          <NavForm onSubmit={handleSubmit}>
            <NavInput
              type="text"
              placeholder="키워드(ex 광운대, 석계역)"
              onChange={onChange}
            ></NavInput>
            <NavButton>
              <SearchIcon onSubmit={handleSubmit} />
            </NavButton>
          </NavForm>
        </NavSearchDiv>
        <NavColDiv>
          <XIcon onClick={onXIconClicked} />
        </NavColDiv>
      </NavBasicDiv>
    </Navigation>
  );
}

export default SearchNav;
