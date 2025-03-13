import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { eventBus } from "./EventBus";
import { ASSETS, SHAPES } from "./Configs";
import { Drawer } from "./Drawer";

globalThis.eventBus = eventBus;

export class core extends PIXI.Container {
    private _app: PIXI.Application;

    /**
     * Initializes the core class and creates a new PIXI application.
     */
    constructor() {
        super();

        this._app = new PIXI.Application();

        this._app.stage.addChild(this);

        (globalThis as any).__PIXI_APP__ = this._app;
    }

    /**
     * Asynchronous initialization of the core system, loading assets and setting up components.
     */
    async init() {
        await this._app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "White",
        });

        document.getElementById("Container")?.appendChild(this._app.canvas);

        await PIXI.Assets.load(ASSETS);
        await document.fonts.ready;

        const background = new Background(this._app);
        this.addChild(background);

        const drawer = new Drawer(this._app, SHAPES.ship);
        this.addChild(drawer);

        window.addEventListener("resize", this.onResize.bind(this));

        this.onResize();
    }

    /**
     * Handles window resize events and adjusts the canvas size accordingly.
     */
    onResize(): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        this._app.renderer.resize(screenWidth, screenHeight);

        this._app.canvas.style.width = `${screenWidth}px`;
        this._app.canvas.style.height = `${screenHeight}px`;
        this._app.canvas.style.margin = "0";
    }
}