import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Map,MapMarker } from 'react-kakao-maps-sdk'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "100vh" ,maxHeight:"100vh"}}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        {/* <div style={{ color: "#000" }}>Hello World!</div> */}
      </MapMarker>
    </Map>

    </>
  )
}