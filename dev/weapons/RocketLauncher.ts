/// <reference path="./bullets/RocketlauncherBullet"/>

class Rocketlauncher extends Weapon {
  private rocketlauncherBullet: RocketlauncherBullet;

  constructor(bomber: Bomber) {
    super(bomber);

    this.element = document.createElement("rocketlauncher");
    document.body.appendChild(this.element);

    this.attackPower = 100;
    this.yPosCorrection = 3;

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this.bomberHeight = bomber.getHeight();

    this.shoot();
    this.start(this.yPosCorrection);
  }

  private shoot(): void {
    document.addEventListener("click", () => {
      this.rocketlauncherBullet = new RocketlauncherBullet(this);
      Game.getInstance().addBulletsToArray(this.rocketlauncherBullet);
    });
  }
}
