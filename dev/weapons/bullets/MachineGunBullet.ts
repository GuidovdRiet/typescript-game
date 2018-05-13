/// <reference path="./Bullet.ts"/>

class MachineGunBullet extends Bullet {

  private _machineGun: MachineGun;
  private _bulletSpeed: number = 10;

  constructor(machineGun: MachineGun) {
    super();

    this.element = document.createElement("MachineGunBullet");
    document.body.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;

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

    this.x = this.x + this._bulletSpeed;
    
    this.removeIfLeavesScreen();
    this.draw();
  }

  public draw() {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
