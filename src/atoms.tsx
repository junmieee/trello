import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist();

interface IToDoState {
    [key: string]: IToDo[];
}

export interface IToDo {
    id: number;
    text: string;
};


// Window innerWidth값
export const windowWidth = atom({
    key: "windowWidth",
    default: window.innerWidth,
});


//배너 사이즈
export const BannerSize = selector({
    key: "bannerSize",

    get: ({ get }) => {
        const bannerwidth = get(windowWidth);
        if (bannerwidth < 501) {
            return "w500";

        } else {
            return "";
        }
    },
});



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
<<<<<<< HEAD
        "To Do": [
        ],
=======
        "To Do": [],
>>>>>>> 72f7b5fde0a228cf5a7d1fec77239f22508ea852
        Doing: [],
        Done: [],
    },
});

<<<<<<< HEAD
export const cardState = atom<object>({ key: "cardState", default: {} });

export const cardModalState = atom<boolean>({ key: "cardModalState", default: false });


export const TrashCanState = atom<boolean>({
    key: 'trashcan',
    default: true,
=======


export const sliderCnt = selector({
    key: "sliderCnt",
    get: ({ get }) => {
        const width = get(windowWidth);
        if (width > 1400) {
            return 6;
        } else if (width > 1130) {
            return 5;
        } else if (width > 900) {
            return 4;
        } else if (width > 680) {
            return 3;
        } else if (width > 250) {
            return 2;
        } else {
            return 1;
        }
    },
>>>>>>> 72f7b5fde0a228cf5a7d1fec77239f22508ea852
});