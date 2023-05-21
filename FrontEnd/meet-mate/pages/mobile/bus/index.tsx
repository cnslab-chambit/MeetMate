import React, { useState } from 'react';
import axios from 'axios';
import { BusBasicInfo, BusContainer, BusDescript, BusLocal, BusNoInput, BusPointInfo, BusResultCard, BusResultContainer, FlexColDiv } from '@/m-styled-component/bus-component/bus_styled';
import { busState } from '@/mobile-content/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const BusLaneSearch = () => {
  const [busNo, setBusNo] = useState<string>(); 
  const [result, setResult] = useState<string>();
  const [busLanes, setBusLanes] = useState<any | null>([]); 
  const setBusRecoil = useSetRecoilState(busState);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusNo(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    findBusId();
    setResult(busNo);
  };

  const findBusInfo = async (busId: any) => {
    try {
      const response = await axios.get(
        `https://api.odsay.com/v1/api/loadLane?lang=0&mapObject=0:0@${busId}:1:-1:-1&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`,
      );
      setBusRecoil(response);
    } catch (error) {
      console.log(error);
    }
  };

  const findBusId = async () => {
    try {
      const response = await axios.get(
        `https://api.odsay.com/v1/api/searchBusLane?lang=0&busNo=${busNo}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`,
      );
      setBusLanes(response?.data?.result?.lane);
    } catch (error) {
    }
  };

  const onBusClicked = (busId:any) => {
    findBusInfo(busId);
    router.push("/mobile/bus/map");
  };

  return (
    <BusContainer>
      <FlexColDiv>
        <BusDescript>버스 노선 입력</BusDescript>
        <form onSubmit={handleSubmit}>
        <BusNoInput type="text" value={busNo || ""} onChange={handleInputChange} />
        </form>
      </FlexColDiv>
      {busLanes.length > 0 ?
        <FlexColDiv>
        <BusDescript>{result}번 검색결과</BusDescript>
        <BusResultContainer>
          {busLanes.map((lane: any) => 
          <BusResultCard 
          key={lane?.busID}
          onClick={() => onBusClicked(lane?.busID)}>
              <BusBasicInfo>
                  {lane?.busNo}
                  <BusLocal>
                      {lane?.busCityName}
                  </BusLocal>
              </BusBasicInfo>
              <BusPointInfo>
                  <BusLocal>
                      {lane?.busStartPoint} ↔ {lane?.busEndPoint}
                  </BusLocal>
              </BusPointInfo>
            </BusResultCard>
            )}
      </BusResultContainer>
      </FlexColDiv>
      :
      null}
    </BusContainer>
  );
};

export default BusLaneSearch;
