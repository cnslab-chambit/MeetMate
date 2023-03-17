import { atom } from "recoil";
interface deskTop{
    place:boolean,
    map:boolean,
    bus:boolean,
    subway:boolean
  }
export const pageState = atom<deskTop>({
    key: 'pageState',
    default: {
        place:true,
        map:false,
        bus:false,
        subway:false
    }  
})