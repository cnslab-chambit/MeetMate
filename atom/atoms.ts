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
  subwaySerach,
  subwaySerachData,
  Coordinate,
  coordinateStruct,
  roadCenterState
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
      id: 1,
      current: '1번째 장소'
    },
    {
      id: 2,
      current: '2번째 장소'
    },
  ]
});
export const placeTextState = atom<any>({
  key: 'placeTextState',
  default: {
    1: '',
    2: ''
  }
})
export const placeCoordinateState = atom<any>({
  key: 'placeCoordinateState',
  default: {}
})
export const CoordinatesBoxState = atom<any>(
  {
    key: 'CoordinatesBoxState',
    default: []
  }
)
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

export const subwayState = atom<road>({
  key: 'subwayState',
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

export const subwayMarkerState = atom<IMarkers[]>({
  key: "subwayMarkerState",
  default: []
});

export const placeMarkerState = atom<IMarkers[]>({
  key: "placeMarkerState",
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

export const subwaySearchState = atom<subwaySerach>({
  key: 'subwaySearchState',
  default: {
    start_point: { lat: "", lng: "" },
    end_point: { lat: "", lng: "" }
  }
})

export const inputState = atom<boolean>({
  key: 'inputState',
  default: true
})
export const subwayInputState = atom<boolean>({
  key: 'subwayInputState',
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
export const coordinateDataState = atom<coordinateStruct[]>({
  key: 'coordinateDataState',
  default: [{
    category_name: '',
    searchList: [{
      address: '',
      id: 0,
      place_name: '',
      place_url: '',
      star_rate: 0,
      x: '',
      y: '',
    }]
  }
  ]
})

export const subwayDataState = atom<roadStruct>({
  key: 'subwayDataState',
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
export const roadPlaceState = atom<boolean>({
  key: 'roadPlaceState',
  default: false
})
export const roadPlaceCenterState = atom<roadCenterState>({
  key: 'roadPlaceCenterState',
  default: {
    lat: 0,
    lng: 0
  }
})
export const subwayListState = atom<boolean>({
  key: 'subwayListState',
  default: false
})
export const placeIdState = atom<string>({
  key: 'placeIdState',
  default: ''
})
export const roadSearchResultState = atom<boolean>({
  key: 'roadSearchresultState',
  default: false
})
export const placeSearchResultState = atom<boolean>({
  key: 'placeSearchResultState',
  default: false
})
export const roadSearchTypeState = atom<string>({
  key: 'roadSearchTypeState',
  default: ''
})
export const roadSearchOnWayState = atom<boolean>({
  key: 'roadSearchOnWayState',
  default: false
})
export const roadResultDataState = atom<any>({
  key: 'roadResultDataState',
  default: {}
})
export const placeResultDataState = atom<any>({
  key: 'placeResultDataState',
  default: []
})
export const transportState = atom<transport>({
  key: 'transportState',
  default: {
    subway: true,
    bus: false,
    subwaybus: false,
  }
})
export const coordinateState = atom<Coordinate>({
  key: 'coordinateState',
  default: {
    supermarket: false,
    cultural: false,
    tourist: false,
    restaurant: true,
    cafe: false
  }
})
export const subPathState = atom<[]>({
  key: 'subPathState',
  default: []
})