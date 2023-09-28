import { createContext, useState } from "react";
import '../css/cardCSS.css';
import '../css/layoutCSS.css';
import '../css/backgroundCSS.css';


export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [pageTheme, setPageTheme] = useState("light-bg");
    const [cardTheme, setCardTheme] = useState("card-light");
    const [layoutTheme, setLayoutTheme] = useState("light-layout");
    const [tableTheme, setTableTheme] = useState("light-table");


    const toggleTheme = () => {
        setPageTheme((prevTheme) => (prevTheme === 'light-bg' ? 'dark-bg' : 'light-bg'));
        setCardTheme((prevTheme) => (prevTheme === 'card-light' ? 'card-dark' : 'card-light'));
        setLayoutTheme((prevTheme) => (prevTheme === 'light-layout' ? ' dark-layout' : 'light-layout'));
        setTableTheme((prevTheme) => (prevTheme === 'light-table' ? ' dark-table' : 'light-table'))
    };

    return <ThemeContext.Provider value={{ pageTheme, cardTheme, layoutTheme, tableTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}