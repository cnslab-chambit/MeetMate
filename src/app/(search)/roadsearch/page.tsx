"use client";

import {
  divNumAtom,
  loadAtom,
  markerAtom,
} from "@/src/app/_atom/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../_component/InfoCard.module.css";
import InfoCard from "../_component/InfoCard";
import { useRouter } from "next/navigation";
import { IMarkers } from "../../_interfaces/interface";

function Search() {
  const markerRecoil = useRecoilValue<IMarkers[]>(markerAtom);
  const [loadRecoil, setLoadRecoil] = useRecoilState<IMarkers[]>(loadAtom);
  const [divNum, setDivNum] = useRecoilState(divNumAtom);
  const router = useRouter();

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
    router.push("/road");
  };
  return (
    <div className={styles.locationContainer}>
      {markerRecoil?.map((data: IMarkers, index: number) => (
        <InfoCard key={index} data={data} onDivClicked={onDivClicked} />
      ))}
    </div>
  );
}

export default Search;
