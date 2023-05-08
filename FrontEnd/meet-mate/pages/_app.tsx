import React from 'react';
import DesktopMainPage from '@/desktopMain/DesktopMainPage';
import NavButton from '@/desktopNav/NavButton';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { GlobalDiv } from '../styled-component/index-component/styled_index'
import { useMediaHook } from '@/custom-hook/MediaQueryHook';
import { TransInfoDiv } from '@/m-styled-component/content-component/styled_find_bus';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState<boolean>(true)
  // const mediaCheck = useMediaHook()
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavButton open={open} setOpen={setOpen} />
        <GlobalDiv>
          {open ? (<DesktopMainPage />) : (null)}
          <Component {...pageProps} />
        </GlobalDiv>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  )
}