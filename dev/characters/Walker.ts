/// <reference path="./Character.ts"/>

class Walker extends Character {
  constructor() {
    super("walker");
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = (window.innerHeight / 100) *(Math.random() * 100);
    this.update();
  }

  public update() {
    this.x = this.x - 10;
    this.removeIfLeavesScreen();
    this.draw();
  }

  private draw(): void {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
