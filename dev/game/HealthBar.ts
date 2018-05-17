class HealthBar extends GameObject {
  constructor() {
    super();
    this.element = document.createElement("healthbar");
    document.appendChild(this.element);
  }

  private start(): void {
    this.x = 10;
    this.y = 10;
    this.draw();
  }
}
