import React from 'react'
import { ZoomControl } from 'react-kakao-maps-sdk'

export const ZoomCustem = () => {
    return (
        <>
            <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        </>
    )
}

