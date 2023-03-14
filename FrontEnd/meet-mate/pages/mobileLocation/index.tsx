import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: skyblue;
`;

const LocationBox = styled.div`
    width:20em;
    color:white;
    background-color: black;
`;

export default function Main () {
    const [List, SetList] = useState<string[]>([]);
    const addClicked = () => {
        SetList([...List,'입력하세용']);
    };
    return( 
    <Container>
        {List.map((list,index) => 
        <LocationBox key={index}>
            {index}
        </LocationBox>
        )}
        <button onClick={addClicked}>추가</button>       
    </Container>
    );
}