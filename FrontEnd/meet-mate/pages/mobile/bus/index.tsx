import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BusBasicInfo, BusContainer, BusDescript, BusLocal, BusNoInput, BusPointInfo, BusResultCard, BusResultContainer } from '@/m-styled-component/bus-component/bus_styled';

const BusLaneSearch = () => {
  const [busNo, setBusNo] = useState<string>(''); 
  const [busLanes, setBusLanes] = useState<any>([]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusNo(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.odsay.com/v1/api/searchBusLane?lang=0&busNo=${busNo}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`,
      );
      console.log(response);
      setBusLanes(response.data?.result?.lane);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BusContainer>
      <BusDescript>버스 번호를 입력하세요</BusDescript>
      <BusNoInput type="text" value={busNo} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <BusResultContainer>
        {busLanes.map((lane: any) => (
          <BusResultCard key={lane?.busID}>
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
        ))}
      </BusResultContainer>
    </BusContainer>
  );
};

export default BusLaneSearch;
