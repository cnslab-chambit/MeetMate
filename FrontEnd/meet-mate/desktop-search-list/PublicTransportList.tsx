import { roadDataState, transportState } from '@/atom/atoms'
import {
    TransportTypeDiv, TransportTypeTextDiv
} from '@/styled-component/list-compoent/styled_public_transport'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import TransportCard from './TransportCard'

function PublicTransportList() {
    const [roadData] = useRecoilState(roadDataState)
    const [trans, setTrans] = useRecoilState(transportState);
    const { bus, subway, subwaybus } = trans
    console.log(roadData)
    const onTogle = (name: string) => {
        setTrans({
            subway: name === 'subway' ? true : false,
            bus: name === 'bus' ? true : false,
            subwaybus: name === 'bussubway' ? true : false
        });
    }
    return (
        <>
            <TransportTypeDiv>
                <TransportTypeTextDiv active={subway} onClick={() => onTogle('subway')}>전철 {roadData.subwayCount}</TransportTypeTextDiv>
                <TransportTypeTextDiv active={bus} onClick={() => onTogle('bus')}>버스 {roadData.busCount}</TransportTypeTextDiv>
                <TransportTypeTextDiv active={subwaybus} onClick={() => onTogle('bussubway')}>버스+전철 {roadData.subwayBusCount}</TransportTypeTextDiv>
            </TransportTypeDiv>
            <TransportCard />
        </>
    )
}

export default PublicTransportList