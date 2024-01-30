import { coordinateDataState, coordinateState, roadDataState } from '@/atom/atoms'
import {
    TransportTypeDiv, TransportTypeTextDiv
} from '@/styled-component/list-compoent/styled_public_transport'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import CoordinateCard from './CoordinateCard'

function CoordinateCategory() {
    const [coordinate, Setcoordinate] = useRecoilState(coordinateState);
    const { cafe, cultural, restaurant, supermarket, tourist } = coordinate
    const [coordinateData, setCoordinateData] = useRecoilState(coordinateDataState)
    console.log(coordinateData)
    const onTogle = (name: string) => {
        Setcoordinate({
            cafe: name === 'cafe' ? true : false,
            cultural: name === 'cultural' ? true : false,
            restaurant: name === 'restaurant' ? true : false,
            supermarket: name === 'supermarket' ? true : false,
            tourist: name === 'tourist' ? true : false,
        });
    }
    return (
        <>
            <TransportTypeDiv>
                <TransportTypeTextDiv active={restaurant} onClick={() => onTogle('restaurant')}>음식점 {coordinateData[3].searchList.length}</TransportTypeTextDiv>
                <TransportTypeTextDiv active={cafe} onClick={() => onTogle('cafe')}>카페 {coordinateData[4].searchList.length}</TransportTypeTextDiv>
                <TransportTypeTextDiv active={supermarket} onClick={() => onTogle('supermarket')}>대형마트 {coordinateData[0].searchList.length}</TransportTypeTextDiv>
                <TransportTypeTextDiv active={cultural} onClick={() => onTogle('cultural')}>문화시설 {coordinateData[1].searchList.length}</TransportTypeTextDiv>
                <TransportTypeTextDiv active={tourist} onClick={() => onTogle('tourist')}>관광명소 {coordinateData[2].searchList.length}</TransportTypeTextDiv>
            </TransportTypeDiv>
            <CoordinateCard />
        </>
    )
}

export default CoordinateCategory