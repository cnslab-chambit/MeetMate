import Nav from '@/desktopNav/Nav';
import { GlobalContainer } from '@/m-styled-component/index-component/styled_index';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalDiv } from '../styled-component/index-component/styled_index'
import MobileNav from '../mobile/mobileNav/MobileNav';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { IMarkers } from '@/mobile/atom';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <GlobalDiv>
          <Nav /> */}
          <GlobalContainer>
            <MobileNav />
            <Component {...pageProps}/>
          </GlobalContainer>
        {/* </GlobalDiv> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  )
}