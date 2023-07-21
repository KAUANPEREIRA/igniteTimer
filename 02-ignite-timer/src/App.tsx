import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button/Button";
import { GlobalStyle } from "./styles/themes/Global";
import { defaultTheme } from "./styles/themes/default";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
