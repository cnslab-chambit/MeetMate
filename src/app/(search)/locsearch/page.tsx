"use client";

import { mapAtom, markerAtom } from "@/src/app/_atom/atom";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import InfoCard from "../_component/InfoCard";
import styles from "../_component/InfoCard.module.css";
import { IMarkers } from "../../_interfaces/interface";

function Home() {
  const router = useRouter();
  const markerRecoil = useRecoilValue<IMarkers[]>(markerAtom);
  const mapRecoil = useSetRecoilState<IMarkers>(mapAtom);
  const onDivClicked = (data: IMarkers) => {
    mapRecoil(data);
    router.back();
  };

  return (
    <div className={styles.locationContainer}>
      {markerRecoil?.map((data: IMarkers, index: number) => (
        <InfoCard key={index} data={data} onDivClicked={onDivClicked} />
      ))}
    </div>
  );
}

export default Home;
