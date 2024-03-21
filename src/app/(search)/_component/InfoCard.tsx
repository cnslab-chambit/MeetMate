import { IMarkers } from "../../_interfaces/interface";
import styles from "./InfoCard.module.css";
import Pin from "@/public/images/pin.svg";

type Props = { data: IMarkers; onDivClicked: (data: IMarkers) => void };

export default function InfoCard({ data, onDivClicked }: Props) {
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
