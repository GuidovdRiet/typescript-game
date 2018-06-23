/// <reference path="../characters/Walker.ts"/>

class Game extends GameObject {
  private bomber: Bomber;
  private coinsBar: CoinsBar;
  private walkers: Walker[] = [];
  private bullets: Bullet[] = [];
  private level: Level;
  private levelCounter: LevelCounter;

  private items: Item[] = [];
  private pickedUpItems: Item[] = [];

  private static instance: Game;
  private playerHealthBar: PlayerHealthBar;

  constructor() {
    super();
    this.level = new Level();
    this.bomber = new Bomber(this.level);
    setInterval(() => {
      this.walkers.push(new Walker(this.level));
    }, 2000);
    this.createUI();
    this.gameLoop();
  }

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }


  private gameLoop(): void {
    this.updateBomber();
    this.updateEnemies();
    this.removeObjectsHandler();
    this.collisionHandler();
    this.levelHandler();
    this.level.unsubscribe();
    requestAnimationFrame(() => this.gameLoop());
  }

  private levelHandler(): void {
    if (
      this.level.getTotalCoinsTillNextLevel() === this.coinsBar.getTotalCoins()
    ) {
      this.level.levelUp();
      this.levelCounter.setLevel();
    }
  }

  public unsubscribe(observer: Observer): void {
    console.log("remove from array unsubscribe");
  }

  private updateBomber(): void {
    this.bomber.update();
    this.bomber.getHealth();
  }

  private updateEnemies(): void {
    this.walkers.forEach(walker => {
      walker.update();
    });
  }

  private createUI(): void {
    this.playerHealthBar = new PlayerHealthBar();
    this.coinsBar = new CoinsBar(this.pickedUpItems, this.level);
    this.levelCounter = new LevelCounter(this.level);
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

  public getBulletsArray(): Bullet[] {
    return this.bullets;
  }

  public getitems(): Item[] {
    return this.items;
  }
}
