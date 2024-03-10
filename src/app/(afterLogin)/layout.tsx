"use client";
import { ReactNode, useEffect, useState } from "react";
import SearchNav from "../_component/SearchNav/SearchNav";
import styles from "./_component/homeLayout.module.css";
import { usePathname } from "next/navigation";
import { isMapPage } from "../_utils/navigationUtils";
import cx from "classnames";

type Props = { children: ReactNode; map: ReactNode };

export default function Layout({ children, map }: Props) {
  const path = usePathname();
  const [mapState, setMapState] = useState(false);

  useEffect(() => {
    setMapState(isMapPage(path));
  }, [path]);

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <SearchNav />
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
