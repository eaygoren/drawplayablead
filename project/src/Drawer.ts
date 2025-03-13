import * as PIXI from "pixi.js";
import { FederatedPointerEvent } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPES } from "./Configs";

export class Drawer extends PIXI.Container {
    private _app: PIXI.Application;
    private _shape: Shape;
    private _graphics: PIXI.Graphics;
    private _drawing: boolean = false;
    private _drawnPixels: Set<string> = new Set();
    private _nonTransparentPixels: Set<string> = new Set();

    constructor(app: PIXI.Application, shape: SHAPES) {
        super();

        this._app = app;
        this.interactive = true;
        this._app.stage.interactive = true;

        this._shape = new Shape(shape);
        this.addChild(this._shape);

        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);

        this.init();
    }

    private async init() {
        await this.detectNonTransparentPixels(this._shape.shape.texture);
        this.eventListeners();
    }

    private async detectNonTransparentPixels(texture: PIXI.Texture) {
        const image = await this.loadImage("assets/shapes/ship.png"); //TODO: shape'den src alınacak
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const imageData: ImageData = context.getImageData(0, 0, image.width, image.height);

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                const index = (y * imageData.width + x) * 4;
                const alpha = imageData.data[index + 3];
                if (alpha > 0) {
                    this._nonTransparentPixels.add(`${x},${y}`);
                }
            }
        }
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    private eventListeners(): void {
        this._shape.shape.on("pointerdown", this.onPointerDown.bind(this));
        this._shape.shape.on("pointerup", this.onPointerUp.bind(this));
        this._shape.shape.on("pointermove", this.onPointerMove.bind(this));
    }

    private onPointerDown(event: FederatedPointerEvent): void {
        this._drawing = true;
        this._graphics.clear();
        this._drawnPixels.clear();
    }

    private onPointerUp(event: FederatedPointerEvent): void {
        this._drawing = false;
        this.checkDrawingCompletion();
    }

    private onPointerMove(event: FederatedPointerEvent): void {
        if (!this._drawing) return;

        const { x, y } = event.data.global;

        // Convert global coordinates to shape's local coordinates
        const localPoint = this._shape.shape.toLocal(new PIXI.Point(x, y), this._app.stage);
        const pixelKey = `${Math.floor(localPoint.x)},${Math.floor(localPoint.y)}`;

        if (!this._drawnPixels.has(pixelKey)) {
            this._drawnPixels.add(pixelKey);

            // Check if the pixel is non-transparent
            if (this._nonTransparentPixels.has(pixelKey)) {
                this._graphics.fill({ color: 0xff0000, alpha: 1 });
                this._graphics.circle(x, y, 15);
                this._graphics.closePath();

                this._app.renderer.render(this._graphics);
            } else {
                console.log("Transparent area drawn!");
            }
        } else {
            console.log("Already drawn!");
        }
    }

    private checkDrawingCompletion(): void {
        let drawnCount = 0;
        this._nonTransparentPixels.forEach(pixel => {
            if (this._drawnPixels.has(pixel)) {
                drawnCount++;
            }
        });

        if (drawnCount === this._nonTransparentPixels.size) {
            console.log("Shape fully drawn!");
        } else {
            console.log("Shape not fully drawn.");
        }
    }
}