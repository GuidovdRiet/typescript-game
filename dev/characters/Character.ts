/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject {
  protected animationCount: number = 0;
  protected moveSpeed: number;
  protected healthBar: HealthBar;
  protected attackPower: number;
  protected intervalId: number;
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

  protected removeElementHandler() {
    //  remove if leaves screen;
    this.removeDomElementIfLeavesScreen();
    if (this.removeDomElementIfLeavesScreen()) {
      this.clearInterval(this.intervalId);
    }
    // remove if target is dead
    if (this.health <= 0) {
      this.removeElement();
      this.clearInterval(this.intervalId);
    }
  }

  protected animate(url: string) {
    this.intervalId = setInterval(() => {
      this.setWalkingBackground(false, 3, url);
    }, 500);
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

  public getPosition() {
    const position = {
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

  protected getWidth(): number {
    return this.height;
  }
}
