import { NavForm } from "@/m-styled-component/nav-component/nav_styled";
import PromiseHome from "@/mobile/promise/promiseHome";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Logo from "../../public/images/Logo.svg";
const PromiseContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LogoMent = styled.h2`
    font-family: 'GmarketSansBD';
    font-size: 3rem;
    text-align: center;
`;

const LogoDiv = styled.div`
    font-family: 'GmarketSansBD';
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
`;

const PromiseInput = styled.input`
    font-family: 'GmarketSansBD';
    font-size: 2rem;
    height: 4rem;
    width: 30rem;
    color: #666666;
    margin-top: 2rem;
    &:focus{
        color: black;
    }
`; 

const PromiseButton = styled.button`
    background-color: white;
    border: 0.15rem solid;
    font-size: 2rem;
    width: 10rem;
    height: 5rem;
    font-family: 'GmarketSansBD';
    cursor: pointer;
    &:hover{
        background-color: #9a9999;
    }
`;

const PromiseButton2 = styled(PromiseButton)`
    background-color: #00A3FF;
    &:hover{
        background-color: #0381ca;
    }
`;

const ButtonDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    margin-top: 4rem;
`;

function Promise() {
    const [inputNumber, setInputNumber] = useState(2);
    
    // 여기에 Recoil 하나 추가하고 늘리고 저장 늘리고 저장 늘리고 저장 하는 방법으로 가자
    return (
        <PromiseContainer>
            <LogoDiv>
                <Logo/>
                <LogoMent>출발지를 입력하고 <br/>장소찾기를 눌러 주세요!</LogoMent>
            </LogoDiv>
            <LogoDiv>
                <NavForm>
                    <PromiseInput placeholder="장소를 추가해주세요"/>
                    <PromiseInput placeholder="장소를 추가해주세요"/>
                </NavForm>
            </LogoDiv>
            <ButtonDiv>
                <PromiseButton>장소 추가</PromiseButton>
                <PromiseButton2>장소 찾기</PromiseButton2>
            </ButtonDiv>
        </PromiseContainer>
    );
}

export default Promise;