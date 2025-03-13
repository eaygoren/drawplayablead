import * as PIXI from "pixi.js";
import { DIMENTIONS } from "./Configs";

export class Background extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: PIXI.Sprite;
    private _board: PIXI.Sprite;

    /**
     * Creates a background class instance.
     * @param app - PixiJS application instance.
     */
    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    /**
     * Initializes the background loading process.
     */
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    /**
     * Creates the background sprite and adds it to the scene.
     */
    private create() {
        this._background = PIXI.Sprite.from("background");
        this._background.label = "Background";
        this._background.width = window.innerWidth;
        this._background.height = window.innerHeight;
        this._background.anchor.set(0.5, 0.5);
        this._background.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.addChild(this._background);

        this._board = PIXI.Sprite.from("board");
        this._board.label = "Board";
        this._board.width = window.innerWidth;
        this._board.height = window.innerHeight;
        this._board.anchor.set(0.5, 0.5);
        this._board.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.addChild(this._board);

        this.onResize();
    }

    /**
     * Defines event listeners for the background.
     */
    private eventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize(): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const orientation = screenWidth > screenHeight ? DIMENTIONS.landscape : DIMENTIONS.portrait;

        this._background.width = screenWidth;
        this._background.height = screenHeight;
        this._background.position.set(window.innerWidth / 2, window.innerHeight / 2);

        switch (orientation) {
            case DIMENTIONS.landscape:
                this._board.height = window.innerHeight;
                this._board.width = window.innerHeight;
                break;
            case DIMENTIONS.portrait:
                this._board.height = window.innerWidth;
                this._board.width = window.innerWidth;
                break;
        }
        this._board.position.set(window.innerWidth / 2, window.innerHeight / 2);
    }
}