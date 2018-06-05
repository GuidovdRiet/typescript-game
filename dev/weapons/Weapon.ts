class Weapon extends GameObject {
  protected bomber: Bomber;
  protected bomberWidth: number;
  protected bomberHeight: number;

  constructor(bomber: Bomber) {
    super();
    this.bomber = bomber;
  }

  public start(): void {
    const bomberPosition = this.bomber.getPosition();
    this.x = bomberPosition.x;
    this.y = bomberPosition.y + this.height / 2 + this.bomberHeight / 2;
    this.draw();
  }
}
