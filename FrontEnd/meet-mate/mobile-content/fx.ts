const setWayColor = (trafficType: number, buswayCode: number, subwayCode: number) => {
    
    if(trafficType === 3){
        return "#c8c7c7";
    }
    else if(trafficType === 2){
        //bus -> type 11이면 마을버스?
        if(buswayCode === 4 || buswayCode === 6 || buswayCode === 14){
            return "#E86359";
        }else if(buswayCode === 1){
            return "#95C53C";
        }else if(buswayCode === 3){
            return "#74a813";
        }else if(buswayCode === 11){
            return "#2560e8";
        }else if(buswayCode === 12){
            return "#74a813";
        }
        
    }else if(trafficType === 1){
        //지하철
        if(subwayCode === 1){
            return "#11419F";
        }else if(subwayCode === 2){
            return "#37B42D";
        }else if(subwayCode === 3){
            return "#FA5F2C";
        }else if(subwayCode === 4){
            return "#3E7AD6";
        }else if(subwayCode === 5){
            return "#9A58C0";
        }else if(subwayCode === 6){
            return "#9D5316";
        }else if(subwayCode === 7){
            return "#97A05A";
        }else if(subwayCode === 8){
            return "#F073A4";
        }else if(subwayCode === 9){
            return "#C3A52D";
        }else if(subwayCode === 9){
            return "#C3A52D";
        }else if(subwayCode === 109){
            return "#A9022D";
        }else if(subwayCode === 104){
            return "#7DC4A5";
        }else if(subwayCode === 101){
            return "#70B7E5";
        }else if(subwayCode === 116){
            return "#ffe600";
        }
    }

}

export const callApi = async(center: any) => {
    const response = await fetch(`/search?longitude=${center.x}&latitude=${center.y}`,{
        method: "GET",
        headers : {
            "Content-type" : "application/json;"
        }
    }).then((response) => response.json());
    return response;
}

