import {Container,NavLogo,Navigation,NavMenu} from "../../m-styled-component/nav-component/nav_styled";

function MobileNav(){
    return (
        <Navigation>
            <div style={{display:"flex", color: "white"}}>
                <NavLogo><span>Meet Mate</span></NavLogo>
                <NavMenu>menu</NavMenu>
            </div>
        </Navigation>
    );
}
export default MobileNav;