"use client";
import { Inter } from "next/font/google";
import PlaceIcon from "@/public/images/place.svg";
import MapIcon from "@/public/images/map.svg";
import BusIcon from "@/public/images/bus.svg";
import SubwayIcon from "@/public/images/subway.svg";
import SearchIcon from "@/public/images/search.svg";
import { useRouter } from "next/navigation";
import { IMarkers, mapAtom, pageState } from "../../atom/atom";
import { useRecoilState } from "recoil";
import { PromiseDiv } from "@/m-styled-component/search-component/serch_styled";
import * as S from "./SearchNav.styles";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [inputs, setInputs] = useRecoilState(pageState);
  const { place, map, bus, subway } = inputs;
  const [mapRecoil, setMapRecoil] = useRecoilState<IMarkers>(mapAtom);

  const onTogle = (path: string, name: string) => {
    setInputs({
      place: name === "place" ? true : false,
      map: name === "map" ? true : false,
      bus: name === "bus" ? true : false,
      subway: name === "subway" ? true : false,
    });
    router.push(path);
  };

  return (
    <S.Navigation>
      <S.NavDiv>
        <S.NavLogo onClick={() => router.push("/mobile")}>Meet Mate</S.NavLogo>
      </S.NavDiv>

      <S.NavSearchDiv2>
        <PromiseDiv onClick={() => router.push("/mobile/search")}>
          {mapRecoil.place_name}
        </PromiseDiv>
        <S.NavButton>
          <SearchIcon />
        </S.NavButton>
      </S.NavSearchDiv2>

      <S.NavIconContainer>
        <S.NavIconDiv>
          <S.IconTextDiv
            isActive={place}
            onClick={() => onTogle("/mobile/promise", "place")}
          >
            <PlaceIcon fill="black" />
            <S.NavIconText>약속 잡기</S.NavIconText>
          </S.IconTextDiv>
          <S.IconTextDiv
            isActive={map}
            onClick={() => onTogle("/mobile/road", "map")}
          >
            <MapIcon fill="black" />
            <S.NavIconText>길 찾기</S.NavIconText>
          </S.IconTextDiv>
          <S.IconTextDiv
            isActive={bus}
            onClick={() => onTogle("/mobile/bus", "bus")}
          >
            <BusIcon fill="black" />
            <S.NavIconText>버스</S.NavIconText>
          </S.IconTextDiv>
          <S.IconTextDiv
            isActive={subway}
            onClick={() => onTogle("/mobile/subway", "subway")}
          >
            <SubwayIcon fill="black" />
            <S.NavIconText>전철</S.NavIconText>
          </S.IconTextDiv>
        </S.NavIconDiv>
      </S.NavIconContainer>
    </S.Navigation>
  );
}
