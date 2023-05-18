import { serach } from "@/interface/desktop_intergace";
import axios from "axios"
const odsay = axios.create(
    {
        baseURL: 'https://api.odsay.com/v1/api/'
    }
)
export const roadSearchApi = async (result: any) => {
    return await odsay
        .get(`searchPubTransPathT?lang=0&SX=${result.start_point.lng}&SY=${result.start_point.lat}&EX=${result.end_point.lng}&EY=${result.end_point.lat}&OPT=1&apiKey=${process.env.NEXT_PUBLIC_ODSAY_API_KEY}`)
        .then((res) => {
            if (res?.data?.error?.msg) {
                alert('장소를 확인해주세요')
                return false
            }
            else {
                return res?.data?.result
            }
        })
}
export const roadLineApi = async (mapObj: string) => {
    return await odsay
        .get(`loadLane?mapObject=0:0@${mapObj}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_API_KEY}`)
        .then((res) => res.data.result.lane)
}