class CoinsBar extends GameObject {
  private coins: Item[] = [];
  private level: Level;
  private totalCoins: number = 0;

  constructor(pickedUpItems: Item[], level: Level) {
    super();
    this.level = level;
    this.element = document.createElement("coinsbar");
    const coinbarContainer = document.querySelector("coinbarcontainer");
    coinbarContainer.appendChild(this.element);
    this.update(pickedUpItems);
  }

  public update(pickedUpItems: Item[]) {
    this.coins = pickedUpItems.map(pickedUpItem => {
      if (pickedUpItem instanceof Coin) {
        return pickedUpItem;
      }
      return null;
    });
    this.totalCoins = this.coins.length;
    this.displayTotalCoins();
    this.setCoinBarWidth();
  }

  public getTotalCoins(): number {
    return this.totalCoins;
  }

  private displayTotalCoins() {
    this.element.innerHTML = "";
    const h4 = document.createElement("h4");
    h4.innerHTML = `${this.totalCoins}`;
    this.element.appendChild(h4);
  }

  private setCoinBarWidth() {
    let width = (this.level.getTotalCoinsTillNextLevel()) * (this.totalCoins * 10);
    console.log(width);
    
    this.element.style.width = `${width}px`;
  }
}
