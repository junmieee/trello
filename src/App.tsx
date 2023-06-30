import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "react-beautiful-dnd";
import { useRecoilState, SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, BoardState, isDarkState, TrashCanState } from "./atoms.tsx";
import React, { useEffect } from "react";
import Board from "./Components/Board.tsx"
import { CardModal } from "./Components/CardModal.tsx";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme.ts";
import { createGlobalStyle } from "styled-components";
import { BiSun, BiMoon } from "react-icons/bi";
import { onDrageEnd } from "./untils/index.ts";
import { TrashCan } from '../src/Components/TrashCan.tsx'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

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
  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    color:black;
    line-height: 1.2;
    background-color: ${(props) => props.theme.bgColor};
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;

const Navigation = styled.nav`
  display: flex;
  position: fixed;
  padding: 2.5rem 3rem;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 680px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: color 0.3s;
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  transition: color 0.3s;
  padding: 0;
  border-radius: 0.2rem;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

function App() {
  const [isDarkMode, setDarkMode] = useRecoilState(isDarkState);
  const [boardsmove, setBoards] = useRecoilState(BoardState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setTrashCan = useSetRecoilState(TrashCanState);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    const storedToDos = localStorage.getItem("toDos");
    if (storedToDos) {
      setToDos(JSON.parse(storedToDos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === "DEFAULT") setTrashCan(true);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />

      <Navigation>
        <Buttons>
          <DarkModeSwitch
            style={{ marginBottom: "2rem", display: "flex", right: "0px" }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={60}
          />
        </Buttons>
      </Navigation>

      <DragDropContext
        onDragEnd={(info) =>
          onDrageEnd(info, setBoards, setToDos, setTrashCan)
        }
        onBeforeDragStart={onBeforeDragStart}
      >
        <Wrapper>
          <Droppable droppableId="boards" direction="horizontal" type="board">
            {(magic) => (
              <Boards
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {boardsmove.map((boardId, index) => (
                  <Board
                    boardId={boardId}
                    index={index}
                    key={index}
                    toDos={toDos[boardId]}
                  />
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
          <TrashCan />
        </Wrapper>
      </DragDropContext>

      <CardModal />
    </ThemeProvider>
  );
}

export default App;
// =======
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./Routes/Home.tsx";
// import Tv from "./Routes/Tv.tsx";
// import Search from "./Routes/Search.tsx";
// import Header from "./Routes/Components/Header.tsx"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import SearchPage from "./Routes/Search.tsx";

// function App() {
//     const client = new QueryClient();
//     return (

//         <QueryClientProvider client={client}>
//             <Router>
//                 <Header />
//                 <Routes>
//                     <Route path="/tv" element={<Tv />} />
//                     <Route path="/search" element={<SearchPage />} />
//                     <Route path="/search/:listType/:id" element={<SearchPage />} />
//                     <Route path="/" element={<Home />} />
//                     <Route path="/movies/:movieId" element={<Home />} />
//                     <Route path="/home/:listType/:id" element={<Home />}></Route>
//                     <Route path="/home/banner/:id" element={<Home />}></Route>

//                 </Routes>
//             </Router>
//         </QueryClientProvider>
//     );
// }

// export default App;
// >>>>>>> 72f7b5fde0a228cf5a7d1fec77239f22508ea852
