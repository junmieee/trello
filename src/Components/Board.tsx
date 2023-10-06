import { useForm } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard.tsx";
import { ITodo, toDoState } from "../atoms.tsx";
import { useSetRecoilState } from "recoil";
import React from "react";
import { IToDoState } from "../atoms";
import { FaTrash } from "react-icons/fa";


interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
    index: number;
    setBoards: any;
}
interface IForm {
    toDo: string;
}

function Board({ toDos = [], boardId, index, setBoards }: IBoardProps) {
    const setToDos = useSetRecoilState<IToDoState>(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((toDos) => {
            return {
                ...toDos,
                [boardId]: [...toDos[boardId], newToDo],
            };
        });
        setValue("toDo", "");
        console.log('boardId', boardId)
    };


    const onDeleteBoard = (boardId) => {
        // setToDos((allBoards) => {
        //     const updatedBoards = { ...allBoards };
        //     delete updatedBoards[boardId];
        //     return updatedBoards;
        // });

        // 보드 목록 업데이트
        setBoards((prevBoards) => {
            return prevBoards.filter((b) => b !== boardId);
        });
    };

    return (
        <Draggable draggableId={boardId} index={index} key={boardId} >

            {(magic, Snapshot) => (
                <Wrapper
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                    ref={magic.innerRef}
                >
                    <TitleWrapper>
                        <Title>{boardId}</Title>
                        <DeleteButton
                            onClick={() => onDeleteBoard(boardId)}><FaTrash size={20} /></DeleteButton>
                    </TitleWrapper>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", { required: true })}
                            type="text"
                            placeholder={`${boardId}에 추가`}
                        />
                    </Form>
                    <Droppable droppableId={boardId}>
                        {(magic, info) => (
                            <Area
                                isDraggingOver={info.isDraggingOver}
                                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {toDos.map((toDo, index) => (
                                    <DragabbleCard
                                        key={toDo.id}
                                        index={index}
                                        toDoId={toDo.id}
                                        toDoText={toDo.text}
                                        boardId={boardId}
                                    />
                                ))}
                                {magic.placeholder}
                            </Area>
                        )}
                    </Droppable>
                </Wrapper>
            )}
        </Draggable >
    );
}
export default React.memo(Board);


const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
 
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-right: 18px;
`;



interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
        props.isDraggingOver
            ? "#a5b1c2"
            : props.isDraggingFromThis
                ? "#b2bec3"
                : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;


const Form = styled.form`
  width: 100%;
  input {
    width:100%;
    border-width:1.5px;
    border: none;
    outline: none;
  border-radius: 3px;
  font-size: 15px;
  height:26px;
  ::placeholder{
    text-align: center;
  }
  }
  
`;




const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
  flex-grow: 1; 
  display: flex; 
  justify-content: center; 
`;


const DeleteButton = styled.div`
cursor: pointer;
bottom: 3px;
margin-bottom: 5px;

position: absolute;
right: 1rem;
opacity: 0; 
transition: opacity 0.4s; 
svg {
    color: ${(props) => props.theme.trashCan};

}
`;



const TitleWrapper = styled.div`
display: flex;
alignItems: center;
justifyContent: space-between;
position: relative;
&:hover ${DeleteButton}{ 
    opacity: 1;
  }

`
