import { atom } from "recoil";

export interface IMarkers{
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name:string;
    x: string;
    y: string;
  }

  export interface IEachLocation {
    location: string;
    place_name: string;
    x: string;
    y: string;
  }

  export const markerAtom = atom<IMarkers[]>({
    key: "markerAtom",
    default: []
  });

  export const mapAtom = atom<IMarkers>({
    key: "mapAtom",
    default:{
        address_name: "",
        category_group_code: "",
        category_group_name: "",
        category_name: "",
        distance: "",
        id: "",
        phone: "",
        place_name: "",
        place_url: "",
        road_address_name:"",
        x: "127.058270608867",
        y: "37.6192404638865",
    }
  });

  export const locationAtom = atom<IEachLocation[]>({
    key: "eachLocation",
    default: []
  });