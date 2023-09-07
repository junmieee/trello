import { DropResult } from 'react-beautiful-dnd';
import { SetterOrUpdater } from 'recoil';
import { IToDoState } from '../atom.tsx';

export const onDragEnd = (info: DropResult, setBoards: SetterOrUpdater<string[]>,
    setToDos: SetterOrUpdater<IToDoState>, setTrashCan: SetterOrUpdater<boolean>

) => {
    const { destination, source } = info;

    if (!destination) return;

    if (source.droppableId === "boards") {
        setBoards((prev) => {

            const boardCopy = [...prev];
            console.log(boardCopy)

            const item = boardCopy.splice(source.index, 1)[0];
            boardCopy.splice(destination.index, 0, item);
            return boardCopy;
        });
    }
    else if (destination.droppableId === "trashcan") {
        setToDos((allBoards) => {
            const boardCopy = [...allBoards[source.droppableId]];
            console.log(boardCopy)

            boardCopy.splice(source.index, 1);
            console.log(boardCopy)
            return { ...allBoards, [source.droppableId]: boardCopy };
        });

    }
    else if (destination?.droppableId === source.droppableId) {
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
    } else if (destination.droppableId !== source.droppableId) {
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