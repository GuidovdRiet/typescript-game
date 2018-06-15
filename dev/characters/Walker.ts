/// <reference path="./Character.ts"/>

class Walker extends Character {
  private baseUrlBackgroundAnimation: string =
    "../docs/img/characters/zombies/walker/spr_zombie1_attack_";

  constructor(level: Level) {
    super("walker", level);
    level.subscribe(this);
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = (window.innerHeight / 100) * (Math.random() * 90);

    this.attackPower = this.level.getAttackPowerLevel();
    this.moveSpeed = this.level.getMoveSpeedLevel();

    this.walkerHealthBar = new WalkerHealthBar(this);
    this.setAttackPower(this.attackPower);

    this.update();
    this.animate(this.baseUrlBackgroundAnimation);
  }

  public update() {
    this.x = this.x - this.moveSpeed;
    this.walkerHealthBar.update();
    this.removeElementHandler();
    this.checkIfDead(this);
    this.draw();
  }
}
