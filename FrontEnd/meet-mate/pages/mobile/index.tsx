import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Container as MapDiv,Marker, NaverMap, NavermapsProvider } from 'react-naver-maps'
import { IMarkers, mapAtom } from '@/mobile-content/atom'
import { useRecoilValue } from 'recoil'
import MyMap from '@/mobile-content/MyMap'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props:any) {
  const mapRecoil = useRecoilValue<IMarkers>(mapAtom);
  return (
    <NavermapsProvider
    ncpClientId={process.env.NEXT_PUBLIC_NAVERMAP_CLIENT_ID as string}
    >
      <MapDiv style={{height: "80vh", width: "100%"}}>
        <MyMap/>
      </MapDiv>
    </NavermapsProvider>
  )
}