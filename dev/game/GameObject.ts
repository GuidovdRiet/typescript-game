abstract class GameObject {
  protected element: HTMLElement;
  protected domName: string;

  protected x: number;
  protected y: number;

  protected width: number;
  protected height: number;
  protected attackPower: number;
  protected intervalId: number;
  protected visibility: boolean = true;

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

  public setVisibility(visibility: boolean) {
    this.visibility = visibility;
  }

  public getVisibility(): boolean {
    return this.visibility;
  }

  public removeElement() {
    this.element.remove();
    this.visibility = false;
  }

  public setAttackPower(maxDamage: number): void {
    this.attackPower = Math.floor((Math.random() * 10) / maxDamage);
  }

  public getAttackPower(): number {
    return this.attackPower;
  }

  public getPosition(): Vector {
    const position: Vector = {
      x: this.x,
      y: this.y
    };
    return position;
  }

  protected removeElementHandler() {
    //  remove if leaves screen;
    this.removeDomElementIfLeavesScreen();
    if (this.removeDomElementIfLeavesScreen()) {
      this.clearInterval(this.intervalId);
    }
  }

  protected removeDomElementIfLeavesScreen(): boolean {
    if (this.x > window.innerWidth || this.x < 0) {
      this.removeElement();
      return true;
    }
    return false;
  }

  protected clearInterval(intervalId: number): void {
    clearInterval(intervalId);
  }

  public removeListener(eventType: string, callBack: EventListener): void {
    window.removeEventListener('click', callBack);
  }

  protected draw(): void {
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }
}
