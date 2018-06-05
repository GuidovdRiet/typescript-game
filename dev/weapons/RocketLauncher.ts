/// <reference path="./bullets/RocketlauncherBullet"/>

class RocketLauncher extends Weapon {
  private rocketlauncherBullet: RocketlauncherBullet;

  constructor(bomber: Bomber) {
    super(bomber);

    this.element = document.createElement("machinegun");
    document.body.appendChild(this.element);

    this.attackPower = 50;

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this.bomberHeight = bomber.getHeight();

    this.shoot();
    this.start();
  }

  private shoot(): void {
    document.addEventListener("click", () => {
      this.rocketlauncherBullet = new RocketlauncherBullet(this);
      Game.getInstance().addBulletsToArray(this.rocketlauncherBullet);
    });
  }
}
