export interface desktop {
    place: boolean,
    map: boolean,
    bus: boolean,
    subway: boolean
}

export interface place {
    id: number,
    current: string
}
export interface road {
    start: string,
    end: string
}

export interface event {
    place: boolean,
    road: boolean,
    bus: boolean,
    subway: boolean
}

export interface IMarkers {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
}
export interface serach {
    start_point: { lat: string, lng: string, img: string }
    end_point: { lat: string, lng: string, img: string }
}
export interface subwaySerach {
    start_point: { lat: string, lng: string }
    end_point: { lat: string, lng: string }
}
export interface market {
    lat: number
    lng: number
    img: string
}

export interface roadStruct {
    busCount: number
    endRadius: number
    outTrafficCheck: number
    path: []
    pointDistance: number
    searchType: number
    startRadius: number
    subwayBusCount: number
    subwayCount: number
}
export interface coordinateStruct {
    category_name: string
    searchList: [{
        address: string
        id: number
        place_name: string
        place_url: string
        star_rate: number
        x: string
        y: string
    }]
}
export interface transport {
    bus: boolean
    subway: boolean
    subwaybus: boolean
}
export interface Coordinate {
    supermarket: boolean
    cultural: boolean
    tourist: boolean
    restaurant: boolean
    cafe: boolean
}

export interface subwaySerachData {
    info: {}
    subPath: [{}]
}
export interface roadCenterState {
    lat: number
    lng: number
}