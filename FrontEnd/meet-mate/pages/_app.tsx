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
import { useRouter } from 'next/router';
import { GlobalContainer } from '@/m-styled-component/index-component/styled_index';
import SearchNav from '@/mobile-content/mobileNav/SearchNav';
import MobileNav from '@/mobile-content/mobileNav/MobileNav';
// import { TransInfoDiv } from '@/m-styled-component/content-component/styled_find_bus';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState<boolean>(true)
  const mediaCheck = useMediaHook()
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient} >
        {mediaCheck ? (
          <GlobalContainer>
          {router.asPath==="/mobile/search" || router.asPath === "/mobile/road/search" || router.asPath === "/mobile/promise/search" || router.asPath === "/mobile/subway/search" ? <SearchNav/> : <MobileNav />}
          <Component {...pageProps}/>
          </GlobalContainer>
        ) :
          router.asPath === "/"
            ?
            (
              <>
                <NavButton open={open} setOpen={setOpen} />
                <GlobalDiv>
                  {open ? (<DesktopMainPage />) : (null)}
                  <Component {...pageProps} />
                </GlobalDiv>
              </>
            ) : null}
        {/* <ReactQueryDevtools initialIsOpen={} /> */}
      </QueryClientProvider>
    </RecoilRoot >
  )
}