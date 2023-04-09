import { Boldpg, FlexBox, FlexBoxCol, TimeBox, TransferBox } from "@/m-styled-component/content-component/styled_find_bus";
import { HandleButton } from "@/m-styled-component/content-component/styled_place";
import { NavForm, NavSearchDiv2 } from "@/m-styled-component/nav-component/nav_styled";
import { BaseBar, WayBar } from "@/m-styled-component/road-compontnt/road_styled";
import { LogoDiv, PromiseDiv, PromiseInput } from "@/m-styled-component/search-component/serch_styled";
import Gauge from "@/mobile-content/Gauge";
import Way from "@/mobile-content/Way";
import { IMarkers, loadAtom, trafficState } from "@/mobile-content/atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";


function Input() {
    const date = new Date();   
    const [hour, setHours] = useState(String(date.getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(date.getMinutes()).padStart(2,"0"));
    const [afternoon, setAfternoon] = useState(false);
    // 나중에 도착시간까지 구현할거임
    const setPathRecoil = useSetRecoilState(trafficState);
    const router = useRouter();
    const loadRecoil = useRecoilValue<IMarkers[]>(loadAtom);
    const [pathData, setPathData] = useState<any>([]);
    
    const setWay = (pathData: any) => {
        setPathRecoil(pathData);
        router.push("/mobile/road/map")
    };

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
             <TransferBox>
            {pathData.length > 0 ? pathData?.map((path: any,index: number) =>
                <TimeBox key={index} onClick={() => setWay(path[index])}>
                    <FlexBox>
                        <Boldpg>{Math.floor(path.info.totalTime / 60)}</Boldpg>시간 
                        <Boldpg>{path.info.totalTime % 60}분</Boldpg>
                        
                        <FlexBox>
                            | {path.info.payment}원
                        </FlexBox>
                    </FlexBox>

                    <FlexBoxCol>
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
                            subwayCode={subPath?.lane? subPath?.lane[0].subwayCode : "none"}
                            buswayCode={subPath?.lane? subPath?.lane[0].type : "none"}
                            />
                            ):null}
                        </BaseBar>
                        
                    </FlexBoxCol>
                    <WayBar>
                            {pathData.length > 0 ?
                            path?.subPath.map((subPath: any, index: number) =>     
                                <Way
                                key={index}
                                subwayName={subPath?.lane? subPath?.lane[0].name : "none"}
                                busNo={subPath?.lane? subPath?.lane[0].busNo : "none"}
                                trafficType={subPath?.trafficType}
                                subwayCode={subPath?.lane? subPath?.lane[0].subwayCode : "none"}
                                buswayCode={subPath?.lane? subPath?.lane[0].type : "none"}
                                />
                            ) : null}
                        </WayBar>
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