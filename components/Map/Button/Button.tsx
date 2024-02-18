import * as S from "./Button.styles";
import { ButtonProps } from "./Button.types";

function Button({
  onClick,
  width = 10,
  height = 3,
  active = false,
  children,
}: ButtonProps) {
  return (
    <S.Wrapper width={width} height={height} active={active} onClick={onClick}>
      {children}
    </S.Wrapper>
  );
}

export default Button;
