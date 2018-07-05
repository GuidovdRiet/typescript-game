/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject implements Observer {
  // animation
  protected frames: number;
  protected frame: number;
  protected framewidth: number;

  protected moveSpeed: number;
  protected walkerHealthBar: WalkerHealthBar;
  protected attackPower: number;
  protected intervalId: number;
  protected item: Item;
  protected health = 100;
  protected level: Level;

  constructor(name: string, level: Level) {
    super();

    this.element = document.createElement(name);
    document.body.appendChild(this.element);
    this.level = level;

    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
  }

  public notify(): void {
    this.attackPower = this.level.getAttackPowerLevel();
    this.moveSpeed = this.level.getMoveSpeedLevel();
    console.log(this.element, "is notified");
  }

  protected animate(setToFirstSprite: boolean): void {
    let pos = 0 - this.frame * this.framewidth;
    this.frame++;
    if (this.frame >= this.frames) this.frame = 0;
    if (setToFirstSprite) pos = 0;
    this.element.style.backgroundPosition = `${pos}px 0px`;
  }

  protected checkIfDead(character: Character) {
    // remove if target is dead
    if (this.health <= 0) {
      this.removeElement();
      Game.getInstance()
        .getitems()
        .push(new Coin(character));
      this.walkerHealthBar.removeElement();
      this.clearInterval(this.intervalId);
    }
  }

  public update(): void {}

  public getHealth(): number {
    return this.health;
  }

  public damage(damage: number): void {
    this.health = this.health - damage;
  }

  public getMoveSpeed() {
    return this.moveSpeed;
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.height;
  }
}
