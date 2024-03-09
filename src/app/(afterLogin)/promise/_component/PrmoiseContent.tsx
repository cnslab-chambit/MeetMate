"use client";

import PlaceDialog from "@/src/app/(afterLogin)/promise/_component/Dialog";
import { countState, placeState, promiseIndex } from "@/src/app/_atom/atom";
import styles from "../_component/promise.module.css";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Logo from "@/public/images/Logo.svg";
import CancelIcon from "@/public/images/cancel.svg";
import { useRouter } from "next/navigation";

function PromiseContent() {
  const router = useRouter();
  const [count, setCount] = useRecoilState(countState);
  const [open, setOpen] = useState<boolean>(false);
  const [placeAdd, setPlaceAdd] = useRecoilState(placeState);
  const setIndex = useSetRecoilState(promiseIndex);

  const onDelete = (target: number) => {
    const newPlaces = placeAdd.filter((element) => {
      return element.id !== target;
    });

    setPlaceAdd(newPlaces);
  };

  const changePage = (id: number) => {
    setIndex(id);
    router.push(`/promisesearch`);
  };

  const findPlace = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    const newPlaces = [];
    for (let i = placeAdd.length; i < placeAdd.length + +count; i++) {
      const newPlace = {
        id: i,
        current: `${i + 1}번째 장소`,
      };
      newPlaces.push(newPlace);
    }
    setPlaceAdd([...placeAdd, ...newPlaces]);
    setCount(0);
  }, [count]);

  return (
    <div className={styles.promiseContainer}>
      {open && <PlaceDialog setOpen={setOpen} setCount={setCount} />}
      <div className={styles.logoDiv}>
        <Logo />
        <div className={styles.logoMent}>
          출발지를 입력하고 <br />
          장소찾기를 눌러 주세요!
        </div>
      </div>
      <div className={styles.logoDiv}>
        {placeAdd.map((element, index) => {
          return index > 1 ? (
            <label className={styles.navSearchDiv} key={element.id}>
              <div
                className={styles.promise}
                onClick={() => changePage(element.id)}
              >
                {element.current}
              </div>
              <CancelIcon onClick={() => onDelete(element.id)} />
            </label>
          ) : (
            <div
              className={styles.promise}
              key={element.id}
              onClick={() => changePage(element.id)}
            >
              {element.current}
            </div>
          );
        })}
      </div>
      <div className={styles.buttonDiv}>
        <div className={styles.promiseButton} onClick={() => setOpen(true)}>
          장소 추가
        </div>
        <div
          className={styles.promiseButton2}
          onClick={() => findPlace("/promise/map")}
        >
          장소 찾기
        </div>
      </div>
    </div>
  );
}

export default PromiseContent;
