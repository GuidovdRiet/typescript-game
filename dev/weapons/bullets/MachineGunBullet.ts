/// <reference path="./Bullet.ts"/>

class MachineGunBullet extends Bullet {

  constructor(machineGun: MachineGun) {
    super();

    this.element = document.createElement("machinegunbullet");
    document.body.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    
    this.weapon = machineGun;
    this.bulletSpeed = 10;

    this.start();
  }
}
