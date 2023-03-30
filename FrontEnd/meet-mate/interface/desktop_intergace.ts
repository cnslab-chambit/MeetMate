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