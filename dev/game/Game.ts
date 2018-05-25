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

  public moveToTarget() {
    // Bekijk de positie van de bomber
    // Bekijk de positie van de walkers
    // Als de positie y de walker lager is dan die van de bomber moet hij verhoogt worden
    // Als de positie y van de walker hoger is dan die van de bomber moet hij verlaagt worden
    // Als de x & y positie van de walker gelijk zijn zet de positie van de walker dan gelijk aan die van de bomber - de breedte van het object
    const { x: bomberX, y: bomberY } = this.bomber.getPosition();
    for (const walker of this.walkers) {
      let { x: walkerX, y: walkerY } = walker.getPosition();
      walkerX = walkerX - walker.getMoveSpeed();
      walkerY <= bomberY
        ? walker.setPosition(
            (walkerY = walkerY + walker.getMoveSpeed()),
            walkerX
          )
        : walker.setPosition(
            (walkerY = walkerY - walker.getMoveSpeed()),
            walkerX
          );
      walker.update();
    }
  }
}
