/// <reference path="./Character.ts"/>

class Walker extends Character {
  constructor(level: Level) {
    super("walker", level);

    this.frames = 4;
    this.frame = 0;
    this.framewidth = 60;
    
    level.subscribe(this);
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = (window.innerHeight / 100) * (Math.random() * 90);

    this.attackPower = this.level.getAttackPowerLevel();
    this.moveSpeed = this.level.getMoveSpeedLevel();

    setInterval(() => {
      this.animate(false);
    }, 100);

    this.walkerHealthBar = new WalkerHealthBar(this);
    this.setAttackPower(this.attackPower);

    this.update();
  }

  public update() {
    this.x = this.x - this.moveSpeed;
    this.walkerHealthBar.update();
    this.removeElementHandler();
    this.checkIfDead(this);
    this.draw();
  }
}
