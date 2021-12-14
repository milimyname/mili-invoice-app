import { useRef } from "react";
import { useTheme } from "styled-components";
import Icon from "../shared/icon/Icon";
import { StyledHeader, Logo, ThemeToggle, Profile } from "./StyledHeader";
import { useGlobalContext } from "../app/context";
const Header = () => {
  const { colors } = useTheme();
  const { theme, toggleTheme, discard } = useGlobalContext();
  const isClickable = useRef(true);

  // Func to avoid clicking too much logo cuz it causes a bug
  // with Framer Motion where two fast clicks cause that the component doesn't render
  const handleClick = (event) => {
    if (!isClickable.current) event.preventDefault();
    else {
      isClickable = false;
      setTimeout(() => (isClickable.current = true), 1000);
      discard();
    }
  };

  return (
    <StyledHeader>
      <Logo aria-label="Home Page" to="/" onClick={handleClick} />
      <ThemeToggle aria-label="Theme toggle" onClick={toggleTheme}>
        <Icon
          name={theme === "light" ? "moon" : "sun"}
          size={20}
          color={colors.btnTheme}
          customStyle={{ transition: "color .35s ease-in-out" }}
        />
      </ThemeToggle>
      <Profile />
    </StyledHeader>
  );
};

export default Header;
