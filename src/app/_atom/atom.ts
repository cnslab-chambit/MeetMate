import { atom } from "recoil";
import { IEachLocation, IMarkers, IMobile, IStore, Iplace } from "../_interfaces/interface";

export const markerAtom = atom<IMarkers[]>({
  key: "markerAtom2",
  default: [],
});

export const mapAtom = atom<IMarkers>({
  key: "mapAtom2",
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
  },
});

export const loadAtom = atom<IMarkers[]>({
  key: "loadAtom",
  default: [
    {
      address_name: "",
      category_group_code: "",
      category_group_name: "",
      category_name: "",
      distance: "",
      id: "",
      phone: "",
      place_name: "장소를 입력해주세요",
      place_url: "",
      road_address_name: "",
      x: "127.058270608867",
      y: "37.6192404638865",
    },
  ],
});

export const divNumAtom = atom<String>({
  key: "divNumAtom",
  default: "0",
});

export const locationAtom = atom<IEachLocation[]>({
  key: "eachLocation",
  default: [],
});

export const locNameAtom = atom<String>({
  key: "locName",
  default: "장소 찾기",
});

export const placeState = atom<Iplace[]>({
  key: "placeState2",
  default: [
    {
      id: 0,
      current: "1번째 장소",
    },
    {
      id: 1,
      current: "2번째 장소",
    },
  ],
});

export const countState = atom<number>({
  key: "countState2",
  default: 0,
});

export const trafficState = atom<any>({
  key: "trafficState",
  default: {},
});

export const searchAtom = atom<any>({
  key: "searchAtom",
  default: "",
});

export const pageState = atom<IMobile>({
  key: "pageState2",
  default: {
    place: false,
    map: false,
    bus: false,
    subway: false,
  },
});

export const busState = atom<any>({
  key: "busState",
  default: [],
});

export const storeState = atom<IStore[]>({
  key: "storeState",
  default: [],
});

export const promiseState = atom<IMarkers[]>({
  key: "promiseState",
  default: [],
});

export const promiseIndex = atom<number>({
  key: "promiseIndex",
  default: -1,
});

export const pathDataState = atom<any | null>({
  key: "pathDataState",
  default: [],
});

export const subwayPathState = atom<boolean>({
  key: "subwayPathState",
  default: false,
});

export const busInfoState = atom<any>({
  key: "busInfoState",
  default: {},
});

export const subwayDivNum = atom<number>({
  key: "subwayDivNum",
  default: -1,
});
