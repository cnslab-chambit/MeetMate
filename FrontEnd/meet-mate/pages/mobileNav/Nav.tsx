import {Container,NavLogo,Navigation,NavMenu} from "../../styles/styled-component/nav-component/nav_styled";

function Nav(){
    return (
    <Container>
        <Navigation>
            <div style={{display:"flex", color: "white"}}>
                <NavLogo><span>Meet Mate</span></NavLogo>
                <NavMenu>menu</NavMenu>
            </div>
        </Navigation>
    </Container>
    );
}
export default Nav;