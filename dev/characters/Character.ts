/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject implements Observer {
  protected animationCount: number = 0;
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
    console.log(this.element, 'is notified');
    console.log(this.element, this.attackPower);
    console.log(this.element, this.moveSpeed);
  }

  protected setWalkingBackground(
    startPostion: boolean,
    backgrounds: number,
    baseUrl: string
  ): void {
    startPostion
      ? (this.animationCount = 0)
      : this.animationCount <= backgrounds
        ? this.animationCount++
        : (this.animationCount = 0);

    this.element.style.backgroundImage = `url(${baseUrl}${
      this.animationCount
    }.png)`;
  }

  protected animate(url: string) {
    this.intervalId = setInterval(() => {
      this.setWalkingBackground(false, 2, url);
    }, 150);
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
