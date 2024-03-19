import { useEffect, useState } from "react";
import SubwayIcon from "@/public/images/subway.svg";
import BusIcon from "@/public/images/bus.svg";
import WalkIcon from "@/public/images/Walk.svg";
import styles from "./guage.module.css";
import { barColorType } from "../../_utils/colorSelection";

function Gauge(props: any) {
  const ratio = Math.round(
    (((props.sectionWidth as number) / props.totalWidth) as number) * 100
  );
  const codeType = {
    'trafficType': props.trafficType,
    'subwayCode': props.subwayCode,
    'buswayCode': props.buswayCode,
  }
  const section = props.sectionWidth;
  const [color, setColor] = useState("gray");
  useEffect(() => {
    setColor("none");
    barColorType(codeType, setColor)
  }, [props]);

  return (
    <div style={{ width: `${section === 0 ? 0 : ratio < 12 ? 12 : ratio}%` }}>
      {section > 0 ? (
        <div className={styles.range} style={{ backgroundColor: `${color}` }}>
          <div style={{ display: "flex" }}>
            <div
              className={styles.svgContainer}
              style={{
                backgroundColor: color === "#c8c7c7" ? "gray" : `${color}`,
              }}
            >
              <svg viewBox="0 0 50 50">
                {codeType.trafficType === 1 ? (
                  <SubwayIcon />
                ) : codeType.trafficType === 2 ? (
                  <BusIcon />
                ) : (
                  <WalkIcon />
                )}
              </svg>
            </div>
            <div className={styles.rangeText}>
              {section !== 0 && `${section}분`}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Gauge;
