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
    id: string;
    location: string;
    place_name: string;
    x: string;
    y: string;
  }

  
  export interface Iplace{
    id:number,
    current:string
  }

  export interface IMobile{
    place: boolean;
    map: boolean;
    bus: boolean;
    subway: boolean;
  }

  export const markerAtom = atom<IMarkers[]>({
    key: "markerAtom2",
    default: []
  });

  export const mapAtom = atom<IMarkers>({
    key: "mapAtom2",
    default:{
        address_name: "",
        category_group_code: "",
        category_group_name: "",
        category_name: "",
        distance: "",
        id: "",
        phone: "",
        place_name: "장소 찾기",
        place_url: "",
        road_address_name:"",
        x: "127.058270608867",
        y: "37.6192404638865",
    }
  });

  

  export const loadAtom = atom<IMarkers[]>({
    key: "loadAtom",
    default:[{
      address_name: "",
      category_group_code: "",
      category_group_name: "",
      category_name: "",
      distance: "",
      id: "",
      phone: "",
      place_name: "장소를 입력해주세요",
      place_url: "",
      road_address_name:"",
      x: "127.058270608867",
      y: "37.6192404638865",
  }]
  });

  export const divNumAtom = atom<String>({
    key: "divNumAtom",
    default: "0"
  });

  export const locationAtom = atom<IEachLocation[]>({
    key: "eachLocation",
    default: []
  });

  export const locNameAtom = atom<String>({
    key: "locName",
    default: "장소 찾기"
  });

  export const placeState = atom<Iplace[]>({
  key:'placeState2',
  default: [
      {
        id: 0,
        current: '1번째 장소'
      },
      {
        id: 1,
        current: '2번째 장소'
      },
    ]
  });

  export const countState = atom<number>({
  key:'countState2',
  default: 0
  });

  export const trafficState = atom<any>({
    key: 'trafficState',
    default: {}
  });

  export const searchAtom = atom<any>({
    key: "searchAtom",
    default: "",
  });

  export const pageState = atom<IMobile>({
    key: 'pageState2',
    default: {
      place: false,
      map: false,
      bus: false,
      subway: false
    }
  });
  
  export const busState = atom<any>({
    key: 'busState',
    default: []
  });