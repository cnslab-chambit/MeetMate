import { css, keyframes } from "styled-components";

export const FlexCenterCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexBetweenCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexAlignCSS = css`
  display: flex;
  align-items: center;
`;

export const FadeInKeyFrame = keyframes`
	0% {
		opacity: 0;
		transform: translateY(20%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;
