/// <reference path="./Character.ts"/>

class Walker extends Character {

  private baseUrlBackgroundAnimation: string = "../docs/img/characters/zombies/walker/spr_zombie1_attack_";

  constructor() {
    super("walker");
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = window.innerHeight / 100 * (Math.random() * 100);
    this.update();
    // this.animate();
  }

  public update() {
    this.x = this.x - 2;
    this.removeIfLeavesScreen();
    this.draw();
  }

  // private animate() {
  //   setInterval(() => {
  //     this.setWalkingBackground(false, 6, this.baseUrlBackgroundAnimation);
  //   }, 500)
  // }

  private draw(): void {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
