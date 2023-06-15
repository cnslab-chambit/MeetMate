import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { CustomOverlayMap, Map,MapMarker } from 'react-kakao-maps-sdk'
import { IMarkers, mapAtom } from '@/mobile-content/atom'
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { BackButton, StoreInfoDiv, StoreName } from '@/m-styled-component/promise-component/promise_styled'
import { IndexBackButton, IndexInfoDiv, IndexLocName } from '@/m-styled-component/index-component/styled_index'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props:any) {
  const mapRecoil = useRecoilValue<IMarkers>(mapAtom);
  const [visible, setVisible] = useState(true);
  const Greet = "Your MeetMate!";

  useEffect(() => {
    setVisible(true);
  },[]);

  return (
    <div>
      <Map
      center={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}
      style={{ width: "100%", height: "79vh" ,maxHeight:"100vh"}}
      id="map"
    >
      <MapMarker position={{ lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x) }}
      image={{
        src: '/images/flag.svg',
        size: {
          width: 60,
          height: 60,
        },
      }}
      >
      </MapMarker>
      {visible ? 
      <CustomOverlayMap
      position={{lat: parseFloat(mapRecoil.y), lng: parseFloat(mapRecoil.x)}}
      yAnchor={1.8}
      zIndex={3}>
        <IndexInfoDiv>
              <IndexLocName>
                {mapRecoil.place_name !== "장소 찾기" ? mapRecoil.place_name : Greet}
              </IndexLocName>
           <IndexBackButton onClick={() => setVisible(false)}>x</IndexBackButton>
        </IndexInfoDiv>  
      </CustomOverlayMap>
    :
    null}
    </Map>

    </div>
  )
}