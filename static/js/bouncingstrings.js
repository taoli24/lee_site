import {lineCircle} from "./utils.js";

const BOUNCE = 0.92;

export class BounceString {
    constructor(pos) {
        const middleX = (pos.x2 - pos.x1) / 2 + pos.x1;
        const middleY = (pos.y2 - pos.y1) / 2 + pos.y1;

        this.points = [
            {
                x: pos.x1,
                y: pos.y1,
                ox: pos.x1,
                oy: pos.y1,
                vx: 0,
                vy: 0,
            },
            {
                x: middleX,
                y: middleY,
                ox: middleX,
                oy: middleY,
                vx: 0,
                vy: 0,
            },
            {
                x: pos.x2,
                y: pos.y2,
                ox: pos.x2,
                oy: pos.y2,
                vx: 0,
                vy: 0,
            },
        ];

        this.detect = 10;

        this.saveRgb = 0x748ffc;
        this.rgb = 0x748ffc;
    }

    animate(ctx, moveX, moveY) {
        // ctx.beginPath();
        // ctx.fillStyle = '#00ff00';
        // ctx.arc(moveX, moveY, 6, 0, Math.PI * 2);
        // ctx.fill()
        //
        // ctx.beginPath();
        // ctx.fillStyle = '#0000ff';
        // ctx.arc(this.points[0].x, this.points[0].y, 6, 0, Math.PI * 2);
        // ctx.fill()
        //
        // ctx.beginPath();
        // ctx.fillStyle = '#ff0000';
        // ctx.arc(this.points[2].x, this.points[2].y, 6, 0, Math.PI * 2);
        // ctx.fill()

        this.rgb += (this.saveRgb - this.rgb) * .12

        const red = (this.rgb >> 12) & 0xFF | 0;
        const green = (this.rgb >> 8) & 0xFF | 0;
        const blue = (this.rgb & 0xFF) | 0;

        const color = `rgb(${red}, ${green}, ${blue})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        if (lineCircle(
            this.points[0].x,
            this.points[0].y,
            this.points[2].x,
            this.points[2].y,
            moveX,
            moveY,
            this.detect
        )) {

            this.rgb = 0x444444; //0xf3316e;
            this.detect = 100;
            let tx = moveX;
            let ty = (this.points[1].oy + moveY) / 2;
            this.points[1].vx = tx - this.points[1].x;
            this.points[1].vy = ty - this.points[1].y;
        }
        else {
            this.detect = 10;
            let tx = this.points[1].ox;
            let ty = this.points[1].oy;
            this.points[1].vx += tx -this.points[1].x;
            this.points[1].vx *= BOUNCE;

            this.points[1].vy += ty -this.points[1].y;
            this.points[1].vy *= BOUNCE;
        }

        this.points[1].x += this.points[1].vx;
        this.points[1].y += this.points[1].vy;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.points.length; i++){
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.stroke();
    }
}