import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "default" | "sapin";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("campaign-theme") as Theme) || "default";
  });

  useEffect(() => {
    localStorage.setItem("campaign-theme", theme);
    if (theme === "sapin") {
      document.documentElement.classList.add("theme-sapin");
    } else {
      document.documentElement.classList.remove("theme-sapin");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "default" ? "sapin" : "default"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
