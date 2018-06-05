/// <reference path="./Weapon.ts" />

class MachineGun extends Weapon {

  private machineGunBullet: MachineGunBullet;

  constructor(bomber: Bomber) {
    super(bomber);

    this.element = document.createElement("machinegun");
    document.body.appendChild(this.element);

    this.attackPower = 10;

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;
    
    this.bomberHeight = bomber.getHeight();

    this.shoot();
    this.start();
  }

  public getWidth(): number {
    return this.width;
  }

  private shoot(): void {
    document.addEventListener("click", () => {
      this.machineGunBullet = new MachineGunBullet(this);
      Game.getInstance().addBulletsToArray(this.machineGunBullet);
    });
  }
}
