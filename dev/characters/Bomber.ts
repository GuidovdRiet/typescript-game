/// <reference path="../GameObject.ts"/>

class Bomber extends GameObject {
    constructor() {
        super();

        this.x = 50;
        this.y = 100;

        this.div = document.createElement('bomber');
        document.body.appendChild(this.div);

        this.draw(this.x, this.y);
    }
}