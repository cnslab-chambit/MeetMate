export const useDrawPolyLine = (lane: any) => {
    console.log(lane)
    const lineArr = [];
    for (let j = 0; j < lane?.section?.length; j++) {
        for (let k = 0; k < lane.section[j].graphPos.length; k++) {
            lineArr.push({ lat: lane.section[j].graphPos[k].y, lng: lane.section[j].graphPos[k].x });
        }
    }
    // mapRef.current.setBounds(bounds);
    return lineArr;
}
export const useMultiDrawPolyLine = (box: any) => {
    console.log(box)
    const lineArr: any = [];
    box.map((e: any) => {
        for (let j = 0; j < e?.lane?.section?.length; j++) {
            for (let k = 0; k < e?.lane.section[j].graphPos.length; k++) {
                lineArr.push({ lat: e?.lane.section[j].graphPos[k].y, lng: e?.lane.section[j].graphPos[k].x });
            }
        }
    })
    console.log(lineArr)
    return lineArr;
}
export const useSelectType = (tclass: number, type: number): string => {
    console.log(tclass)
    if (tclass === 2) {
        if (type === 1) {
            return ("#11419F");
        } else if (type === 2) {
            return ("#37B42D");
        } else if (type === 3) {
            return ("#FA5F2C");
        } else if (type === 4) {
            return ("#3E7AD6");
        } else if (type === 5) {
            return ("#9A58C0");
        } else if (type === 6) {
            return ("#9D5316");
        } else if (type === 7) {
            return ("#97A05A");
        } else if (type === 8) {
            return ("#F073A4");
        } else if (type === 9) {
            return ("#C3A52D");
        } else if (type === 9) {
            return ("#C3A52D");
        } else if (type === 109) {
            return ("#A9022D");
        } else if (type === 104) {
            return ("#7DC4A5");
        } else if (type === 101) {
            return ("#70B7E5");
        } else if (type === 116) {
            return ("#ffe600");
        } else if (type === 107) {
            return ("#80CE79");
        } else if (type === 107) {
            return ("#80CE79");
        } else if (type === 22) {
            return ("#FFB952");
        } else if (type === 113) {
            return ("#CAC615");
        } else if (type === 108) {
            return ("#26A97F");
        } else if (type === 117) {
            return ("#003499");
        } else if (type === 110) {
            return ("#FF8E00");
        } else if (type === 115) {
            return ("#9F7E20");
        }
    }
    if (tclass === 1) {
        return "gray"
    }
    return "gray"
}

// export const useMultiuSelectType = (data: any) => {
//     if (tclass === 2) {
//         if (type === 1) {
//             return ("#11419F");
//         } else if (type === 2) {
//             return ("#37B42D");
//         } else if (type === 3) {
//             return ("#FA5F2C");
//         } else if (type === 4) {
//             return ("#3E7AD6");
//         } else if (type === 5) {
//             return ("#9A58C0");
//         } else if (type === 6) {
//             return ("#9D5316");
//         } else if (type === 7) {
//             return ("#97A05A");
//         } else if (type === 8) {
//             return ("#F073A4");
//         } else if (type === 9) {
//             return ("#C3A52D");
//         } else if (type === 9) {
//             return ("#C3A52D");
//         } else if (type === 109) {
//             return ("#A9022D");
//         } else if (type === 104) {
//             return ("#7DC4A5");
//         } else if (type === 101) {
//             return ("#70B7E5");
//         } else if (type === 116) {
//             return ("#ffe600");
//         } else if (type === 107) {
//             return ("#80CE79");
//         } else if (type === 107) {
//             return ("#80CE79");
//         } else if (type === 22) {
//             return ("#FFB952");
//         } else if (type === 113) {
//             return ("#CAC615");
//         } else if (type === 108) {
//             return ("#26A97F");
//         } else if (type === 117) {
//             return ("#003499");
//         } else if (type === 110) {
//             return ("#FF8E00");
//         } else if (type === 115) {
//             return ("#9F7E20");
//         }
//     }
//     if (tclass === 1) {
//         return "gray"
//     }
//     return "gray"
// }
