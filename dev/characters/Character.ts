/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject {
  
  private animationCount: number = 0;

  private health = 100;
  
  constructor(name: string) {
    super();

    this.element = document.createElement(name);
    document.body.appendChild(this.element);

    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
  }

  protected setWalkingBackground(startPostion: boolean, backgrounds: number, baseUrl: string): void {
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

  public getHealth() {
    return this.health;
  }

  public damage(damage: number) {
    this.health = this.health - damage;
    return this.health;
  }
  
  public getPosition() {
    const position = {
      x: this.x,
      y: this.y
    };
    return position;
  }

  public getHeight() {
    return this.height;
  }

  public getWidth() {
    return this.height;
  }
}
