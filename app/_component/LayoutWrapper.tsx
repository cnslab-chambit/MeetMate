"use client";

import GlobalStyle from "@/styles/global";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function LayoutWrapper({ children }: Props) {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <RecoilRoot>{children}</RecoilRoot>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
