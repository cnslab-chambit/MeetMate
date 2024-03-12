"use client";

import {
  IMarkers,
  markerAtom,
  placeState,
  promiseIndex,
  promiseState,
} from "@/src/app/_atom/atom";
import styles from "../_component/InfoCard.module.css";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import InfoCard from "../_component/InfoCard";

function SearchList() {
  const router = useRouter();
  const id = useRecoilValue(promiseIndex);
  const [markerRecoil, setMarkerRecoil] =
    useRecoilState<IMarkers[]>(markerAtom);
  const setPromiseState = useSetRecoilState(promiseState);
  const [placeAdd, setPlaceAdd] = useRecoilState(placeState);

  const onDivClicked = (data: IMarkers) => {
    setPromiseState((prev) => {
      const updatedPromise = [...prev];
      updatedPromise[id] = { ...data };
      return updatedPromise;
    });

    setPlaceAdd((prev) => {
      const updatedPlaceAdd = [...prev];
      updatedPlaceAdd[id] = {
        ...updatedPlaceAdd[id],
        current: data.place_name,
      };
      return updatedPlaceAdd;
    });
    router.push("/promise");
  };

  return (
    <div className={styles.locationContainer}>
      {markerRecoil?.map((data: IMarkers, index: number) => (
        <InfoCard key={index} data={data} onDivClicked={onDivClicked} />
      ))}
    </div>
  );
}

export default SearchList;