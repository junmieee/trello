import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#222222",
  boardColor: "#535c68",
  cardColor: "white",
  textColor: "#f5f6fa",
  trashCan: '#d2dae2',
  plusBtn: {
    default: 'rgb(253, 150, 68, 0.5)',
    hover: 'rgb(250, 130, 49, 0.8)'
  }

};

export const lightTheme: DefaultTheme = {
  bgColor: "#E7E7E9",
  cardColor: "white",
  boardColor: "#EFEFEF",
  textColor: "#2f3542",
  trashCan: '#2C3A47',
  plusBtn: {
    default: ' rgb(247, 183, 49, 0.5)',
    hover: 'rgb(247, 183, 49,0.8)'
  }

};



export const theme: DefaultTheme = {
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};
