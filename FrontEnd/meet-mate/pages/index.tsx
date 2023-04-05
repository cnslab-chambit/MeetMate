import styles from '@/styles/Home.module.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useMediaHook } from '@/custom-hook/MediaQueryHook'
import Desktop from './desktop'
export default function Home() {
  const mediaCheck = useMediaHook()
  return (
    <>
      {mediaCheck ? (null) : (<Desktop />)}
    </>
  )
}