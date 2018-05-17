class HealthBar extends GameObject {

  constructor(character: Character) {
    super();

    this.element = document.createElement("healthbar");
    document.body.appendChild(this.element);

    this.start(character);
  }

  private start(character: Character): void {
    console.log(character.getPosition())
    this.x = character.getPosition().x;
    this.y = character.getPosition().y;
    this.draw();
  }
}
