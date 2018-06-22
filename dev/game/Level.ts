class Level extends GameObject implements Subject {
  private level: number = 1;
  private totalCoinsTillNextLevel: number = 3;
  private attackPowerLevel: number = 3;
  private moveSpeedLevel: number = 3;
  public observers: Observer[] = [];

  constructor() {
    super();
  }

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(): void {
    this.removeObjectsFromArrayIfNotVisible([this.observers]);
  }

  public levelUp() {
    console.log('Level up!', this.level);
    this.level = this.level + 1;
    this.totalCoinsTillNextLevel = this.totalCoinsTillNextLevel + 2;
    this.attackPowerLevel = this.attackPowerLevel + 3;
    this.moveSpeedLevel = this.moveSpeedLevel + 1;
    for(const observer of this.observers) {
      observer.notify();
    }
  }

  public getObservers() {
    return this.observers;
  }

  public getTotalCoinsTillNextLevel() {
    return this.totalCoinsTillNextLevel;
  }

  public getMoveSpeedLevel() {
    return this.moveSpeedLevel;
  }

  public getAttackPowerLevel() {
    return this.attackPowerLevel;
  }

  public getLevelCount() {
    return this.level;
  }
}
