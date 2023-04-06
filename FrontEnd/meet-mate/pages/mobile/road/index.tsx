import { Boldpg, FlexBox, TimeBox, TransferBox } from "@/m-styled-component/content-component/styled_find_bus";
import { HandleButton } from "@/m-styled-component/content-component/styled_place";
import { NavForm, NavSearchDiv2 } from "@/m-styled-component/nav-component/nav_styled";
import { LogoDiv, PromiseDiv, PromiseInput } from "@/m-styled-component/search_styled.ts/serch_styled";
import Gauge from "@/mobile-content/Gauge";
import { IMarkers, loadAtom } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";


const BaseBar = styled.div`
    display: flex;
    height: 20px;
    width: 50rem;
    border-radius: 10rem;
    background-color: #dad7d7;
    margin-right: 15%;		// 페이지에서 원하는 부분만큼 자유롭게 설정
    margin-left: 15%;
`;

function Input() {
    const date = new Date();
    const [hour, setHours] = useState(String(date.getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(date.getMinutes()).padStart(2,"0"));
    const [afternoon, setAfternoon] = useState(false);
    const router = useRouter();
    const loadRecoil = useRecoilValue<IMarkers[]>(loadAtom);
    const [pathData, setPathData] = useState<any>([]);
    
    useEffect(() => {
        if(loadRecoil.length === 2){
            const sx = loadRecoil[0].x;    
            const sy = loadRecoil[0].y;  //출발 좌표
            const ex = loadRecoil[1].x;
            const ey = loadRecoil[1].y;  //도착 좌표
        let url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_KEY}`;
        (async () => {
            const data = await (await fetch(url)).json();
            if(data){
                setPathData(data?.result?.path);
            }
        })()}
    },[loadRecoil.length === 2]);

console.log(pathData);
    
    return (
        <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
            <NavSearchDiv2>
                <PromiseDiv onClick={()=> router.push("/mobile/road/search")}>
                    {loadRecoil[0] ? loadRecoil[0].place_name : "장소를 입력해주세요"}
                </PromiseDiv>
                <PromiseDiv onClick={()=> router.push("/mobile/road/search")}>
                    {loadRecoil[1] ? loadRecoil[1].place_name : "장소를 입력해주세요"}
                </PromiseDiv>
            </NavSearchDiv2>
             {loadRecoil.length === 2 ? <button onClick={() => router.push("/mobile/road/map")}>길찾기</button> : null}
            <TransferBox>
            {pathData.length > 0 ? pathData?.map((path: any,index: number) =>
                <TimeBox key={index}>
                    <FlexBox>
                        <Boldpg>{Math.floor(path.info.checkIntervalTime / 60)}</Boldpg>시간 
                        <Boldpg>{path.info.checkIntervalTime % 60}분</Boldpg>
                        
                        <FlexBox>
                            | {path.info.payment}원
                        </FlexBox>
                    </FlexBox>

                    <FlexBox>
                        <BaseBar>
                            {
                            pathData.length > 0 ? 
                            path?.subPath.map((subPath: any, index: number) => 
                            <Gauge 
                            key={index}
                            sectionWidth={subPath.sectionTime}
                            totalWidth={path.info.totalTime}
                            trafficType={subPath.trafficType}
                            lane={subPath?.lane ? subPath.lane[0].name : "도보"}
                            >
                            </Gauge>
                            ):null}
                        </BaseBar>
                    </FlexBox>
                </TimeBox>
            )
            :
            null
            }
            </TransferBox>
        </div>
    )
}

export default Input;