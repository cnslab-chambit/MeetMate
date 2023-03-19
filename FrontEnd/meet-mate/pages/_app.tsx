import Nav from '@/desktopNav/Nav';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalDiv } from '../styled-component/index-component/styled_index'
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalDiv>
        <Nav />
        <Component {...pageProps} />
      </GlobalDiv>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}