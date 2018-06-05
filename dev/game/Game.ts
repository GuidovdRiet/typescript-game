/// <reference path="../characters/Walker.ts"/>

class Game extends GameObject {
  private bomber: Bomber;
  private health: Health;
  private walkers: Walker[] = [];
  private bullets: Bullet[] = [];

  private items: Item[] = [];
  private pickedUpItems: Item[] = [];

  private static instance: Game;

  constructor() {
    super();
    this.bomber = new Bomber();
    this.walkers.push(new Walker());
    setInterval(() => {
      this.walkers.push(new Walker());
    }, 7000);
    this.gameLoop();
    this.createUi();
  }

  private gameLoop(): void {
    this.createBomber();
    this.createEnemies();
    this.removeObjectsHandler();
    this.collisionHandler();
    requestAnimationFrame(() => this.gameLoop());
  }

  private createBomber() {
    this.bomber.update();
    this.bomber.getHealth();
  }

  private createEnemies() {
    this.walkers.forEach(walker => {
      walker.update();
    });
  }

  private createUi() {
    this.health = new Health();
  }

  public addBulletsToArray(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  private removeObjectsHandler() {
    this.removeObjectsFromArrayIfNotVisible([this.bullets, this.walkers]);
  }

  private collisionHandler() {
    for (const item of this.items) {
      if (this.collision(item, this.bomber)) {
        item.removeElement();
        this.pickedUpItems.push(item);
        this.removeObjectsFromArrayIfNotVisible([this.items]);
      }
    }

    for (const walker of this.walkers) {
      // check collision Bomber | Walker
      if (this.collision(this.bomber, walker)) {
        this.bomber.damage(walker.getAttackPower());
        this.health.update(this.bomber);
      }

      // check collision Bullet | Walker
      for (const bullet of this.bullets) {
        if (this.collision(bullet, walker)) {
          walker.damage(this.bomber.getWeapon().getAttackPower());
          bullet.removeElement();
        }
      }
    }
  }

  private removeObjectsFromArrayIfNotVisible(arrays: any) {
    arrays.map((array: any) => {
      array.map((item: GameObject, index: number) => {
        if (!item.getVisibility()) {
          array.splice(index, 1);
        }
      });
    });
  }

  public getBulletsArray() {
    return this.bullets;
  }

  public getitems() {
    return this.items;
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}
