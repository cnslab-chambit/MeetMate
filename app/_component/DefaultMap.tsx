"uee client";
import KakaoMap from "@/components/Map/KakaoMap";

type Props = { children?: React.ReactNode; onCreate?: any };
export default function DefaultMap({ children, onCreate }: Props) {
  return (
    <KakaoMap x={"127.058270608867"} y={"37.6192404638865"} onCreate={onCreate}>
      {children}
    </KakaoMap>
  );
}
