class Bullet extends GameObject {
  protected removeIfLeavesScreen(): void {
    if (this.x > window.innerWidth) {
      this.element.remove();
    }
  }
}
