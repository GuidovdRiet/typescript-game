/// <reference path="./Character.ts"/>

class Walker extends Character {
  private baseUrlBackgroundAnimation: string =
    "../docs/img/characters/zombies/walker/spr_zombie1_attack_";

  constructor() {
    super("walker");
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = (window.innerHeight / 100) * (Math.random() * 90);

    this.attackPower = 3;
    this.moveSpeed = 3;

    this.healthBar = new HealthBar(this);
    this.setAttackPower(this.attackPower);

    this.update();
    this.animate(this.baseUrlBackgroundAnimation);
  }

  public update() {
    this.x = this.x - this.moveSpeed;
    this.healthBar.update();
    this.removeElementHandler();
    this.checkIfDead(this);
    this.draw();
  }
}
