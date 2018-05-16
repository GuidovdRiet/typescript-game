/// <reference path="../characters/Walker.ts"/>

class Game {
  private bomber: Bomber;
  private walker: Walker;
  private static instance: Game;

  constructor() {
    this.bomber = new Bomber();
    this.walker = new Walker();
    this.gameLoop();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private gameLoop(): void {
    this.bomber.update();
    this.walker.update();
    requestAnimationFrame(() => this.gameLoop());
  }
}
