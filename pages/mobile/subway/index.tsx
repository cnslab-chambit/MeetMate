import {
  subwayDataState,
  subwayInputState,
  subwayListState,
  subwayMarkerState,
  subwaySearchState,
  subwayState,
} from "@/atom/atoms";
import SubwayCard from "@/desktop-search-list/SubwayCard";
import SubwaySearchList from "@/desktop-search-list/SubwaySearchList";
import { IMarkers } from "@/interface/desktop_intergace";
import SubWay from "@/mobile-content/SubWay";
import SubwayDot from "@/mobile-content/SubwayDot";
import { subwayPathState } from "@/mobile-content/atom";
import { roadSearchApi } from "@/mobile-content/fx";
import {
  ContentInput,
  ContentInputButton,
  ContentInputDiv,
} from "@/m-styled-component/index-component/styled_index";
import {
  CrossIconDiv,
  CrossInputDiv,
  RoadButtonDiv,
  RoadDiv,
  RoadForm,
} from "@/m-styled-component/subway-component/subway_styled";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import SubWayList from "@/mobile-content/SubWayList";
import {
  LogoMent,
  PromiseButton,
  PromiseButton2,
} from "@/m-styled-component/search-component/serch_styled";
import SubwayLogo from "../../../public/images/subwayLogo.svg";
import Image from "next/image";

function SubwayPage() {
  const [pathClick, setPathClick] = useRecoilState(subwayPathState);
  const [subway, setSubway] = useRecoilState(subwayState);
  const [markerRecoil, setMarkerRecoil] =
    useRecoilState<IMarkers[]>(subwayMarkerState);
  const [subwayList, setSubwayList] = useRecoilState(subwayListState);
  const [markers, setMarkers] = useState<any>();
  const setSubwayInputCheck = useSetRecoilState(subwayInputState);
  const [subwaySearch, setSubwaySearch] = useRecoilState(subwaySearchState);
  const setSubwayData = useSetRecoilState(subwayDataState);
  const { start, end } = subway;
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setSubway({
      ...subway,
      [name]: value,
    });
  };
  const onSearch = async () => {
    let subwayData = await roadSearchApi(subwaySearch);
    if (!subwayData) {
      return;
    }
    setSubwayData(subwayData);
    setSubwayList(true);
  };
  const handleSubmit = (e: any, keyword: string) => {
    e.preventDefault();

    !keyword.includes("역") ? (keyword += "역") : null;

    const ps = new kakao.maps.services.Places();

    if (ps === undefined || ps === null) return;
    ps.keywordSearch(
      keyword,
      (data: IMarkers[], status: any, _pagination: any) => {
        console.log(e.target.value);
        console.log(kakao.maps.services.Status.OK);
        if (status === kakao.maps.services.Status.OK) {
          let markers = [];
          markers = data
            .filter((e) => e.category_group_code == "SW8")
            .map((e) => {
              return {
                address_name: e.address_name,
                category_group_code: e.category_group_code,
                category_group_name: e.category_group_name,
                category_name: e.category_name,
                distance: e.distance,
                id: e.id,
                phone: e.phone,
                place_name: e.place_name,
                place_url: e.place_url,
                road_address_name: e.road_address_name,
                x: e.x,
                y: e.y,
              };
            });
          setMarkers(markers);
          setMarkerRecoil(markers);
        }
      }
    );
    setSubwayList(false);
    e.target.name === "start"
      ? setSubwayInputCheck(true)
      : setSubwayInputCheck(false);
  };
  const onCross = () => {
    setSubway({
      start: end,
      end: start,
    });
    setSubwaySearch({
      start_point: {
        lat: subwaySearch.end_point.lat,
        lng: subwaySearch.end_point.lng,
      },
      end_point: {
        lat: subwaySearch.start_point.lat,
        lng: subwaySearch.start_point.lng,
      },
    });
    onSearch();
  };
  const onReset = () => {
    setSubway({
      start: "",
      end: "",
    });
  };

  return (
    <RoadDiv>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <SubwayLogo />
      </div>
      <LogoMent>지하철역 입력</LogoMent>
      <CrossInputDiv>
        <ContentInputDiv active={false}>
          <RoadForm
            name="start"
            onSubmit={(e) => {
              handleSubmit(e, start);
            }}
          >
            <ContentInput
              active={false}
              name="start"
              value={start}
              onChange={onChange}
              placeholder="출발역"
            />
          </RoadForm>
          <RoadForm
            name="end"
            onSubmit={(e) => {
              handleSubmit(e, end);
            }}
          >
            <ContentInput
              active={false}
              name="end"
              value={end}
              onChange={onChange}
              placeholder="도착역"
            />
          </RoadForm>
        </ContentInputDiv>
        <CrossIconDiv onClick={onCross}>
          <CrossIconDiv />
        </CrossIconDiv>
      </CrossInputDiv>
      <RoadButtonDiv>
        <PromiseButton type="button" onClick={onReset} value="다시 입력">
          다시 입력
        </PromiseButton>
        <PromiseButton2 type="button" onClick={onSearch} value="전철 검색">
          전철 검색
        </PromiseButton2>
      </RoadButtonDiv>

      {pathClick ? <SubwayDot /> : subwayList ? <SubWay /> : <SubWayList />}
    </RoadDiv>
  );
}

export default SubwayPage;
