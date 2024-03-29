import { Dispatch, SetStateAction } from "react";

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

export interface IEachLocation {
    id: string;
    location: string;
    place_name: string;
    x: string;
    y: string;
}

export interface Iplace {
    id: number;
    current: string;
}

export interface IMobile {
    place: boolean;
    map: boolean;
    bus: boolean;
    subway: boolean;
}

export interface IStore {
    category_name: string;
    searchList: IStoreInfo[];
}

export interface IStoreInfo {
    address: string;
    id: number;
    place_name: string;
    place_url: string;
    star_rate: number;
    x: string;
    y: string;
}
export interface IBoundary {
    y_1: number;
    x_1: number;
    y_2: number;
    x_2: number;
}
export interface IMap {
    setBounds: (bounds: unknown) => undefined
}
export interface ICodeType {
    trafficType: number;
    subwayCode: number;
    buswayCode: number
}

export interface ILatLngType {
    y_1: string,
    x_1: string,
    y_2: string,
    x_2: string,
}