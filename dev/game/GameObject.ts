class GameObject {
  protected element: HTMLElement;
  protected domName: string;

  protected x: number;
  protected y: number;

  protected width: number;
  protected height: number;
  protected attackPower: number;

  public setAttackPower(maxDamage: number): void {
    this.attackPower = Math.floor(Math.random() * 10 / maxDamage);
  }

  public getAttackPower(): number {
    return this.attackPower;
  }

  protected collision(c1: any, c2: any): any {
    if (c1 || c2) {
      return !(
        c2.x > c1.x + c1.width ||
        c2.x + c2.width < c1.x ||
        c2.y > c1.y + c1.height ||
        c2.y + c2.height < c1.y
      );
    }
  }

  protected removeIfLeavesScreen(): void {
    if (this.x > window.innerWidth || this.x < 0) {
      this.element.remove();
    }
  }

  protected removeIfLeavesScreenInterval(intervalId: number): void {
    if (this.x > window.innerWidth || this.x < 0) {
      this.element.remove();
    }
    clearInterval(intervalId);
  }

  protected draw(): void {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
