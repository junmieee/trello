import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { toDoState, cardState, cardModalState, isDarkState } from "../atoms.tsx";
import { useSetRecoilState, SetterOrUpdater } from "recoil";


const CardText = styled.span<{ isDragging: boolean; isDark: boolean }>`
  font-size: 18px;
  //color: ${(props) => (props.isDragging === true ? "white" : "darkgray")};
  margin-right: auto;
  color: "#576574"
  
  
`;




const CardEditButton = styled.button<{ isDragging: boolean }>`
border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.isDragging === true ? "white" : "rgba(178, 190, 195,1.0)")};
  color: ${(props) => (props.isDragging === true ? "rgba(178, 190, 195,1.0)" : "white")};
  padding: 4.5px 7px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
  transition: background-color 0.3s, color 0.3s, opacity 0.3s;


`


const CardDeleteButton = styled.button<{ isDragging: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.isDragging === true ? "white" : "rgba(178, 190, 195,1.0)")};
  color: ${(props) => (props.isDragging === true ? "rgba(178, 190, 195,1.0)" : "white")};
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 12px;
  transition: background-color 0.3s, color 0.3s, opacity 0.3s;

`;

const Buttons = styled.div`
display:flex;

transition: opacity 0.3s;


`;

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#7f8fa6" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
  display:flex;
  justify-content: space-between;
  align-items: center;
  &.hovering {
		box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.25);
	}
  &:not(:hover):not(:focus-within) ${CardEditButton}, &.dragging ${CardEditButton} {
		opacity: 0;
	}
    &:not(:hover):not(:focus-within) ${CardDeleteButton}, &.dragging ${CardDeleteButton} {
		opacity: 0;
	}

`;


interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: number;
};

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
    const setTodos = useSetRecoilState(toDoState)
    const setCardModal: SetterOrUpdater<boolean> = useSetRecoilState(cardModalState);
    const setCard: SetterOrUpdater<object> = useSetRecoilState(cardState);

    const handleDeleteTodo = (todoId: number): void => {
        setTodos((todos) => {
            const copiedTodos = [...todos[boardId]];
            const filteredTodos = copiedTodos.filter((todo) => todo.id !== todoId);
            const result = { ...todos, [boardId]: filteredTodos };
            return result;
        });
    };
    const handleEditTodo = (boardId: string, toDoId: number): void => {
        setCard({ [boardId]: toDoId });
        setCardModal(true);
    };
    const [isDarkMode, setDarkMode] = React.useState(isDarkState);

    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    <CardText isDark={isDarkMode} isDragging={snapshot.isDragging}>{toDoText}</CardText>
                    <Buttons>
                        <CardEditButton onClick={() => handleEditTodo("" + boardId, toDoId)} isDragging={snapshot.isDragging} type="button">
                            ✎
                        </CardEditButton>
                        <CardDeleteButton
                            onClick={() => handleDeleteTodo(toDoId)}
                            isDragging={snapshot.isDragging}>
                            ✕
                        </CardDeleteButton>
                    </Buttons>

                </Card>
            )}
        </Draggable>
    )
}


//memo: don't rerender the DragabbleCard if the props don't change
export default React.memo(DragabbleCard);