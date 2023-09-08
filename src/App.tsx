import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "react-beautiful-dnd";
import { useRecoilState, SetterOrUpdater, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, BoardState, isDarkState, TrashCanState } from "./atoms.tsx";
import React, { useEffect, useState } from "react";
import Board from "./Components/Board.tsx"
import { CardModal } from "./Components/CardModal.tsx";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme.ts";
import { createGlobalStyle } from "styled-components";
import { onDragEnd } from "./utils/index.ts";
import { TrashCan } from '../src/Components/TrashCan.tsx'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { IToDoState } from "./atoms";



function App() {
  const [isDarkMode, setDarkMode] = useRecoilState(isDarkState);
  const [boardsmove, setBoards] = useRecoilState<string[]>(BoardState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setTrashCan = useSetRecoilState(TrashCanState);


  console.log('boardsmove', boardsmove)
  const onAdd = () => {
    const name = window.prompt("새 보드의 이름을 입력해주세요.")?.trim();

    if (name !== null && name !== undefined) {
      if (name === "") {
        alert("이름을 입력해주세요.");
        return;
      }
      const updatedBoards = [...boardsmove, name];

      const updatedToDos = { ...toDos };
      updatedToDos[name] = [];

      console.log('updatedBoards', updatedBoards)
      setBoards(updatedBoards);
      setToDos(updatedToDos);
    }
  };


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
    if (info.type === "DEFAULT")
      setTrashCan(true);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />

      <Navigation>
        <Button onClick={onAdd}>+</Button>

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
        onDragEnd={(info) => onDragEnd(info, setBoards, setToDos, setTrashCan)}
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
                    setBoards={setBoards}
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
          line - height: 1;
  }
        menu, ol, ul {
          list - style: none;
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
          border - collapse: collapse;
        border-spacing: 0;
  }
        * {
          box - sizing: border-box;
  }
        body {
          font - weight: 300;
        font-family: 'Source Sans Pro', sans-serif;
        color:black;
        line-height: 1.2;
        background-color: ${(props) => props.theme.bgColor};
  }
        a {
          text - decoration:none;
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