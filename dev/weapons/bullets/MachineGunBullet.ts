/// <reference path="./Bullet.ts"/>

class MachineGunBullet extends Bullet {

  private machineGun: MachineGun;
  private bulletSpeed: number = 2;
  private index: number;

  private MachineGunBulletArray: Array<
    Bullet
  > = Game.getInstance().getBulletsArray();

  constructor(machineGun: MachineGun) {
    super();

    this.index = this.MachineGunBulletArray.indexOf(this);

    this.element = document.createElement("MachineGunBullet");
    document.body.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.machineGun = machineGun;

    this.start();
    window.addEventListener('keydown', (event) => {
      if(event.keyCode === 32) {
        const index = this.MachineGunBulletArray.indexOf(this);
      }
    })
  }

  private start(): void {
    const weaponPosition = this.machineGun.getPostion();
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
