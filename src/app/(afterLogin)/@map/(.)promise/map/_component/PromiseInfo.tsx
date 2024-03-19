import styles from "./promiseInfo.module.css";
import { useRecoilValue } from "recoil";
import { trafficState } from "@/src/app/_atom/atom";
import Way from "@/src/app/_component/Bar/Way";
import Gauge from "@/src/app/_component/Bar/Gauge";

function PromiseInfo(pathRecoil: any) {
  const pathValue = useRecoilValue(trafficState);
  return (
    <div className={styles.roadInfoDiv}>
      {pathRecoil.pathRecoil ? (
        <div className={styles.transferBox}>
          <div className={styles.timeBox}>
            <div className={styles.flexBox}>
              <div className={styles.boldPg}>
                {Math.floor(pathRecoil.pathRecoil?.info?.totalTime / 60)}
              </div>
              시간
              <div className={styles.boldPg}>
                {pathRecoil.pathRecoil?.info?.totalTime % 60}분
              </div>
              <div className={styles.flexBox}>
                | {pathRecoil.pathRecoil?.info.payment}원
              </div>
            </div>
            <div className={styles.flexBoxCol}>
              <div className={styles.baseBar}>
                {pathRecoil.pathRecoil?.subPath.map(
                  (subPath: any, index: number) => (
                    <Gauge
                      key={index}
                      sectionWidth={subPath.sectionTime}
                      totalWidth={pathRecoil.pathRecoil.info.totalTime}
                      trafficType={subPath.trafficType}
                      lane={subPath?.lane ? subPath.lane[0].name : "도보"}
                      subwayCode={
                        subPath?.lane ? subPath?.lane[0].subwayCode : "none"
                      }
                      buswayCode={
                        subPath?.lane ? subPath?.lane[0].type : "none"
                      }
                    />
                  )
                )}
              </div>
            </div>
            <div className={styles.wayBar}>
              {pathRecoil.pathRecoil?.subPath.map(
                (subPath: any, index: number) => (
                  <Way
                    key={index}
                    subwayName={subPath?.lane ? subPath?.lane[0].name : "none"}
                    busNo={subPath?.lane ? subPath?.lane[0].busNo : "none"}
                    trafficType={subPath?.trafficType}
                    subwayCode={
                      subPath?.lane ? subPath?.lane[0].subwayCode : "none"
                    }
                    buswayCode={subPath?.lane ? subPath?.lane[0].type : "none"}
                  />
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PromiseInfo;
