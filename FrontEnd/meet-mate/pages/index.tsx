import Head from 'next/head'
import { Inter } from 'next/font/google'
import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components'
import { Map,MapMarker } from 'react-kakao-maps-sdk'

export default function Home(){
	return(
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