/// <reference path="../GameObject.ts"/>

class Bomber extends GameObject {
  private leftSpeed: number = 0;
  private upSpeed: number = 0;
  private downSpeed: number = 0;
  private rightSpeed: number = 0;
  private animationCount: number = 0;

  constructor() {
    super();

    this.div = document.createElement("bomber");
    document.body.appendChild(this.div);

    this.start();

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      this.move(event, 6);
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      this.move(event, 0)
      this.animationCount = 0;
      this.setWalkingBackground(true);
    });
  }

  private start() {
    this.x = 50;
    this.y = 100;
    this.setWalkingBackground(true);
  }

  public move(event: KeyboardEvent, speed: number): void {
    const leftKey: number = 37;
    const upKey: number = 38;
    const rightKey: number = 39;
    const downKey: number = 40;

    switch (event.keyCode) {
      case leftKey:
        this.leftSpeed = speed;
        this.setWalkingBackground(false);
        break;
      case rightKey:
        this.rightSpeed = speed;
        this.setWalkingBackground(false);
        break;
      case upKey:
        this.upSpeed = speed;
        this.setWalkingBackground(false);
        break;
      case downKey:
        this.downSpeed = speed;
        this.setWalkingBackground(false);
        break;
    }
  }

  private setWalkingBackground(startPostion: boolean) {
    const baseUrl = "../docs/img/characters/bomber/spr_player_";
    if (startPostion) {
      this.animationCount = 0;
    } else {
      this.animationCount <= 2
        ? this.animationCount++
        : (this.animationCount = 0);
    }
    this.div.style.backgroundImage = `url(${baseUrl}${
      this.animationCount
    }.png)`;
  }

  public update() {
    let targetX = this.x - this.leftSpeed + this.rightSpeed;
    let targetY = this.y - this.upSpeed + this.downSpeed;
    this.x = targetX;
    this.y = targetY;

    this.draw();
  }

  private draw(): void {
    this.div.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
