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

    this.bomber.getHealth();

    this.removeObjectsHandler();

    requestAnimationFrame(() => this.gameLoop());
  }

  public addBulletsToArray(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  private removeObjectsHandler() {
    this.removeObjectsFromArrayIfNotVisible([this.bullets, this.walkers]);
  }

  private damageHandlerBomber() {
    // decrease bomber health on collision walker
    this.walkers.forEach(walker => {
      if (this.collision(this.bomber, walker)) {
        this.bomber.damage(walker.getAttackPower());
      }
    });
  }

  private removeObjectsFromArrayIfNotVisible(arrays: any) {
    arrays.map((array: any) => {
      array.map((item: GameObject, index: number) => {
        if (!item.getVisible()) {
          array.splice(index, 1);
        }
      });
    })
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
