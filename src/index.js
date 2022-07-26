import React from 'react';
import ReactDOM from 'react-dom';
import "../src/assets/CSS/main.css"
import '../src/assets/CSS/tailwind.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
//fonts
import theme from "./assets/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


