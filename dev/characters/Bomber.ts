/// <reference path="./Character.ts"/>

class Bomber extends Character {

  private _leftSpeed: number = 0;
  private _upSpeed: number = 0;
  private _downSpeed: number = 0;
  private _rightSpeed: number = 0;

  private _animationCount: number = 0;

  private _weapon: MachineGun;

  constructor() {
    super();

    this.element = document.createElement("bomber");
    document.body.appendChild(this.element);

    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;

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
    this.x = (window.innerWidth / 2) - this.width;
    this.y = (window.innerHeight / 2) - this.height;
    this._setWalkingBackground(true);
    this._weapon = new MachineGun(this);
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
    this.element.style.backgroundImage = `url(${baseUrl}${
      this._animationCount
    }.png)`;
  }

  public update() {
    const targetX = this.x - this._leftSpeed + this._rightSpeed;
    const targetY = this.y - this._upSpeed + this._downSpeed;

    const screenCorrection = 15;
    if (
      targetX < window.innerWidth - screenCorrection - this.width &&
      targetX > 0
    )
      this.x = targetX;
    if (
      targetY < window.innerHeight - screenCorrection - this.height &&
      targetY > 0
    )
      this.y = targetY;

    this._weapon.draw();
    this._draw();
  }

  private _draw(): void {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
