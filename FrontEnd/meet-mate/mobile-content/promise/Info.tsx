import { useRecoilState } from "recoil";
import { IStore, storeState } from "../atom";
import { CategotyDiv, DetailDiv, ImageBox, InfoDiv, NonStoreDiv, PlaceAddress, PlaceInfoDiv, PlaceName, RoadButton, StarSpan } from "@/m-styled-component/promise-component/promise_styled";
import Star from "../../public/images/star.svg";
import RoadArrow from "../../public/images/roadArrow.svg";
import Sad from "../../public/images/sad.png";
import Route from "../Route";


function Info({buttonIndex, setInfo, divSetBound,clickedRoad,placeRoute}: {buttonIndex:number, setInfo: any, divSetBound:any, clickedRoad: boolean, placeRoute:any}) {
    const [storeRecoil, setStoreRecoil] = useRecoilState(storeState);

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
          storeRecoil[buttonIndex]?.searchList.length ?
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
        : <NonStoreDiv> 
           마땅한 장소가 없네요!
           <ImageBox/>
          </NonStoreDiv>
        )
        }
        </InfoDiv>
    );
}

export default Info;