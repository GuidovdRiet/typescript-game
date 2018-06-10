/// <reference path="./Ui"/>

class CoinsBar extends Ui {
  private coins: Item[] = [];
  private totalCoins: number;

  constructor(pickedUpItems: Item[]) {
    super();
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
    });
    this.totalCoins = this.coins.length;
    this.displayTotalCoins();
    this.setCoinBarWidth();
  }

  private displayTotalCoins() {
    this.element.innerHTML = "";
    const h4 = document.createElement("h4");
    h4.innerHTML = `${this.totalCoins}`;
    this.element.appendChild(h4);
  }

  private setCoinBarWidth() {
    let width = this.totalCoins * 10;
    this.element.style.width = `${width}px`;
  }
}
