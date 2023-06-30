import { useForm } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard.tsx";
import { ITodo, toDoState } from "../atoms.tsx";
import { Snapshot, useSetRecoilState } from "recoil";
import React from "react";


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
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
`;
interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
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


interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
    index: number;
}
interface IForm {
    toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]],
            };
        });
        setValue("toDo", "");
    };
    return (
        <Draggable draggableId={boardId} index={index} key={boardId} >
            {(magic, Snapshot) => (
                <Wrapper
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                    ref={magic.innerRef}
                >
                    <Title>{boardId}</Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", { required: true })}
                            type="text"
                            placeholder={`Add task on ${boardId}`}
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