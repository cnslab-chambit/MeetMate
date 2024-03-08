"use client";
import { IMarkers, divNumAtom, loadAtom } from "@/mobile-content/atom";
import styles from "./InfoCard.module.css";
import Pin from "@/public/images/pin.svg";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

export default function InfoCard({ data }: { data: IMarkers }) {
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
    <div className={styles.container} onClick={() => onDivClicked(data)}>
      <div className={styles.iconDiv}>
        <Pin />
      </div>
      <div>
        <div className={styles.roughInfo}>
          <div className={styles.placeName}>
            {data.place_name.length > 14
              ? `${data.place_name.substr(0, 14)}...`
              : data.place_name}
          </div>
          <span className={styles.category}>{data.category_group_name}</span>
        </div>
        {data.road_address_name && (
          <div className={styles.addressName}>{data.road_address_name}</div>
        )}
      </div>
    </div>
  );
}
