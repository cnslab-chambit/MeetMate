import { useEffect } from "react";

function Test(){
    const callApi = async() => {
        const response = await fetch('/search?longitude=127.048656761384&latitude=37.617136272655',{
            method: "GET",
            headers : {
                "Content-type" : "application/json;"
            }
        }).then((response) => response.json());
        console.log(response);
    }

    useEffect(() => {
        callApi();
    },[]);    
}

export default Test;