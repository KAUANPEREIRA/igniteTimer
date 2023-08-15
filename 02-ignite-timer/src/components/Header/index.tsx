import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { HeaderContainer } from "./style";
export const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo do site" />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
