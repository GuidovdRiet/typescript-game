/// <reference path="../characters/Walker.ts"/>

class Game extends GameObject {
  
  private bomber: Bomber;
  private walker: Walker;
  private static instance: Game;

  constructor() {
    super();
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

  private decreseHealth() {
    this.bomber.damage(this.walker.getAttackPower());
    console.log('current health = ', this.bomber.getHealth());
  }

  private gameLoop(): void {
    this.bomber.update();
    this.walker.update();
    if (this.collision(this.bomber, this.walker)) this.decreseHealth();
    requestAnimationFrame(() => this.gameLoop());
  }
}
