import * as PIXI from "pixi.js";
import { DIMENTIONS, SHAPES } from "./Configs";

export class Shape extends PIXI.Container {
    private _shape: PIXI.Sprite;

    constructor(shape: SHAPES) {
        super();

        this.loadShape(shape);
        this.eventListeners();
        this.onResize();
    }

    // Load the PNG shape onto the stage
    private async loadShape(shape: SHAPES) {
        const texture = PIXI.Texture.from(shape);
        this._shape = new PIXI.Sprite(texture);
        this._shape.position.set((window.innerWidth / 2) - (this._shape.width / 2), (window.innerHeight / 2) - (this._shape.height / 2));
        this._shape.interactive = true;
        this._shape.hitArea = new PIXI.Rectangle(0, 0, this._shape.width, this._shape.height);
        this.addChild(this._shape);
    }

    private eventListeners(): void {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize(): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const orientation = screenWidth > screenHeight ? DIMENTIONS.landscape : DIMENTIONS.portrait;

        switch (orientation) {
            case DIMENTIONS.landscape:
                this._shape.height = window.innerHeight * 0.8;
                this._shape.width = window.innerHeight * 0.8;
                break;
            case DIMENTIONS.portrait:
                this._shape.height = window.innerWidth * 0.8;
                this._shape.width = window.innerWidth * 0.8;
                break;
        }
        this._shape.position.set((window.innerWidth / 2) - (this._shape.width / 2), (window.innerHeight / 2) - (this._shape.height / 2));
    }

    public get shape(): PIXI.Sprite {
        return this._shape;
    }
}