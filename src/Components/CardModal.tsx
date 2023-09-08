import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilState, SetterOrUpdater } from "recoil";
import { toDoState, cardState, cardModalState } from "../atoms.tsx";
import { SlPencil } from "react-icons/sl";
import React from "react";


const ModalContainer = styled(Modal)`
top:50%;
left:50%;
transform:translate(-50%, -50%);
position:absolute;
  width: 320px;
  height: 180px;
  background-color: #c8d6e5;
  outline: none;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;


  button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    outline: none;
    background-color: rgba(178, 190, 195, 0.5);
    color: white;
    padding: 8px 10px;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      text-align: center;
      h1 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 25px;
        font-weight: 400;
      }
    }
    input {
        border: none;
        outline: none;
        font-size: 16px;
        padding: 17px 20px;
        padding-left: 13px;
        border-radius: 5px;
        width: calc(100% - 100px);
      }
}
    
`;


interface FormData {
    text: string;
}

export interface Todo {
    id: number;
    text: string;
}
export interface TodosState {
    [key: string]: Todo[];
}


export const CardModal = () => {
    const { register, handleSubmit, getValues, setValue } = useForm<FormData>({ mode: "onChange" });
    const setTodos: SetterOrUpdater<TodosState> = useSetRecoilState(toDoState);
    const [card, setCard] = useRecoilState(cardState);
    const [cardModal, setCardModal] = useRecoilState<boolean>(cardModalState);
    // console.log(Object.keys(card)[0]);


    const handleCloseModal = (): void => {
        return setCardModal(false);
    };

    const onValid = (): void => {
        setTodos((todos) => {
            const { text } = getValues();
            const copiedTodos = [...todos[Object.keys(card)[0]]];
            const editingTodoIndex: number = copiedTodos.findIndex((todo) => todo.id === Object.values(card)[0]);
            copiedTodos.splice(editingTodoIndex, 1);
            const editedTodo: Todo = { id: Object.values(card)[0], text };
            copiedTodos.splice(editingTodoIndex, 0, editedTodo);
            const result = { ...todos, [Object.keys(card)[0]]: copiedTodos };
            return result;

        });
        setCard({});
        setValue("text", "");
        handleCloseModal();

    }


    return (
        <ModalContainer
            isOpen={cardModal}
        >
            <button onClick={handleCloseModal}>✕</button>
            <form onSubmit={handleSubmit(onValid)}>
                <div>
                    <h1><SlPencil /></h1>
                    <input {...register("text", { required: "할 일을 수정하세요." })} type='text'></input>
                </div>
            </form>
        </ModalContainer>

    )
}

export default CardModal;