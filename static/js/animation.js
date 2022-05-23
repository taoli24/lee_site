import {Visual} from "./visual.js";

class App {
    constructor() {
        const container = document.querySelector('.header-animation-container')
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas)
        // document.body.appendChild(this.canvas);
        this.ctx1 = this.canvas.getContext('2d');


        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        WebFont.load({
            google: {
                families: ['Oswald:700']
            },
            fontactive: () => {
                this.visual = new Visual();

                window.addEventListener('resize', this.resize.bind(this), false);

                this.resize();

                requestAnimationFrame(this.animate.bind(this));
            },
        });
    }

    resize() {
        this.stageWidth = this.canvas.parentElement.clientWidth;
        this.stageHeight = this.canvas.parentElement.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.canvas.style.width = this.stageWidth + 'px';
        this.canvas.style.height = this.stageHeight + 'px';

        this.ctx1.scale(this.pixelRatio, this.pixelRatio);
        this.ctx1.lineCap = 'round';
        this.ctx1.lineWidth = 3;

        this.visual.show(this.stageWidth, this.stageHeight);


    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx1.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.visual.animate(this.ctx1);
    }
}

window.onload = () => {
    new App();
}