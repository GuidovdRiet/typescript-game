class Game {
  
  private _bomber: Bomber;
  private static instance: Game;

  constructor() {
    this._bomber = new Bomber();
    this._gameLoop();
  }

  public static getInstance() {
    if(!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private _gameLoop() {
    this._bomber.update();
    requestAnimationFrame(() => this._gameLoop());
  }
}
