/// <reference path="./Character.ts"/>

class Bomber extends Character {
  private leftSpeed: number = 0;
  private upSpeed: number = 0;
  private downSpeed: number = 0;
  private rightSpeed: number = 0;

  private shootEventListener: EventListener;

  private weapon: Weapon;

  constructor(level: Level) {
    super("bomber", level);

    this.start();
    this.moveSpeed = 4;

    this.frames = 4;
    this.frame = 0;
    this.framewidth = 60;

    level.subscribe(this);

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      this.move(event, this.moveSpeed);
      this.switchWeapons(event);
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      this.move(event, 0);
      this.animate(true);
    });

    this.addShootingEvent();
  }

  private addShootingEvent(): void {
    this.shootEventListener = () => this.weapon.shoot();
    window.addEventListener("click", this.shootEventListener);
  }

  private start(): void {
    this.x = window.innerWidth / 2 - this.width;
    this.y = window.innerHeight / 2 - this.height;
    this.weapon = new MachineGun(this);
  }

  private switchWeapons(event: KeyboardEvent): void {
    const firstWeaponKey = 49;
    const secondWeaponKey = 50;
    switch (event.keyCode) {
      case firstWeaponKey:
        this.weapon.removeElement();
        this.weapon.removeListener("click", this.shootEventListener);
        this.addShootingEvent();
        this.weapon = new MachineGun(this);
        break;
      case secondWeaponKey:
        this.weapon.removeElement();
        this.weapon.removeListener("click", this.shootEventListener);
        this.addShootingEvent();
        this.weapon = new Rocketlauncher(this);
        break;
    }
  }

  public move(event: KeyboardEvent, speed: number): void {

    this.animate(false);

    const leftKey: number = 65;
    const upKey: number = 87;
    const rightKey: number = 68;
    const downKey: number = 83;

    switch (event.keyCode) {
      case leftKey:
        this.leftSpeed = speed;
        break;
      case rightKey:
        this.rightSpeed = speed;
        break;
      case upKey:
        this.upSpeed = speed;
        break;
      case downKey:
        this.downSpeed = speed;
        break;
    }
  }

  public getWeapon(): Weapon {
    return this.weapon;
  }

  public update(): void {
    const targetX = this.x - this.leftSpeed + this.rightSpeed;
    const targetY = this.y - this.upSpeed + this.downSpeed;

    const screenCorrection = 15;

    if (
      targetX < window.innerWidth - screenCorrection - this.width &&
      targetX > 0
    )
      this.x = targetX;
    if (
      targetY < window.innerHeight - screenCorrection - this.height &&
      targetY > 0
    )
      this.y = targetY;

    this.weapon.start(this.weapon.getYPos());
    this.draw();
  }
}
