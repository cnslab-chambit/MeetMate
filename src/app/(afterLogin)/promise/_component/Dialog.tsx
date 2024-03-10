"use client";
import styles from "./dialog.module.css";
import { useState } from "react";

function PlaceDialog({ setOpen, setCount }: any) {
  const [inputs, setInputs] = useState<any>({
    number: 0,
  });
  const { number } = inputs;
  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onAppend = (e: any) => {
    if (number < 9) {
      setCount(number);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={styles.addingDialog}>
      <div className={styles.textDialog}>몇명을 추가 하시겠습니까?</div>
      <input
        className={styles.inputDialog}
        type="number"
        onChange={onChange}
        name="number"
        value={number}
        placeholder="숫자를 입력하세요"
      />
      <div className={styles.handleButtonDiv}>
        <input
          className={styles.handleButton}
          type="button"
          value="추가"
          onClick={onAppend}
        />
        <input
          className={styles.handleButton}
          type="button"
          value="취소"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PlaceDialog;
