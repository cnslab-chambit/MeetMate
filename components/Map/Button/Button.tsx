import { FlexCenterCSS } from "@/styles/common";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  width?: number;
  height?: number;
  active?: boolean;
  children: React.ReactNode;
}

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

const S = {
  Wrapper: styled.div<{ active: boolean; width: number; height: number }>`
    ${FlexCenterCSS};
    justify-content: space-evenly;
    width: ${(props) => props.width}rem;
    height: 3rem;
    border: none;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: ${(props) => (props.active ? "#C7D6FF" : "white")};
    color: ${(props) => (props.active ? "white" : "black")};
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  `,
};

export default Button;
