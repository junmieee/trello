import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
// <<<<<<< HEAD
// import { darkTheme } from "./theme.ts";
// import { isLightState } from "./atoms.tsx";





// ReactDOM.render(
//   <React.StrictMode>
//     <RecoilRoot>
//       <App />
//     </RecoilRoot>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
// =======
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";
import { QueryClient, QueryClientProvider } from "react-query";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

 /* REM rules */
 html{font-size:3px !important;}
  @media screen and (min-width:216px){html{font-size:3.5px !important;}}
  @media screen and (min-width:229px){html{font-size:3.8px !important;}}
  @media screen and (min-width:250px){html{font-size:4.2px !important;}}
  @media screen and (min-width:252px){html{font-size:4.5px !important;}}
  @media screen and (min-width:288px){html{font-size:4.8px !important;}}
  @media screen and (min-width:300px){html{font-size:5px !important;}}
  /* iphone 5 */
  @media screen and (min-width:320px){html{font-size:6px !important;}}
  @media screen and (min-width:360px){html{font-size:7px !important;}}
  @media screen and (min-width:396px){html{font-size:8px !important;}}
  @media screen and (min-width:432px){html{font-size:8.4px !important;}}
  @media screen and (min-width:460px){html{font-size:8.8px !important;}}
  @media screen and (min-width:504px){html{font-size:9.2px !important;}}
  @media screen and (min-width:540px){html{font-size:9.5px !important;}}
  @media screen and (min-width:576px){html{font-size:9.8px !important;}}
  @media screen and (min-width:600px){html{font-size:10px !important;}}
  @media screen and (min-width:820px){html{font-size:10px !important;}}
  body {font-size:1rem !important;}

/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const client = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
// >>>>>>> 72f7b5fde0a228cf5a7d1fec77239f22508ea852
