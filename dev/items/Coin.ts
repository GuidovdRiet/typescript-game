/// <reference path="./item"/>

class Coin extends Item {
  constructor(character: Character) {
    super();

    this.x = character.getPosition().x;
    this.y = character.getPosition().y;

    this.element = document.createElement("coin");
    document.body.appendChild(this.element);
    this.element.style.display = "block";

    this.draw();
  }
}
