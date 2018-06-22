class LevelCounter extends GameObject {
  private level: Level;
  private wrapper: HTMLElement;

  constructor(level: Level) {
    super();
    this.level = level;
    this.element = document.createElement("h1");
    this.wrapper = document.querySelector("levelcounter");
    this.element.innerHTML = `1`;
    this.wrapper.appendChild(this.element);
  }

  public setLevel(): void {
    this.element.innerHTML = `${this.level.getLevelCount()}`;
    this.wrapper.appendChild(this.element);
  }
}
