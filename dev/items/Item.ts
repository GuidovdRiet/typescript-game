class Item extends GameObject {
  protected pickedUp: boolean = false;

  public setPickedUp(pickedUp: boolean) {
    this.pickedUp = pickedUp;
  }

  public getPickedUp() {
    return this.pickedUp;
  }
}
