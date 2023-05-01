
export const selectType = (data: any) => {
    
    if(data.class === 1){
        if(data.type === 4 || data.type === 6 || data.type === 14){
            return ("#E86359");
        }else if(data.type === 1){
            return ("#95C53C");
        }else if(data.type === 3){
            return ("#74a813");
        }else if(data.type === 11){
            return ("#2560e8");
        }else if(data.type === 12){
            return ("#74a813");
        }           
    }
    else if(data.class === 2){
        if(data.type === 1){
            return("#11419F");
        }else if(data.type === 2){
            return("#37B42D");
        }else if(data.type === 3){
            return("#FA5F2C");
        }else if(data.type === 4){
            return("#3E7AD6");
        }else if(data.type === 5){
            return("#9A58C0");
        }else if(data.type === 6){
            return("#9D5316");
        }else if(data.type === 7){
            return("#97A05A");
        }else if(data.type === 8){
            return("#F073A4");
        }else if(data.type === 9){
            return("#C3A52D");
        }else if(data.type === 9){
            return("#C3A52D");
        }else if(data.type === 109){
            return("#A9022D");
        }else if(data.type === 104){
            return("#7DC4A5");
        }else if(data.type === 101){
            return("#70B7E5");
        }else if(data.type === 116){
            return("#ffe600");
        }else if(data.type === 107){
            return("#80CE79");
        }else if(data.type === 107){
            return("#80CE79");
        }else if(data.type === 22){
            return("#FFB952");
        }else if(data.type === 113){
            return("#CAC615");
        }else if(data.type === 108){
            return("#26A97F");
        }else if(data.type === 117){
            return("#003499");
        }else if(data.type === 110){
            return("#FF8E00");
        }else if(data.type === 115){
            return("#9F7E20");
        }
    }
    else{
        return "gray";
    }
  }