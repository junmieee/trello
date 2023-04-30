import { atom, selector } from "recoil";

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





export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    },
});



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
});