/// <reference path="./UI.ts" />

class Health extends Ui {
  constructor() {
    super();
    this.start();
  }

  private start() {
    this.element = document.createElement("health");
    const healthbarContainer = document.querySelector('healthbarcontainer');
    healthbarContainer.appendChild(this.element);
    
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
  }
}