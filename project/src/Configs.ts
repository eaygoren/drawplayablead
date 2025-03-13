// Define asset references with aliases and sources for images
export const ASSETS = [
    { alias: "background",      src: "assets/environment/background.png" },
    { alias: "board",           src: "assets/environment/board.png" },
    { alias: "brain",           src: "assets/environment/brain.png" },
    { alias: "fail",            src: "assets/environment/fail.png" },
    { alias: "floor",           src: "assets/environment/floor.jpg" },
    { alias: "hand",            src: "assets/environment/hand.png" },
    { alias: "install",         src: "assets/environment/install.png" },
    { alias: "logo",            src: "assets/environment/logo.png" },
    { alias: "tryagain",        src: "assets/environment/tryagain.png" },
    { alias: "trynow",          src: "assets/environment/trynow.png" },
    { alias: "welldone",        src: "assets/environment/welldone.png" },
    //#region confetti particle assets
    { alias: "0",               src: "assets/confetties/0.png" },
    { alias: "1",               src: "assets/confetties/1.png" },
    { alias: "2",               src: "assets/confetties/2.png" },
    { alias: "3",               src: "assets/confetties/3.png" },
    { alias: "4",               src: "assets/confetties/4.png" },
    { alias: "5",               src: "assets/confetties/5.png" },
    { alias: "6",               src: "assets/confetties/6.png" },
    { alias: "7",               src: "assets/confetties/7.png" },
    { alias: "8",               src: "assets/confetties/8.png" },
    //#endregion
    //#region shape assets
    { alias: "bottle",          src: "assets/shapes/bottle.png" },
    { alias: "highheel",        src: "assets/shapes/highheel.png" },
    { alias: "lamp",            src: "assets/shapes/lamp.png" },
    { alias: "ship",            src: "assets/shapes/ship.png" },
    //#endregion
];

export enum DIMENTIONS {
    landscape = "landscape",
    portrait = "portrait"
}

export enum SHAPES {
    bottle = "bottle",
    highheel = "highheel",
    lamp = "lamp",
    ship = "ship",
}