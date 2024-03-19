"use client";
import { useRecoilState } from "recoil";
import { storeState } from "@/src/app/_atom/atom";

import styles from "./info.module.css";
import Star from "@/public/images/star.svg";
import RoadArrow from "@/public/images/roadArrow.svg";
import Sad from "@/public/images/sad.svg";

type Props = {
  buttonIndex: number;
  setInfo: any;
  divSetBound: any;
};

function Info({ buttonIndex, setInfo, divSetBound }: Props) {
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeState);

  const divClick = (store: any) => {
    setInfo(store.place_name);
    divSetBound(store);
  };

  return (
    <div className={styles.infoDiv}>
      {buttonIndex === -1 ? (
        storeRecoil?.map((element: any) =>
          element.searchList.map((store: any) => (
            <div
              className={styles.detailDiv}
              key={store.id}
              onClick={() => divClick(store)}
            >
              <div className={styles.placeName}>
                {store.place_name}
                <Star />
                <div className={styles.starSpan}>{store.star_rate}</div>
                <div className={styles.categoryDiv}>
                  {element.category_name}
                </div>
              </div>
              <div className={styles.placeAddress}>{store.address}</div>
              <div className={styles.roadButton}>
                <RoadArrow />길 찾기
              </div>
            </div>
          ))
        )
      ) : storeRecoil[buttonIndex]?.searchList.length ? (
        storeRecoil[buttonIndex]?.searchList.map((store) => (
          <div
            className={styles.detailDiv}
            key={store.id}
            onClick={() => divClick(store)}
          >
            <div className={styles.placeName}>
              {store.place_name}
              <Star />
              <div>{store.star_rate}</div>
            </div>
            <div className={styles.placeAddress}>{store.address}</div>
            <div className={styles.roadButton}>
              <RoadArrow />길 찾기
            </div>
          </div>
        ))
      ) : (
        <div className={styles.nonStoreDiv}>
          마땅한 장소가 없네요!
          <Sad />
        </div>
      )}
    </div>
  );
}

export default Info;
