import styles from "./categoryButton.module.css";
import cx from "classnames";

type Props = {
  isActive: boolean;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function CategoryButton({ isActive, children, onClick }: Props) {
  return (
    <button className={cx(styles.button, isActive && styles.activedButton)} onClick={onClick}>
      {children}
    </button>
  );
}