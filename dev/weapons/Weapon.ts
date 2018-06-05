abstract class Weapon extends GameObject {
  protected bomber: Bomber;
  protected bomberWidth: number;
  protected bomberHeight: number;
  protected yPos: number;
  protected bullet: Bullet;

  constructor(bomber: Bomber) {
    super();
    this.bomber = bomber;
  }

  public start(yPos: number): void {
    const bomberPosition = this.bomber.getPosition();
    this.x = bomberPosition.x;
    this.y = bomberPosition.y + this.height / yPos + this.bomberHeight / yPos;
    this.draw();
  }

  public getWidth(): number {
    return this.width;
  }

  public getYPos(): number {
    return this.yPos;
  }
}
