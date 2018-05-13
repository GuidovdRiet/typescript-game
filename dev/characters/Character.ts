/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject {
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
}
