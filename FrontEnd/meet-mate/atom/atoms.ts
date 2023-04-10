import { atom } from "recoil";
import {
  desktop,
  place,
  road,
  event,
  IMarkers,
  serach,
  market,
  roadStruct,
  transport,
  pathType
} from "@/interface/desktop_intergace";
export const pageState = atom<desktop>({
  key: 'pageState',
  default: {
    place: true,
    map: false,
    bus: false,
    subway: false
  }
})

export const placeState = atom<place[]>({
  key: 'placeState',
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
  key: 'countState',
  default: 0
})

export const roadState = atom<road>({
  key: 'roadState',
  default: {
    start: '',
    end: ''
  }
})

export const eventState = atom<event>({
  key: 'event',
  default: {
    place: false,
    road: false,
    bus: false,
    subway: false
  }
})

export const markerAtom = atom<IMarkers[]>({
  key: "markerAtom",
  default: []
});

export const mapAtom = atom<IMarkers>({
  key: "mapAtom",
  default: {
    address_name: "",
    category_group_code: "",
    category_group_name: "",
    category_name: "",
    distance: "",
    id: "",
    phone: "",
    place_name: "장소 찾기",
    place_url: "",
    road_address_name: "",
    x: "127.058270608867",
    y: "37.6192404638865",
  }
});

export const searchState = atom<serach>({
  key: 'searchState',
  default: {
    start_point: { lat: "", lng: "", img: "" },
    end_point: { lat: "", lng: "", img: "" }
  }
})

export const inputState = atom<boolean>({
  key: 'inputState',
  default: true
})
export const clickState = atom<number>({
  key: 'clickState',
  default: 0
})

export const markerState = atom<market>({
  key: 'markerState',
  default: {
    lat: 37.6192404638865,
    lng: 127.058270608867,
    img: "/images/default.svg"
  }
})

export const roadDataState = atom<roadStruct>({
  key: 'roadDataState',
  default: {
    busCount: 0,
    endRadius: 0,
    outTrafficCheck: 0,
    path: [],
    pointDistance: 0,
    searchType: 0,
    startRadius: 0,
    subwayBusCount: 0,
    subwayCount: 0,
  }
})
export const roadSearchState = atom<boolean>({
  key: 'roadSearchState',
  default: false
})
export const transportState = atom<transport>({
  key: 'transportState',
  default: {
    subway: true,
    bus: false,
    subwaybus: false,
  }
})
export const subwayTypeState = atom<object>({
  key: 'subwayTypeState',
  default: {
    info: [],
    subPath: []
  },
})

export const busTypeState = atom<object>({
  key: 'busTypeState',
  default: {
    info: [],
    subPath: []
  },
})

export const subwaybusTypeState = atom<object>({
  key: 'subwaybusTypeState',
  default: {
    info: [],
    subPath: []
  },
})