/// <reference path="./Gun.ts" />

class MachineGun extends Gun {

  private bomber: Bomber;
  private bomberWidth: number;
  private bomberHeight: number;

  private machineGunBullet: MachineGunBullet;

  constructor(bomber: Bomber) {
    super();

    this.bomber = bomber;

    this.element = document.createElement("machinegun");
    document.body.appendChild(this.element);

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this.bomberHeight = bomber.getHeight();

    this.shoot();
    this.start();
  }

  public getPostion() {
    const position = {
      x: this.x,
      y: this.y
    };
    return position;
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

  public start(): void {
    const bomberPosition = this.bomber.getPosition();
    this.x = bomberPosition.x;
    this.y = bomberPosition.y + this.height / 2 + this.bomberHeight / 2;
    this.draw();
  }
}
