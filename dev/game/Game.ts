class Game {
  
  private bomber: Bomber;
  private static instance: Game;

  constructor() {
    this.bomber = new Bomber();
    this.zombie = new Zombie();
    this.gameLoop();
  }

  public static getInstance() {
    if(!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private gameLoop() {
    this.bomber.update();
    requestAnimationFrame(() => this.gameLoop());
  }
}
