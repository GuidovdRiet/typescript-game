class Bullet extends GameObject {

  protected weapon: WeaponBehaviour;
  protected bulletSpeed: number;

  protected start(): void {
    const weaponPosition = this.weapon.getPosition();
    const weaponWidth = this.weapon.getWidth();
    const bulletHeight = this.element.offsetHeight;

    this.x = weaponPosition.x + weaponWidth;
    this.y = weaponPosition.y + bulletHeight - 1;
    this.draw();
    this.update();
  }

  protected update(): void {
    requestAnimationFrame(() => this.update());
    this.x = this.x + this.bulletSpeed;
    this.removeDomElementIfLeavesScreen();
    this.draw();
  }
}
