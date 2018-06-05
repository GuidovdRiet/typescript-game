/// <reference path="./bullets/RocketlauncherBullet"/>

class Rocketlauncher extends Weapon implements WeaponBehaviour {
  constructor(bomber: Bomber) {
    super(bomber);

    this.element = document.createElement("rocketlauncher");
    document.body.appendChild(this.element);

    this.attackPower = 100;
    this.yPos = 3;

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this.bomberHeight = bomber.getHeight();

    this.start(this.yPos);
    this.shoot()
  }

  public createBullet(): Bullet {
    this.bullet = new RocketlauncherBullet(this);
    return this.bullet;
  }

  public shoot(): void {
    document.addEventListener("click", () => {
      this.bullet = new RocketlauncherBullet(this);
      Game.getInstance().addBulletsToArray(this.bullet);
    });
  }
}
