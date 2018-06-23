class PlayerHealthBar extends GameObject {
  constructor() {
    super();
    this.start();
  }

  private start() {
    this.element = document.createElement("playerhealthbar");
    const healthbarContainer = document.querySelector("healthbarcontainer");
    healthbarContainer.appendChild(this.element);
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
  }

  public update(bomber: Bomber) {
    const colorHealthOrange = 60;
    const colorHealthRed = 30;
    const bomberHealth = bomber.getHealth();

    if (bomberHealth < colorHealthOrange)
      this.element.style.background = "#F78C6C";

    if (bomberHealth < colorHealthRed)
      this.element.style.background = "#B83C3C";
      
    this.element.style.width = `${(this.width / 100) * bomberHealth}px`;
  }
}
