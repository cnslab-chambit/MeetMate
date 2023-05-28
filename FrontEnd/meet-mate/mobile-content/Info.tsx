import { useRecoilState } from "recoil";
import { IStore, storeState } from "./atom";
import { CategotyDiv, DetailDiv, InfoDiv, PlaceAddress, PlaceInfoDiv, PlaceName, RoadButton, StarSpan } from "@/m-styled-component/promise-component/promise_styled";
import Star from "../public/images/star.svg";
import RoadArrow from "../public/images/roadArrow.svg";

function Info({buttonIndex, setInfo, divSetBound}: {buttonIndex:number, setInfo: any, divSetBound:any}) {
    const [storeRecoil, setStoreRecoil] = useRecoilState(storeState);
    console.log(storeRecoil);

    const divClick = (store: any) => {
      setInfo(store.place_name);
      divSetBound(store);
    }

    return (
        <InfoDiv> 
        { buttonIndex === -1 ?
          storeRecoil?.map((element: any) => (
            element.searchList.map((store: any) =>(
              <DetailDiv key={store.id} onClick={() => divClick(store)}>
                <PlaceName>
                  {store.place_name}
                  <Star/>
                  <StarSpan>
                    {store.star_rate}
                  </StarSpan>
                  <CategotyDiv>{element.category_name}</CategotyDiv>
                </PlaceName>
                <PlaceAddress>
                  {store.address}
                </PlaceAddress>
                <RoadButton>
                    <RoadArrow/>
                    길 찾기
                  </RoadButton>
              </DetailDiv>
            ))
          ))
        : (
          storeRecoil[buttonIndex]?.searchList.map((store) => (
            <DetailDiv key={store.id}  onClick={() => divClick(store)}>
                <PlaceName>
                  {store.place_name}
                  <Star/>
                  <StarSpan>
                    {store.star_rate}
                  </StarSpan>
                </PlaceName>
                <PlaceAddress>{store.address}</PlaceAddress>
                <RoadButton>
                    <RoadArrow/>
                    길 찾기
                  </RoadButton>
              </DetailDiv>
        ))
        )
        }
        </InfoDiv>
    );
}

export default Info;