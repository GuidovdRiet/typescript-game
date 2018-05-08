/// <reference path="../GameObject.ts"/>

class Bomber extends GameObject {
  private _leftSpeed: number = 0;
  private _upSpeed: number = 0;
  private _downSpeed: number = 0;
  private _rightSpeed: number = 0;
  private _animationCount: number = 0;

  constructor() {
    super();

    this.div = document.createElement("bomber");
    document.body.appendChild(this.div);

    this._start();

    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.move(event, 6)
    );

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      this.move(event, 0);
      this._setWalkingBackground(true);
    });
  }

  private _start() {
    this.x = 50;
    this.y = 100;
    this._setWalkingBackground(true);
  }

  public move(event: KeyboardEvent, speed: number): void {
    const leftKey: number = 37;
    const upKey: number = 38;
    const rightKey: number = 39;
    const downKey: number = 40;

    switch (event.keyCode) {
      case leftKey:
        this._leftSpeed = speed;
        this._setWalkingBackground(false);
        break;
      case rightKey:
        this._rightSpeed = speed;
        this._setWalkingBackground(false);
        break;
      case upKey:
        this._upSpeed = speed;
        this._setWalkingBackground(false);
        break;
      case downKey:
        this._downSpeed = speed;
        this._setWalkingBackground(false);
        break;
    }
  }

  private _setWalkingBackground(startPostion: boolean) {
    const baseUrl = "../docs/img/characters/bomber/spr_player_";
    if (startPostion) {
      this._animationCount = 0;
    } else {
      this._animationCount <= 2
        ? this._animationCount++
        : (this._animationCount = 0);
    }
    this.div.style.backgroundImage = `url(${baseUrl}${
      this._animationCount
    }.png)`;
  }

  public update() {
    const targetX = this.x - this._leftSpeed + this._rightSpeed;
    const targetY = this.y - this._upSpeed + this._downSpeed;
    this.x = targetX;
    this.y = targetY;

    this.draw();
  }

  private draw(): void {
    this.div.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
