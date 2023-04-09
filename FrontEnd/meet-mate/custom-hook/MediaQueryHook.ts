import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
export const useMediaHook = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    useEffect(() => {
        mobile ? setIsMobile(true) : setIsMobile(false)
    }, [mobile]);
    return isMobile;
}