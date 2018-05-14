/// <reference path="../game/GameObject.ts"/>

class Character extends GameObject {
  
  constructor(name: string) {
    super();

    this.element = document.createElement(name);
    document.body.appendChild(this.element);

    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
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
