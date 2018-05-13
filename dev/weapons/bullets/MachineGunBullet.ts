/// <reference path="./Bullet.ts"/>

class MachineGunBullet extends Bullet {
  private _machineGun: MachineGun;

  constructor(machineGun: MachineGun) {
    super();

    this.element = document.createElement("MachineGunBullet");
    document.body.appendChild(this.element);

    this._machineGun = machineGun;

    this._start();
  }

  private _start() {
    const weaponPosition = this._machineGun.getPostion();
    const weaponWidth = this._machineGun.getWidth();
    const bulletHeight = this.element.offsetHeight;

    this.x = weaponPosition.x + weaponWidth;
    this.y = weaponPosition.y + bulletHeight - 1;
    this.draw();
    this._update();
  }

  private _update() {
    requestAnimationFrame(() => this._update());

    this.x = this.x + 10;
    this.draw();
  }

  public draw() {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
