import styles from "./categoryButton.module.css";
import cx from "classnames";

type Props = { isActive: boolean; children: React.ReactNode };

export default function CategoryButton({ isActive, children }: Props) {
  return (
    <button className={cx(styles.button, isActive && styles.activedButton)}>
      {children}
    </button>
  );
}
