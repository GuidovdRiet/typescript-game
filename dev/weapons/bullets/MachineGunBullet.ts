/// <reference path="./Bullet.ts"/>

class MachineGunBullet extends Bullet {
  private machineGun: MachineGun;
  private bulletSpeed: number = 10;

  constructor(machineGun: MachineGun) {
    super();

    this.element = document.createElement("machinegunbullet");
    document.body.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.machineGun = machineGun;

    this.start();
  }

  private start(): void {
    const weaponPosition = this.machineGun.getPosition();
    const weaponWidth = this.machineGun.getWidth();
    const bulletHeight = this.element.offsetHeight;

    this.x = weaponPosition.x + weaponWidth;
    this.y = weaponPosition.y + bulletHeight - 1;
    this.draw();
    this.update();
  }

  private update(): void {
    requestAnimationFrame(() => this.update());
    this.x = this.x + this.bulletSpeed;
    this.removeDomElementIfLeavesScreen();
    this.draw();
  }
}
