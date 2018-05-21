class HealthBar extends GameObject {

  constructor(character: Character) {
    super();

    this.element = document.createElement("healthbar");
    document.body.appendChild(this.element);

    this.update(character);
  }

  public update(character: Character) {
    this.x = character.getPosition().x;
    this.y = character.getPosition().y;
    this.removeDomElementIfLeavesScreen();
    this.draw();
  }
}
