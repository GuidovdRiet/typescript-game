/// <reference path="./Bullet.ts"/>

class RocketlauncherBullet extends Bullet {
  private rocketlauncher: Rocketlauncher;
  private bulletSpeed: number = 7;

  constructor(rocketlauncher: Rocketlauncher) {
    super();

    this.element = document.createElement("rocketlauncherbullet");
    document.body.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.rocketlauncher = rocketlauncher;

    this.start();
  }

  private start(): void {
    const weaponPosition = this.rocketlauncher.getPosition();
    const weaponWidth = this.rocketlauncher.getWidth();
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