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
    promise: false,
    road: false,
    bus: false,
    subway: false,
  });

  const [mapRecoil, setMapRecoil] = useRecoilState<IMarkers>(mapAtom);

  const onToggle = (path: string, name: string) => {
    setActive({
      promise: false,
      road: false,
      bus: false,
      subway: false,
    });

    setActive((prev) => ({ ...prev, [name]: true }));
    router.push(path);
  };
  console.log(active);
  useEffect(() => {
    const categories = Object.keys(active);
    const activatedCategory = judgeActivation(categories, layoutSegments);
    if (activatedCategory) {
      setActive((prev) => ({ ...prev, [activatedCategory]: true }));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navLogoWrapper}>
        <span className={styles.logo} onClick={() => onToggle("/", "")}>
          Meet Mate
        </span>
      </div>

      <div className={styles.searchWrapper}>
        <div
          className={styles.inputDiv}
          onClick={() => router.push("/locsearch")}
        >
          {mapRecoil.place_name}
        </div>
        <button className={styles.navButton}>
          <SearchIcon />
        </button>
      </div>

      <div className={styles.navContentWrapper}>
        <div className={styles.iconWrapper}>
          <div
            className={cx(styles.iconDiv, active.promise && styles.clickedIcon)}
            onClick={() => onToggle("/promise", "promise")}
          >
            <PlaceIcon />
            <span>약속 잡기</span>
          </div>
          <div
            className={cx(styles.iconDiv, active.road && styles.clickedIcon)}
            onClick={() => onToggle("/road", "road")}
          >
            <MapIcon />
            <span>길 찾기</span>
          </div>
          <div
            className={cx(styles.iconDiv, active.bus && styles.clickedIcon)}
            onClick={() => onToggle("/bus", "bus")}
          >
            <BusIcon />
            <span>버스</span>
          </div>
          <div
            className={cx(styles.iconDiv, active.subway && styles.clickedIcon)}
            onClick={() => onToggle("/subway", "subway")}
          >
            <SubwayIcon />
            <span>전철</span>
          </div>
        </div>
      </div>
    </div>
  );
}
