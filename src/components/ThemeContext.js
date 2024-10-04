// ThemeContext.js
import React, { createContext, useState } from "react";

// Tạo ThemeContext
 const ThemeContext = createContext();

// Tạo ThemeProvider để bao bọc các component cần sử dụng context
 const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Giá trị mặc định là 'light'

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default { ThemeProvider, ThemeContext };