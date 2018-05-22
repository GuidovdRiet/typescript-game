/// <reference path="../characters/Walker.ts"/>

class Game extends GameObject {
  private bomber: Bomber;
  private walkers: Array<Walker> = new Array<Walker>();
  private bullets: Array<Bullet> = new Array<Bullet>();
  private static instance: Game;

  constructor() {
    super();
    this.bomber = new Bomber();
    this.walkers.push(new Walker());
    setInterval(() => {
      this.walkers.push(new Walker());
    }, 7000);
    this.gameLoop();
  }

  private gameLoop(): void {
    this.bomber.update();
    this.walkers.forEach(walker => {
      walker.update();
    });
    this.damageHandlerBomber();
    this.removeObjectsHandler();
    requestAnimationFrame(() => this.gameLoop());
  }

  private damageHandlerBomber() {
    // decrease bomber health on collision walker
    this.walkers.forEach(walker => {
      if (this.collision(this.bomber, walker)) {
        this.bomber.damage(walker.getAttackPower());
      }
    });
  }

  private removeObjectsHandler() {
    // remove objects from array if not visible on screen
    this.removeObjectsFromArrayIfNotVisible(this.bullets, this.walkers);
  }

  public addBulletsToArray(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  private removeObjectsFromArrayIfNotVisible(...arrays: any[]) {
    const [walkers, bullets] = arrays;
    arrays.map(array => {
      array.map((item: GameObject, index: number) => {
        if (!item.getvisibility) {
          array.splice(index, 1);
        }
      });
    });
  }

  public getBulletsArray() {
    return this.bullets;
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}
