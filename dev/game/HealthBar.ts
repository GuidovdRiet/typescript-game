class HealthBar extends GameObject {

  private character: Character;
  private health: number;

  constructor(character: Character) {
    super();

    this.element = document.createElement("healthbar");
    document.body.appendChild(this.element);

    this.character = character;
    this.health = this.character.getHealth();
    this.width = this.element.clientWidth;

    this.update();
  }

  private decreaseWidthOnDamage() {
    console.log(this.element.clientWidth, 'before');
    this.element.style.width = `${this.character.getHealth() / 2}px`;
    console.log(this.element.clientWidth, 'after');
  }

  public update() {
    this.x = this.character.getPosition().x;
    this.y = this.character.getPosition().y;
    this.removeDomElementIfLeavesScreen();
    this.decreaseWidthOnDamage();
    this.draw();
  }
}
