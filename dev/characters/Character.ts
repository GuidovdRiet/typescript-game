/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject {
  protected animationCount: number = 0;
  protected moveSpeed: number;
  protected healthBar: HealthBar;
  protected attackPower: number;
  protected intervalId: number;
  protected item: Item;
  protected health = 100;

  constructor(name: string) {
    super();

    this.element = document.createElement(name);
    document.body.appendChild(this.element);

    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
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
      this.healthBar.removeElement();
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

  public getPosition(): Vector {
    const position: Vector = {
      x: this.x,
      y: this.y
    };
    return position;
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
