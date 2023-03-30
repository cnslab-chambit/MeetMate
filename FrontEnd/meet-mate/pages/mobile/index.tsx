import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Map,MapMarker } from 'react-kakao-maps-sdk'
import { IMarkers, mapAtom } from '@/mobile-content/atom'
import { useRecoilValue } from 'recoil'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props:any) {
  const mapRecoil = useRecoilValue<IMarkers>(mapAtom);
  return (
    <>
      <Map
      center={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}
      style={{ width: "100%", height: "85vh" ,maxHeight:"100vh"}}
      id="map"
    >
      <MapMarker position={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}>
        {/* <div style={{ color: "#000" }}>Hello World!</div> */}
      </MapMarker>
    </Map>

    </>
  )
}