import { IMarkers } from "./atom";
import axios from "axios";
const odsay = axios.create({
  baseURL: "https://api.odsay.com/v1/api/",
});

const setWayColor = (
  trafficType: number,
  buswayCode: number,
  subwayCode: number
) => {
  if (trafficType === 3) {
    return "#c8c7c7";
  } else if (trafficType === 2) {
    //bus -> type 11이면 마을버스?
    if (buswayCode === 4 || buswayCode === 6 || buswayCode === 14) {
      return "#E86359";
    } else if (buswayCode === 1) {
      return "#95C53C";
    } else if (buswayCode === 3) {
      return "#74a813";
    } else if (buswayCode === 11) {
      return "#2560e8";
    } else if (buswayCode === 12) {
      return "#74a813";
    }
  } else if (trafficType === 1) {
    //지하철
    if (subwayCode === 1) {
      return "#11419F";
    } else if (subwayCode === 2) {
      return "#37B42D";
    } else if (subwayCode === 3) {
      return "#FA5F2C";
    } else if (subwayCode === 4) {
      return "#3E7AD6";
    } else if (subwayCode === 5) {
      return "#9A58C0";
    } else if (subwayCode === 6) {
      return "#9D5316";
    } else if (subwayCode === 7) {
      return "#97A05A";
    } else if (subwayCode === 8) {
      return "#F073A4";
    } else if (subwayCode === 9) {
      return "#C3A52D";
    } else if (subwayCode === 9) {
      return "#C3A52D";
    } else if (subwayCode === 109) {
      return "#A9022D";
    } else if (subwayCode === 104) {
      return "#7DC4A5";
    } else if (subwayCode === 101) {
      return "#70B7E5";
    } else if (subwayCode === 116) {
      return "#ffe600";
    }
  }
};

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
      )}&SY=${parseFloat(startPoint[i].y)}&EX=${store.x}&EY=${store.y}&apiKey=${
        process.env.NEXT_PUBLIC_ODSAY_KEY
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
