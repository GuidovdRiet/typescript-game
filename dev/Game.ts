class Game {
  private bomber: Bomber;

  constructor() {
    this.bomber = new Bomber();
    this.gameLoop();
  }

  private gameLoop() {
    this.bomber.update();
    requestAnimationFrame(() => this.gameLoop());
  }
}
