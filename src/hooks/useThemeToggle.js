import { useState, useEffect } from "react";

const lightTheme = "light";
const darkTheme = "dark";

/*
 * Func to get a theme from localStorage
 * @return {string} name of preferred theme
 */

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme");
};

/*
 * Func to set a theme to localStorage an user preferred theme
 * @param {string} newTheme - name to set
 */
const setThemeToLocalStorage = (newTheme) => {
  localStorage.setItem("theme", newTheme);
};

/*
 * Func to get user preferred theme based on os/browser settings
 * @return {string} name of preferred theme
 */

const getUserPreferredTheme = () => {
  const doesUserPreferDark =
    matchMedia && matchMedia("(prefers-color-theme: dark").matches;
  return doesUserPreferDark ? darkTheme : lightTheme;
};

/*
 * Custom hook to toggle themes. Inititally, it sets the user's preferred theme
 * @return {func} func to toggle themes
 * @return {string} name of preferred theme
 */

const useThemeToggle = () => {
  const [theme, SetTheme] = useState(
    () => getThemeFromLocalStorage() || getUserPreferredTheme()
  );

  // Call setThemeToLocalStorage func everytime when theme changes
  useEffect(() => {
    setThemeToLocalStorage(theme);
  }, [theme]);

  // Handle func to toggle between themes
  const toggleTheme = () => {
    theme === lightTheme ? SetTheme(darkTheme) : SetTheme(lightTheme);
  };

  return { theme, toggleTheme };
};

export default useThemeToggle;
