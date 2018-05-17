/// <reference path="./Character.ts"/>

class Bomber extends Character {

  private leftSpeed: number = 0;
  private upSpeed: number = 0;
  private downSpeed: number = 0;
  private rightSpeed: number = 0;
  
  private baseUrlBackgroundAnimation: string = "../docs/img/characters/bomber/spr_player_";
  private weapon: MachineGun;

  constructor() {
    super("bomber");

    this.start();
    this.moveSpeed = 4;

    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.move(event, this.moveSpeed)
    );

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      this.move(event, 0);
      this.setWalkingBackground(true, 2, this.baseUrlBackgroundAnimation);
    });
  }

  private start(): void {
    this.x = window.innerWidth / 2 - this.width;
    this.y = window.innerHeight / 2 - this.height;
    this.healthBar = new HealthBar(this);
    this.setWalkingBackground(true, 2, this.baseUrlBackgroundAnimation);
    this.weapon = new MachineGun(this);
  }

  public move(event: KeyboardEvent, speed: number): void {
    const leftKey: number = 65;
    const upKey: number = 87;
    const rightKey: number = 68;
    const downKey: number = 83;

    switch (event.keyCode) {
      case leftKey:
        this.leftSpeed = speed;
        this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
        break;
      case rightKey:
        this.rightSpeed = speed;
        this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
        break;
      case upKey:
        this.upSpeed = speed;
        this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
        break;
      case downKey:
        this.downSpeed = speed;
        this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
        break;
    }
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

    this.weapon.start();
    this.draw();
  }
}
