/// <reference path="../characters/Walker.ts"/>

class Game extends GameObject implements Subject {
  private bomber: Bomber;
  private coinsBar: CoinsBar;
  private walkers: Walker[] = [];
  private bullets: Bullet[] = [];
  private level: Level;

  private items: Item[] = [];
  private pickedUpItems: Item[] = [];
  public observers: Observer[] = [];

  private static instance: Game;
  private playerHealthBar: PlayerHealthBar;

  constructor() {
    super();
    this.bomber = new Bomber();
    this.level = new Level();
    this.walkers.push(new Walker(this));
    setInterval(() => {
      this.walkers.push(new Walker(this));
    }, 2000);
    this.createUI();
    this.gameLoop();
  }

  private gameLoop(): void {
    this.createBomber();
    this.createEnemies();
    this.removeObjectsHandler();
    this.collisionHandler();
    this.levelHandler();
    requestAnimationFrame(() => this.gameLoop());
  }

  private levelHandler(): void {
    if (
      this.level.getTotalCoinsTillNextLevel() === this.coinsBar.getTotalCoins()
    ) {
      this.level.levelUp();
    }
    console.log(this.level.getTotalCoinsTillNextLevel());
  }

  // public dealGlobalDamage(): void {
  //   for(const observer of this.observers) {
  //     observer.notify('Notified');
  //   }
  // }

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    console.log("remove from array unsubscribe");
  }

  private createBomber(): void {
    this.bomber.update();
    this.bomber.getHealth();
  }

  private createEnemies(): void {
    this.walkers.forEach(walker => {
      walker.update();
    });
  }

  private createUI(): void {
    this.playerHealthBar = new PlayerHealthBar();
    this.coinsBar = new CoinsBar(this.pickedUpItems);
  }

  public addBulletsToArray(bullet: Bullet): void {
    this.bullets.push(bullet);
  }

  private removeObjectsHandler(): void {
    this.removeObjectsFromArrayIfNotVisible([this.bullets, this.walkers]);
  }

  private collisionHandler(): void {
    for (const item of this.items) {
      if (this.collision(item, this.bomber)) {
        item.removeElement();
        this.pickedUpItems.push(item);
        this.coinsBar.update(this.pickedUpItems);
        this.removeObjectsFromArrayIfNotVisible([this.items]);
      }
    }

    for (const walker of this.walkers) {
      // check collision Bomber | Walker
      if (this.collision(this.bomber, walker)) {
        this.bomber.damage(walker.getAttackPower());
        this.playerHealthBar.update(this.bomber);
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

  private removeObjectsFromArrayIfNotVisible(arrays: any): void {
    arrays.map((array: any) => {
      array.map((item: GameObject, index: number) => {
        if (!item.getVisibility()) {
          array.splice(index, 1);
        }
      });
    });
  }

  public getBulletsArray(): Bullet[] {
    return this.bullets;
  }

  public getitems(): Item[] {
    return this.items;
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}
