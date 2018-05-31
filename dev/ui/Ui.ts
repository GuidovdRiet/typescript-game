class Ui extends GameObject {
  constructor(name: string) {
    super();

    this.element = document.createElement(name);
    document.body.appendChild(this.element);

    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
  }
}