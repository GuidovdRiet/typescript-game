/// <reference path="./Character.ts"/>

class Walker extends Character {

  private baseUrlBackgroundAnimation: string = "../docs/img/characters/zombies/walker/spr_zombie1_attack_";

  constructor() {
    super("walker");
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = window.innerHeight / 100 * (Math.random() * 100);
    this.healthBar = new HealthBar(this);
    this.moveSpeed = 2;

    this.setAttackPower(3);

    this.update();
    this.animate();
  }

  public update() {
    this.x = this.x - this.moveSpeed;
    this.removeIfLeavesScreen();
    this.draw();
  }

  private animate() {
    setInterval(() => {
      this.setWalkingBackground(false, 3, this.baseUrlBackgroundAnimation);
    }, 500)
  }
}
