import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms.tsx";
import React from "react";
import Board from "./Components/Board.tsx"


import DragabbleCard from "./Components/DragabbleCard.tsx";

const Wrapper = styled.div`

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
  justify-content:center;
  align-items: flex-start;
  gap:10px;
  grid-template-columns: repeat(3, 1fr);
`;





const toDos = ["a", "b", "c", "d", "e", "f"];



function App() {
    const [toDos, setToDos] = useRecoilState(toDoState)
    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { destination, draggableId, source } = info;
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            // same board movement.
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            // cross board movement
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];

                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
        //if (!destination) return;
        /* setToDos((oldToDos) => {
            const copyToDos = [...oldToDos];
            //1) delete item on source.index
            copyToDos.splice(source.index, 1);
            //2) put bact the item on the destination.index
            copyToDos.splice(destination?.index, 0, draggableId);
            return copyToDos;
        }); */


    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}

                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}
export default App; 