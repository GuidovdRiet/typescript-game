class Bullet extends GameObject {
  protected removeIfLeavesScreen() {
    if(this.x > window.innerWidth) {
      this.element.remove();
    }
  }
}
