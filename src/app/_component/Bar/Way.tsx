import SubwayIcon from "@/public/images/subway.svg";
import BusIcon from "@/public/images/bus.svg";
import WalkIcon from "@/public/images/Walk.svg";
import { useEffect, useState } from "react";
import styles from "./way.module.css";
import { barColorType } from "../../_utils/colorSelection";

const printName = (type: any, subway: any, bus: any) => {
  if (type === 3) {
    return;
  } else if (type === 1) {
    return `${subway}`;
  } else if (type === 2) {
    return `${bus}`;
  }
};

function Way(props: any) {
  const trafficType = props.trafficType;
  const codeType = {
    'trafficType': props.trafficType,
    'subwayCode': props.subwayCode,
    'buswayCode': props.buswayCode,
  }
  const [color, setColor] = useState("gray");
  useEffect(() => {
    barColorType(codeType, setColor)
  }, [props]);

  return (
    <div>
      {trafficType !== 3 && (
        <div className={styles.wayContainer}>
          <div className={styles.iconDiv}>
            <svg className={styles.iconSvg} viewBox="0 0 50 50">
              {trafficType === 1 ? (
                <SubwayIcon style={{ fill: color }} />
              ) : trafficType === 2 ? (
                <BusIcon style={{ fill: color }} />
              ) : (
                <WalkIcon style={{ fill: color }} />
              )}
            </svg>
          </div>
          {printName(trafficType, props?.subwayName, props?.busNo)}
        </div>
      )}
    </div>
  );
}

export default Way;
