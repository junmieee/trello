import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist();


export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: ITodo[];
}

export const isLightState = atom<boolean>({
    key: "isLight",
    default: window.matchMedia("(prefers-color-scheme: light)").matches
        ? true
        : false,
    effects_UNSTABLE: [persistAtom],

});

export const isDarkState = atom<boolean>({
    key: "isDarkState", default: false, effects_UNSTABLE: [persistAtom],
});





export const BoardState = atom<string[]>({
    key: 'boards',
    default: ['To Do', 'Doing', 'Done'],
    effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [
        ],
        Doing: [],
        Done: [],
    },
});

export const cardState = atom<object>({ key: "cardState", default: {} });

export const cardModalState = atom<boolean>({ key: "cardModalState", default: false });


export const TrashCanState = atom<boolean>({
    key: 'trashcan',
    default: true,
});