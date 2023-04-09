import { NaverMap, Marker, useNavermaps} from 'react-naver-maps'
import { useRecoilValue } from 'recoil'
import { IMarkers, mapAtom } from './atom';

function MyMap() {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  const mapRecoil = useRecoilValue<IMarkers>(mapAtom);
  return (
    <NaverMap
      center={{lat:mapRecoil.y, lng: mapRecoil.x}}
      defaultZoom={17}
    >
      <Marker
        defaultPosition={{lat:mapRecoil.y, lng: mapRecoil.x}}
      />
      
    </NaverMap>
  )
}

export default MyMap;