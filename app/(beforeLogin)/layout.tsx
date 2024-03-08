"use client";
import { ReactNode, useEffect, useState } from "react";
import styles from "@/app/(beforeLogin)/_component/homeLayout.module.css";
import { usePathname } from "next/navigation";
import { isMapPage } from "../_utils/navigationUtils";
import cx from "classnames";
import LocationNav from "./_component/LocationNav/LocationNav";

type Props = { children: ReactNode; map: ReactNode };

export default function Layout({ children, map }: Props) {
  const path = usePathname();
  const [mapState, setMapState] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <LocationNav />
        <div
          className={cx(
            styles.navConetentContainer,
            mapState && styles.noneDisplay
          )}
        >
          {children}
        </div>
        <div
          className={cx(
            styles.mapContainer,
            mapState && styles.narrowMapContainer
          )}
        >
          {map}
        </div>
      </div>
    </div>
  );
}
