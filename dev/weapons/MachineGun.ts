/// <reference path="./WeaponBehaviour.ts" />

class MachineGun extends WeaponBehaviour {
  constructor(bomber: Bomber) {
    super(bomber);

    this.element = document.createElement("machinegun");
    document.body.appendChild(this.element);

    this.attackPower = 10;
    this.yPos = 2;

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this.bomberHeight = bomber.getHeight();

    this.start(this.yPos);
  }
}
