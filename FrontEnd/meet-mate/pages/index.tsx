import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const inter = Inter({ subsets: ['latin'] })

declare global {
    interface Window {
      kakao: any;
    }
  }

  interface MapProps{
    latitude: number;
    longitude: number;
  }

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

  const Map = (): React.ReactElement | null => {
    const [word, setWord] = useState("");
  	const [level, setLevel] = useState(8); //지도레벨
	const [pos, setPos] = useState(); //경도 위도
	const containerRef = useRef<HTMLDivElement>(null); // 지도 ref
	const [isMobile, setIsMobile] = useState(false);
	const mobile = useMediaQuery({
	  query: "(max-width:767px)"
	});
	//map불러오기
	const initMap = useCallback(() => {
		if (containerRef.current) {
			const map = new window.kakao.maps.Map(containerRef.current, {
				center: new window.kakao.maps.LatLng(37.51486885062181, 127.05880695418199),
				level: 3,
			});
      let control = new window.kakao.maps.ZoomControl(); // 컨트롤러 생성
      map.addControl(control, window.kakao.maps.ControlPosition.TOPRIGHT);
		}
	}, []);

  	const setLocation = () => {
		let container: any = document.getElementById('map');

		let options = {
			center: new window.kakao.maps.LatLng(37.5173319258532, 127.047377408384),
			level: 2,
		};
		let map = new window.kakao.maps.Map(container, options);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				let lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도

				let locPosition = new window.kakao.maps.LatLng(lat, lon);
				map.setCenter(locPosition);
			});
		}
	};

	const onChangeSearch = (event: any) => {
		setWord(event.target.value);
	};

	useEffect(() => {
		if (window.kakao) {
			initMap();
		}
	}, [initMap]);
	
	useEffect(()=>{	// mobile 쿼리로 인해 값이 바뀔 때 수행
		console.log(mobile);
		if(mobile) {
		  setIsMobile(true)
		  console.log(isMobile);
		};
	  },[mobile]);

    return (
    <React.Fragment>
      <Script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`}
      onLoad={() => window.kakao.maps.load(initMap)}/>
      <Head>
        <link rel='preconnect' href='https://dapi.kakao.com' />
				<link rel='dns-prefetch' href='https://dapi.kakao.com' />
      </Head>
      <div style={{width:"100%"}}>
		<Nav>
			<div style={{display:"flex", color: isMobile?"black":"white"}}>
			<NavLogo><span>Meet Mate</span></NavLogo>
			<NavMenu>menu</NavMenu>
			</div>
		</Nav>
        <div id='map' ref={containerRef} style={{
              width: "100%",
              height: "80vh"
          }}>
        </div>
        <div>
          <button onClick={setLocation}>안뇽</button>
			<form>
				<input
					type="text"
					value={word}
					id="keyword"
					placeholder="주소나 키워드를 검색해주세요."
					onChange={onChangeSearch}
				/>
				<button type="submit" id="submit_btn">검색하기</button>
			</form>
		</div>
      </div>
    </React.Fragment>);
}

export default Map;