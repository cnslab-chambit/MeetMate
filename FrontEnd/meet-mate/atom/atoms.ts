import { atom } from "recoil";
import { desktop, place } from "@/interface/desktop_intergace";
export const pageState = atom<desktop>({
    key: 'pageState',
    default: {
        place:true,
        map:false,
        bus:false,
        subway:false
    }  
})
export const placeState = atom<place[]>({
    key:'placeState',
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
  key:'countState',
  default: 0
})