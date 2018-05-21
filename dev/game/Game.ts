/// <reference path="../characters/Walker.ts"/>

class Game extends GameObject {

  private bomber: Bomber;
  private walkers: Array<Walker> = new Array<Walker>();
  private MachineGunBullets: Array<MachineGunBullet> = new Array<MachineGunBullet>();
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

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private damageHandlerBomber() {
    // decrease bomber health on collision walker
    this.walkers.forEach((walker) => {
      if (this.collision(this.bomber, walker)) {
        this.bomber.damage(walker.getAttackPower());
      }
    })
  }

  private damageHandlerWalker() {

  }

  private gameLoop(): void {

    this.bomber.update();
    this.walkers.forEach((walker) => {
      walker.update();
    })
    this.damageHandlerBomber();

    requestAnimationFrame(() => this.gameLoop());
  }
}
