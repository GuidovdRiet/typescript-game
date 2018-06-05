/// <reference path="./Bullet.ts"/>

class RocketlauncherBullet extends Bullet {
  constructor(rocketlauncher: Rocketlauncher) {
    super();

    this.element = document.createElement("rocketlauncherbullet");
    document.body.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.weapon = rocketlauncher;
    this.bulletSpeed = 4;

    this.start();
  }
}