"use client";
import SearchIcon from "@/public/images/search.svg";
import MapIcon from "@/public/images/map2.svg";
import XIcon from "@/public/images/X.svg";
import { useState } from "react";
import styles from "./locationNav.module.css";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import axios from "axios";
import { IMarkers, markerAtom, searchAtom } from "@/src/app/_atom/atom";
import { useRouter } from "next/navigation";

function LocationNav() {
  const [keyword, setKeyword] = useState("");
  const [markers, setMarkers] = useState<any[]>([]);
  const [markerRecoil, setMarkerRecoil] =
    useRecoilState<IMarkers[]>(markerAtom);
  const router = useRouter();
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
    <div className={styles.container}>
      <div className={styles.navDiv}>
        <div className={styles.navLogo} onClick={() => moveOtherPage("/")}>
          Meet Mate
        </div>
      </div>
      <div className={styles.navBasicDiv}>
        <div
          className={styles.navColDiv}
          onClick={() => moveOtherPage("/search")}
        >
          <MapIcon />
          지도
        </div>
        <div className={styles.navSearchDiv}>
          <form className={styles.navForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="키워드(ex 광운대, 석계역)"
              onChange={onChange}
            ></input>
            <div className={styles.navButton}>
              <SearchIcon onSubmit={handleSubmit} />
            </div>
          </form>
        </div>
        <div className={styles.navColDiv}>
          <XIcon onClick={onXIconClicked} />
        </div>
      </div>
    </div>
  );
}

export default LocationNav;
