/// <reference path="./Gun.ts" />

class MachineGun extends Gun {
  private _bomber: Bomber;
  private _bomberWidth: number;
  private _bomberHeight: number;

  private _machineGunBullet: MachineGunBullet;

  constructor(bomber: Bomber) {
    super();

    this._bomber = bomber;

    this.element = document.createElement("machinegun");
    document.body.appendChild(this.element);

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this._bomberHeight = bomber.getHeight();

    this._shoot();
    this._start();
  }

  public getPostion() {
    const position = {
      x: this.x,
      y: this.y
    };
    return position;
  }

  public getWidth() {
    return this.width;
  }

  private _shoot() {
    document.addEventListener("click", () => {
      this._machineGunBullet = new MachineGunBullet(this);
    });
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
