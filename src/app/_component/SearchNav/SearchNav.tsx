"use client";
import styles from "./searchNav.module.css";
import { Inter } from "next/font/google";
import PlaceIcon from "@/public/images/place.svg";
import MapIcon from "@/public/images/map.svg";
import BusIcon from "@/public/images/bus.svg";
import SubwayIcon from "@/public/images/subway.svg";
import SearchIcon from "@/public/images/search.svg";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { mapAtom, pageState } from "../../_atom/atom";
import { useRecoilState } from "recoil";
import cx from "classnames";
import { useEffect, useState } from "react";
import { judgeActivation } from "@/src/app/_utils/navigationUtils";
import { IMarkers } from "../../_interfaces/interface";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const layoutSegments = useSelectedLayoutSegments();
  const [active, setActive] = useState({
    place: false,
    map: false,
    bus: false,
    subway: false,
  });

  const [mapRecoil, setMapRecoil] = useRecoilState<IMarkers>(mapAtom);

  const onToggle = (path: string, name: string) => {
    setActive({
      place: false,
      map: false,
      bus: false,
      subway: false,
    });

    setActive((prev) => ({ ...prev, [name]: true }));
    router.push(path);
  };

  useEffect(() => {
    const categories = Object.keys(active);
    const activatedCategory = judgeActivation(categories, layoutSegments);
    setActive((prev) => ({ ...prev, [activatedCategory]: true }));
    console.log("hi");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navLogoWrapper}>
        <span className={styles.logo} onClick={() => onToggle("/", "")}>
          Meet Mate
        </span>
      </div>

      <div className={styles.searchWrapper}>
        <div className={styles.inputDiv} onClick={() => router.push("/search")}>
          {mapRecoil.place_name}
        </div>
        <button className={styles.navButton}>
          <SearchIcon />
        </button>
      </div>

      <div className={styles.navContentWrapper}>
        <div className={styles.iconWrapper}>
          <div
            className={cx(styles.iconDiv, active.place && styles.clickedIcon)}
            onClick={() => onToggle("/promise", "place")}
          >
            <PlaceIcon fill="black" />
            <span>약속 잡기</span>
          </div>
          <div
            className={cx(styles.iconDiv, active.map && styles.clickedIcon)}
            onClick={() => onToggle("/road", "map")}
          >
            <MapIcon fill="black" />
            <span>길 찾기</span>
          </div>
          <div
            className={cx(styles.iconDiv, active.bus && styles.clickedIcon)}
            onClick={() => onToggle("/bus", "bus")}
          >
            <BusIcon fill="black" />
            <span>버스</span>
          </div>
          <div
            className={cx(styles.iconDiv, active.subway && styles.clickedIcon)}
            onClick={() => onToggle("/subway", "subway")}
          >
            <SubwayIcon fill="black" />
            <span>전철</span>
          </div>
        </div>
      </div>
    </div>
  );
}
