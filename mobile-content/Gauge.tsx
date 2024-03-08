import { useEffect, useState } from "react";
import styled from "styled-components";
import SubwayIcon from "../public/images/subway.svg";
import BusIcon from "../public/images/bus.svg";
import WalkIcon from "../public/images/Walk.svg";
import {
  RangeContainer,
  RangeText,
  SvgConatiner,
  Range,
} from "@/m-styled-component/road-compontnt/road_styled";

function Gauge(props: any) {
  let ratio = Math.round(
    (((props.sectionWidth as number) / props.totalWidth) as number) * 100
  );
  const trafficType = props.trafficType;
  const section = props.sectionWidth;
  const [color, setColor] = useState("gray");

  useEffect(() => {
    setColor("none");
    if (trafficType === 3) {
      setColor("#c8c7c7");
    } else if (trafficType === 2) {
      //bus -> type 11이면 마을버스?
      if (
        props.buswayCode === 4 ||
        props.buswayCode === 6 ||
        props.buswayCode === 14
      ) {
        setColor("#E86359");
      } else if (props.buswayCode === 1) {
        setColor("#95C53C");
      } else if (props.buswayCode === 3) {
        setColor("#74a813");
      } else if (props.buswayCode === 11) {
        setColor("#2560e8");
      } else if (props.buswayCode === 12) {
        setColor("#74a813");
      }
    } else if (trafficType === 1) {
      //지하철
      if (props.subwayCode === 1) {
        setColor("#11419F");
      } else if (props.subwayCode === 2) {
        setColor("#37B42D");
      } else if (props.subwayCode === 3) {
        setColor("#FA5F2C");
      } else if (props.subwayCode === 4) {
        setColor("#3E7AD6");
      } else if (props.subwayCode === 5) {
        setColor("#9A58C0");
      } else if (props.subwayCode === 6) {
        setColor("#9D5316");
      } else if (props.subwayCode === 7) {
        setColor("#97A05A");
      } else if (props.subwayCode === 8) {
        setColor("#F073A4");
      } else if (props.subwayCode === 9) {
        setColor("#C3A52D");
      } else if (props.subwayCode === 9) {
        setColor("#C3A52D");
      } else if (props.subwayCode === 109) {
        setColor("#A9022D");
      } else if (props.subwayCode === 104) {
        setColor("#7DC4A5");
      } else if (props.subwayCode === 101) {
        setColor("#70B7E5");
      } else if (props.subwayCode === 116) {
        setColor("#ffe600");
      } else if (props.subwayCode === 107) {
        setColor("#80CE79");
      } else if (props.subwayCode === 107) {
        setColor("#80CE79");
      } else if (props.subwayCode === 22) {
        setColor("#FFB952");
      } else if (props.subwayCode === 113) {
        setColor("#CAC615");
      } else if (props.subwayCode === 108) {
        setColor("#26A97F");
      } else if (props.subwayCode === 117) {
        setColor("#003499");
      } else if (props.subwayCode === 110) {
        setColor("#FF8E00");
      } else if (props.subwayCode === 115) {
        setColor("#9F7E20");
      }
    }
  }, [props]);

  return (
    <RangeContainer ratio={section === 0 ? 0 : ratio < 12 ? 12 : ratio}>
      {section > 0 ? (
        <Range
          ratio={ratio as number}
          trafficType={props.trafficType as number}
          subwayColor={color}
        >
          <div style={{ display: "flex" }}>
            <SvgConatiner subwayColor={color}>
              <svg viewBox="0 0 50 50">
                {trafficType === 1 ? (
                  <SubwayIcon />
                ) : trafficType === 2 ? (
                  <BusIcon />
                ) : (
                  <WalkIcon />
                )}
              </svg>
            </SvgConatiner>
            <RangeText>{section !== 0 && `${section}분`}</RangeText>
          </div>
        </Range>
      ) : null}
    </RangeContainer>
  );
}

export default Gauge;
