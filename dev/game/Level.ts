class Level extends GameObject {
  private level: number = 1;
  private totalCoinsTillNextLevel: number = 3;
  private attackPowerIncrease: number = 3;
  private walkingSpeedIncrease: number = 3;

  constructor() {
    super();
  }

  public levelUp() {
    this.level = this.level + 1;
    this.totalCoinsTillNextLevel = this.totalCoinsTillNextLevel + 2;
    this.attackPowerIncrease = this.attackPowerIncrease + 3;
    this.walkingSpeedIncrease = this.walkingSpeedIncrease + 3;
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
