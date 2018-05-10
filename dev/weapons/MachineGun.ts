/// <reference path="./Weapon.ts" />

class MachineGun extends Weapon {
  private _bomber: Bomber;
  private _bomberWidth: number;
  private _bomberHeight: number;

  constructor(bomber: Bomber) {
    super();

    this._bomber = bomber;

    this.element = document.createElement("machinegun");
    document.body.appendChild(this.element);

    this.height = this.element.offsetHeight;
    this._bomberHeight = bomber.getHeight();

    this._start();
  }

  private _start(): void {
    this.draw();
  }

  public draw(): void {
    const bomberPosition = this._bomber.getPosition();
    this.x = bomberPosition.x;
    this.y = bomberPosition.y + this.height / 2 + this._bomberHeight / 2;
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
