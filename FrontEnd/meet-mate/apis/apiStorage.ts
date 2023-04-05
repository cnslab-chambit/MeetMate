import { serach } from "@/interface/desktop_intergace";
import axios from "axios"
const odsay = axios.create(
    {
        baseURL: 'https://api.odsay.com/v1/api/'
    }
)
export const roadSearch = async (result: any) => {
    return await odsay
        .get(`searchPubTransPathT?lang=0&SX=${result.start_point.lng}&SY=${result.start_point.lat}&EX=${result.end_point.lng}&EY=${result.end_point.lat}&OPT=1&apiKey=${process.env.NEXT_PUBLIC_ODSAY_API_KEY}`)
        .then((res) => res.data)
}
export const roadLine = async (mapObj: string) => {
    await odsay
        .get(`loadLane?mapObject=0:0@${mapObj}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_API_KEY}`)
        .then((res) => console.log(res))
}