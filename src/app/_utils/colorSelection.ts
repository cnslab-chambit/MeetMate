import { ICodeType } from "../_interfaces/interface";
import { Dispatch, SetStateAction } from "react";
export const barColorType = (codeType: ICodeType, setColor: Dispatch<SetStateAction<string>>) => {
    switch (codeType.trafficType) {
        case 3:
            setColor("#c8c7c7");
            break;
        case 2:
            //버스
            switch (codeType.buswayCode) {
                case 4:
                case 6:
                case 14:
                    setColor("#E86359");
                    break;
                case 1:
                    setColor("#95C53C");
                    break;
                case 3:
                    setColor("#74a813");
                    break;
                case 11:
                    setColor("#2560e8");
                    break;
                case 12:
                    setColor("#74a813");
                    break;
            }
            break;
        case 1:
            //지하철
            switch (codeType.subwayCode) {
                case 1:
                    setColor("#11419F");
                    break;
                case 2:
                    setColor("#37B42D");
                    break;
                case 3:
                    setColor("#FA5F2C");
                    break;
                case 4:
                    setColor("#3E7AD6");
                    break;
                case 5:
                    setColor("#9A58C0");
                    break;
                case 6:
                    setColor("#9D5316");
                    break;
                case 7:
                    setColor("#97A05A");
                    break;
                case 8:
                    setColor("#F073A4");
                    break;
                case 9:
                    setColor("#C3A52D");
                    break;
                case 109:
                    setColor("#A9022D");
                    break;
                case 104:
                    setColor("#7DC4A5");
                    break;
                case 101:
                    setColor("#70B7E5");
                    break;
                case 116:
                    setColor("#ffe600");
                    break;
                case 107:
                    setColor("#80CE79");
                    break;
                case 22:
                    setColor("#FFB952");
                    break;
                case 113:
                    setColor("#CAC615");
                    break;
                case 108:
                    setColor("#26A97F");
                    break;
                case 117:
                    setColor("#003499");
                    break;
                case 110:
                    setColor("#FF8E00");
                    break;
                case 115:
                    setColor("#9F7E20");
                    break;
            }
            break;
    }
}
export const selectType = (data: any) => {

    if (data.class === 1) {
        if (data.type === 4 || data.type === 6 || data.type === 14) {
            return ("#E86359");
        } else if (data.type === 1) {
            return ("#95C53C");
        } else if (data.type === 3) {
            return ("#74a813");
        } else if (data.type === 11) {
            return ("#2560e8");
        } else if (data.type === 12) {
            return ("#74a813");
        }
    }
    else if (data.class === 2) {
        if (data.type === 1) {
            return ("#11419F");
        } else if (data.type === 2) {
            return ("#37B42D");
        } else if (data.type === 3) {
            return ("#FA5F2C");
        } else if (data.type === 4) {
            return ("#3E7AD6");
        } else if (data.type === 5) {
            return ("#9A58C0");
        } else if (data.type === 6) {
            return ("#9D5316");
        } else if (data.type === 7) {
            return ("#97A05A");
        } else if (data.type === 8) {
            return ("#F073A4");
        } else if (data.type === 9) {
            return ("#C3A52D");
        } else if (data.type === 9) {
            return ("#C3A52D");
        } else if (data.type === 109) {
            return ("#A9022D");
        } else if (data.type === 104) {
            return ("#7DC4A5");
        } else if (data.type === 101) {
            return ("#70B7E5");
        } else if (data.type === 116) {
            return ("#ffe600");
        } else if (data.type === 107) {
            return ("#80CE79");
        } else if (data.type === 107) {
            return ("#80CE79");
        } else if (data.type === 22) {
            return ("#FFB952");
        } else if (data.type === 113) {
            return ("#CAC615");
        } else if (data.type === 108) {
            return ("#26A97F");
        } else if (data.type === 117) {
            return ("#003499");
        } else if (data.type === 110) {
            return ("#FF8E00");
        } else if (data.type === 115) {
            return ("#9F7E20");
        }
    }
    else {
        return "gray";
    }
}