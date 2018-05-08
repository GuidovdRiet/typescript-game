/// <reference path="../GameObject.ts"/>

class Bomber extends GameObject {

  private leftSpeed: number = 0;
  private upSpeed: number = 0;
  private downSpeed: number = 0;
  private rightSpeed: number = 0;

  constructor() {
    super();

    this.div = document.createElement("bomber");
    document.body.appendChild(this.div);

    this.startPosition();

    window.addEventListener('keydown', (event: KeyboardEvent) =>
      this.move(event, 10)
    );

    window.addEventListener('keyup', (event: KeyboardEvent) => 
      this.move(event, 0)
    );
  }

  private startPosition() {
    this.x = 50;
    this.y = 100;
  }

  public move(event: KeyboardEvent, speed: number): void {
    
    const leftKey: number = 37;
    const upKey: number = 38;
    const rightKey: number = 39;
    const downKey: number = 40;

    switch (event.keyCode) {
      case leftKey:
        this.leftSpeed = speed;
        break;
      case rightKey:
        this.rightSpeed = speed;
        break;
    }
  }

  public update() {
    let targetX = this.x - this.leftSpeed + this.rightSpeed;
    this.x = targetX;
    
    this.draw();
  }

  private draw(): void {
    this.div.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
}
}
