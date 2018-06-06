class Rocketlauncher extends WeaponBehaviour {
  constructor(bomber: Bomber) {
    super(bomber);

    this.element = document.createElement("rocketlauncher");
    document.body.appendChild(this.element);

    this.attackPower = 100;
    this.yPos = 3;

    this.height = this.element.offsetHeight;
    this.width = this.element.offsetWidth;

    this.bomberHeight = bomber.getHeight();

    this.start(this.yPos);
  }
}
