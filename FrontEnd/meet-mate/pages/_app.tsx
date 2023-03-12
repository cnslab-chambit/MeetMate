import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

const queryClient = new QueryClient();

declare global {
  interface Window {
    kakao: any;
  }
}

const Container = styled.div`
  display:flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  height:10vh;
  background-color: #367BF6;
  /* @media screen and (max-width:768px){
    background-color: black;
  } */
`;

const Nav = styled.div`
display:flex;
flex-direction: column;
width:100%;
background-color: #367BF6;
height:12vh;
justify-content: center;
align-items: center;
`;

const NavLogo = styled.div`
display:flex;
color: white;
font-size: 2rem;
font-weight: 700;
`;

const NavMenu = styled.div`
display: flex;
position: absolute;
right:0;
padding-top: 1rem;
padding-right: 1rem;
`;

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
      <Nav>
			  <div style={{display:"flex", color: "white"}}>
			  <NavLogo><span>Meet Mate</span></NavLogo>
			  <NavMenu>menu</NavMenu>
			</div>
		  </Nav>
      <Component {...pageProps} />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
