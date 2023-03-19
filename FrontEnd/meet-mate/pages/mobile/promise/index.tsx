import { NavForm } from "@/m-styled-component/nav-component/nav_styled";
import { ButtonDiv, LogoDiv, LogoMent, PromiseButton, PromiseButton2, PromiseContainer, PromiseDiv, PromiseInput } from "@/m-styled-component/search_styled.ts/serch_styled";
import PromiseHome from "@/mobile-content/promise/promiseHome";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Logo from "../../../public/images/Logo.svg";

function Promise() {

    // 여기에 Recoil 하나 추가하고 늘리고 저장 늘리고 저장 늘리고 저장 하는 방법으로 가자
    // 하나는 빈 객체 넣어주고 시작해
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
                    <PromiseDiv>장소 추가해주세요</PromiseDiv>
                    <PromiseDiv>장소 추가해주세요</PromiseDiv>
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