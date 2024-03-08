"use client";
import {
  IMarkers,
  divNumAtom,
  loadAtom,
  mapAtom,
  markerAtom,
} from "@/mobile-content/atom";

import Pin from "@/public/images/pin.svg";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import {
  LocationContainer,
  LocationDiv,
  LocationName,
  SearchSVG,
} from "@/m-styled-component/search-component/serch_styled";
import InfoCard from "./_component/InfoCard";

function Search() {
  const router = useRouter();
  const [markerRecoil, setMarkerRecoil] =
    useRecoilState<IMarkers[]>(markerAtom);
  const [loadRecoil, setLoadRecoil] = useRecoilState<IMarkers[]>(loadAtom);
  const [divNum, setDivNum] = useRecoilState(divNumAtom);
  const onDivClicked = (data: IMarkers) => {
    if (divNum === "start") {
      if (loadRecoil.length === 0) {
        setLoadRecoil([data]);
      } else {
        setLoadRecoil([data, ...loadRecoil.slice(1)]);
      }
    } else if (divNum === "end") {
      if (loadRecoil.length === 0) {
        setLoadRecoil((prev) => [...prev, data]);
      } else {
        setLoadRecoil([...loadRecoil.slice(0, 1), data]);
      }
    }
    router.push("/road/map");
  };

  useEffect(() => {}, [markerRecoil]);
  return (
    <LocationContainer>
      {markerRecoil?.map((data: IMarkers, index: number) => (
        <InfoCard key={index} data={data} />
      ))}
    </LocationContainer>
  );
}

export default Search;
