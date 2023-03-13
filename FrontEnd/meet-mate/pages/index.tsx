import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script'
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

  const Map = (): React.ReactElement | null => {
    const [Places, setPlaces] = useState<any>([]);
	let markers: any[] = [];
	const [word, setWord] = useState("");
	const [level, setLevel] = useState(8); //지도레벨
	const [pos, setPos] = useState(); //경도 위도
	const containerRef = useRef<HTMLDivElement>(null); // 지도 ref
	const [isMobile, setIsMobile] = useState(false);
	//map불러오기
	const initMap = useCallback(() => {
		if (containerRef.current) {
			const markerPosition = new window.kakao.maps.LatLng(37.5173319258532, 127.047377408384);
			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
			});		//마커 생성
			const map = new window.kakao.maps.Map(containerRef.current, {
				center: new window.kakao.maps.LatLng(37.51486885062181, 127.05880695418199),
				level: 3,
			});
      let control = new window.kakao.maps.ZoomControl(); // 컨트롤러 생성
      map.addControl(control, window.kakao.maps.ControlPosition.TOPRIGHT);
	  marker.setMap(map);
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

	const searchPlaces = (e: any) => {
		e.preventDefault();
		setWord('');
		let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
		const container: any = document.getElementById('map');
		const options = {
		center: new window.kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
		};
		let map = new window.kakao.maps.Map(container, options);
		
		const ps = new window.kakao.maps.services.Places();
		ps.keywordSearch(word, placesSearchCB);

		function placesSearchCB(data: any, status: any, pagination: any) {
		if (status === window.kakao.maps.services.Status.OK) {
			let bounds = new window.kakao.maps.LatLngBounds()
			for (let i = 0; i < data.length; i++) {
			displayMarker(data[i])
			bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x))
			console.log(data[i]);  // 지도에 등장하는 마커들의 좌표,url,카테고리 기타 등등 다 있음
			}

			map.setBounds(bounds);
			displayPagination(pagination);
			setPlaces(data);
		}
		}

		function displayPagination(pagination: any){
			let paginationEl = document.getElementById('pagination');
			let fragment = document.createDocumentFragment();
			let i;

			while(paginationEl?.hasChildNodes()){
				paginationEl.removeChild(paginationEl.lastChild as any);
			}

			for(i = 1; i <= pagination.last; i++){
				let el = document.createElement('a');
				el.href = '#';
				el.innerHTML = i.toString();
				if (i === pagination.current){
					
				}else {
					el.onclick = (function (i) {
					  return function () {
						pagination.gotoPage(i)
					  }
					})(i)
				  }
				  fragment.appendChild(el);
			}
			paginationEl?.appendChild(fragment);
		}

		function displayMarker(place: any) {
		let marker = new window.kakao.maps.Marker({
			map: map,
			position: new window.kakao.maps.LatLng(place.y, place.x),
		})

		// 마커에 클릭이벤트를 등록합니다
		window.kakao.maps.event.addListener(marker, 'click', function () {
			// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
			infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
			infowindow.open(map, marker)
		})
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


    return (
    <React.Fragment>
      <Script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
      onLoad={() => window.kakao.maps.load(initMap)}/>
      <Head>
        <link rel='preconnect' href='https://dapi.kakao.com' />
				<link rel='dns-prefetch' href='https://dapi.kakao.com' />
      </Head>
      <div style={{width:"100%"}}>
        <div id='map' ref={containerRef} style={{
              width: "100%",
              height: "60vh"
          }}>
        </div>
        <div>
          <button onClick={setLocation}>나의 위치</button>
		  <Link href="/location">
			location
		  </Link>
			<form onSubmit={searchPlaces}>
				<input
					type="text"
					value={word}
					id="keyword"
					placeholder="주소나 키워드를 검색해주세요."
					onChange={onChangeSearch}
				/>
				<button type="submit">검색하기</button>
			</form>
		</div>
		<div>
		{Places.map((item:any, i:number) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
		<div id="pagination" style={{fontSize:"2rem",margin:"4rem"}}>

		</div>
		</div>
      </div>
    </React.Fragment>);
}

export default Map;