/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject {
  
  protected animationCount: number = 0;
  protected attackPower: number;
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
    if (startPostion) {
      this.animationCount = 0;
    } else {
      this.animationCount <= backgrounds
        ? this.animationCount++
        : (this.animationCount = 0);
    }
    this.element.style.backgroundImage = `url(${baseUrl}${
      this.animationCount
    }.png)`;
  }

  public setAttackPower(maxDamage: number): void {
    this.attackPower = Math.floor(Math.random() * 10 / maxDamage);
  }

  public getAttackPower(): number {
    return this.attackPower;
  }

  public getHealth(): number {
    return this.health;
  }

  public damage(damage: number): void {
    this.health = this.health - damage;
  }

  public getPosition() {
    const position = {
      x: this.x,
      y: this.y
    };
    return position;
  }

  public getHeight(): number {
    return this.height;
  }

  protected getWidth(): number {
    return this.height;
  }
}
