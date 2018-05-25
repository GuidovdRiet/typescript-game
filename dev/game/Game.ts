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
    this.moveToTarget();

    this.bomber.getHealth();
    this.removeObjectsHandler();
    this.damageHandler();

    requestAnimationFrame(() => this.gameLoop());
  }

  public addBulletsToArray(bullet: Bullet) {
    this.bullets.push(bullet);
  }

  private removeObjectsHandler() {
    this.removeObjectsFromArrayIfNotVisible([this.bullets, this.walkers]);
  }

  private damageHandler() {
    for (const walker of this.walkers) {
      // check collision Bomber | Walker
      if (this.collision(this.bomber, walker)) {
        this.bomber.damage(walker.getAttackPower());
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

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private moveToTarget() {
    const { x: bomberX, y: bomberY } = this.bomber.getPosition();

    for (const walker of this.walkers) {
      let { x: walkerX, y: walkerY } = walker.getPosition();

      walkerY <= bomberY
        ? walker.setPosition(
            walkerX,
            (walkerY = walkerY + walker.getMoveSpeed())
          )
        : walker.setPosition(
            walkerX,
            (walkerY = walkerY - walker.getMoveSpeed())
          );

      walkerX <= bomberX
        ? walker.setPosition(
            (walkerX = walkerX + walker.getMoveSpeed()),
            walkerY
          )
        : walker.setPosition(
            (walkerX = walkerX - walker.getMoveSpeed()),
            walkerY
          );

      

      walker.update();
    }
  }
}
