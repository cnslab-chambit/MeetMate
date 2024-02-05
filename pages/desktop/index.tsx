
import { pageState } from "@/atom/atoms";
import CustemMap from "@/desktop-contents/CustemMap";
import SubwayMap from "@/desktop-subway/SubwayMap";
import { useRecoilValue } from "recoil";

export default function Home() {
  const navState = useRecoilValue(pageState)
  console.log(navState)
  return (
    navState.subway ? (<SubwayMap></SubwayMap>) : (<CustemMap></CustemMap >)
  )
}