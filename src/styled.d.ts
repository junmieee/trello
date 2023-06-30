import "styled-components";

declare module "styled-components" {
<<<<<<< HEAD
    export interface darkTheme {
        bgColor: string;
        boardColor: string;
        cardColor: string;
    }
}

declare module "styled-components" {
    export interface lightTheme {
        bgColor: string;
        boardColor: string;
        cardColor: string;
    }
=======
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
>>>>>>> 72f7b5fde0a228cf5a7d1fec77239f22508ea852
}
