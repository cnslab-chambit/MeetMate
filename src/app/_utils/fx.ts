import axios from "axios";
import { IMarkers } from "../_interfaces/interface";
const odsay = axios.create({
  baseURL: "https://api.odsay.com/v1/api/",
});

export const callApi = async (center: any) => {
  const response = await fetch(
    `/search?longitude=${center.x}&latitude=${center.y}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json;",
      },
    }
  ).then((response) => response.json());
  return response;
};

export const findPlaceRoute = async (
  startPoint: IMarkers[],
  store: any,
  setPlaceRoute: any
) => {
  try {
    for (let i = 0; i < startPoint.length; i++) {
      let baseUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${parseFloat(
        startPoint[i].x
      )}&SY=${parseFloat(startPoint[i].y)}&EX=${store.x}&EY=${store.y}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY
        }`;
      const data = await fetch(baseUrl);
      const jsonData = await data.json();
      setPlaceRoute((prev: any) => [...prev, jsonData]);
      return jsonData;
    }
  } catch (error) {
    alert("너무 가까운 거리기에 교통편을 찾을 수 없습니다!");
  }
};

export const callMapObjApiAJAX = async (mapObj: string) => {
  if (mapObj) {
    try {
      const url = `https://api.odsay.com/v1/api/loadLane?mapObject=0:0@${mapObj}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
      const data = await fetch(url);
      const jsonData = await data.json();
      if (jsonData) {
        return jsonData;
      }
    } catch (error) {
      alert("너무 가까운 거리기에 교통편을 찾을 수 없습니다!");
    }
  }
};

export const setMarkerUrl = (category: any) => {
  if (category === "대형마트") return "/images/shopping.svg";
  else if (category === "문화시설") return "/images/activity.svg";
  else if (category === "관광명소") return "/images/travel.svg";
  else if (category === "음식점") return "/images/foodPlace.svg";
  else if (category === "카페") return "/images/cafe.svg";
  return "";
};

export const drawPolyLine = async (response: any) => {
  let lineArr = [];
  for (let i = 0; i < response?.length; i++) {
    let subLineArr = [];
    for (let k = 0; k < response[i].section[0].graphPos.length; k++) {
      subLineArr.push({
        lat: response[i].section[0]?.graphPos[k].y,
        lng: response[i].section[0]?.graphPos[k].x,
      });
    }
    lineArr.push(subLineArr);
  }
  return lineArr;
};

export const roadSearchApi = async (result: any) => {
  return await odsay
    .get(
      `searchPubTransPathT?lang=0&SX=${result.start_point.lng}&SY=${result.start_point.lat}&EX=${result.end_point.lng}&EY=${result.end_point.lat}&OPT=1&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`
    )
    .then((res) => {
      if (res?.data?.error?.msg) {
        alert("장소를 확인해주세요");
        return false;
      } else {
        return res?.data?.result;
      }
    });
};
