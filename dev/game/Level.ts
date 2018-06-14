class Level extends GameObject implements Subject {
  private level: number = 1;
  private totalCoinsTillNextLevel: number = 3;
  private attackPowerIncrease: number = 3;
  private walkingSpeedIncrease: number = 3;
  public observers: Observer[] = [];

  constructor() {
    super();
  }

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
    console.log(this.observers);
  }

  public levelUp() {
    this.level = this.level + 1;
    this.totalCoinsTillNextLevel = this.totalCoinsTillNextLevel + 2;
    this.attackPowerIncrease = this.attackPowerIncrease + 3;
    this.walkingSpeedIncrease = this.walkingSpeedIncrease + 3;
  }

  public getObservers() {
    return this.observers;
  }

  public getTotalCoinsTillNextLevel() {
    return this.totalCoinsTillNextLevel;
  }

  public getAttackPowerIncrease() {
    return this.getAttackPowerIncrease;
  }

  public getLevelCount() {
    return this.level;
  }
}
