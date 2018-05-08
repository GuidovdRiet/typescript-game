class Game {
  private _bomber: Bomber;

  constructor() {
    this._bomber = new Bomber();
    this._gameLoop();
  }

  private _gameLoop() {
    this._bomber.update();
    requestAnimationFrame(() => this._gameLoop());
  }
}
