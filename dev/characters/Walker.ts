/// <reference path="./Character.ts"/>

class Walker extends Character {
  private baseUrlBackgroundAnimation: string = "../docs/img/characters/zombies/walker/spr_zombie1_attack_";
  private intervalId: number;

  constructor() {
    super("walker");
    this.start();
  }

  private start() {
    this.x = window.innerWidth - this.width;
    this.y = window.innerHeight / 100 * (Math.random() * 90);
    this.healthBar = new HealthBar(this);
    this.moveSpeed = 2;

    this.setAttackPower(3);

    this.update();
    this.animate();
  }

  public update() {
    this.x = this.x - this.moveSpeed;
    this.healthBar.update(this);

    this.removeDomElementIfLeavesScreen();
    if(this.removeDomElementIfLeavesScreen()) {
      this.clearInterval(this.intervalId);
    }
    
    this.draw();
  }

  private animate() {
    this.intervalId = setInterval(() => {
      this.setWalkingBackground(false, 3, this.baseUrlBackgroundAnimation);
    }, 500);
  }
}
