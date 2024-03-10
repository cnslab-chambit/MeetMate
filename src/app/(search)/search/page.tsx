"use client";

import { IMarkers, mapAtom, markerAtom } from "@/src/app/_atom/atom";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import InfoCard from "../_component/InfoCard";
import styles from "../_component/InfoCard.module.css";

function Home() {
  const router = useRouter();
  const [markerRecoil, setMarkerRecoil] =
    useRecoilState<IMarkers[]>(markerAtom);
  const mapRecoil = useSetRecoilState<IMarkers>(mapAtom);
  const onDivClicked = (data: IMarkers) => {
    mapRecoil(data);
    router.push("/");
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
