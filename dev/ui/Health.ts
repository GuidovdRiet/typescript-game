/// <reference path="./UI.ts" />

class Health extends Ui {
  constructor() {
    super("health");
    this.start();
  }

  private start() {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
  }
}