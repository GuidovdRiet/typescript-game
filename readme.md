# Typescript shooter

Within this game I implemented the following design patterns:

- Singleton
- Strategy pattern
- Observer pattern
- Polymorphism

# Installation

1.  Git clone project
2.  Open index.html
3.  Play game

# UML

# Pull request

Within this pull request I added the functionality where enemies are created at a random position on the screen. I made use of inheritance and composition.

[Link to pull request](https://github.com/Fabiantjoeaon/programmeren-4-game/pull/1 "Take a look!")

# Peer review

[Link to peer review](https://github.com/Fabiantjoeaon/programmeren-4-game/issues/2 "Take a look!")

# Singleton

I used a the Singleton pattern to create a game object. Why?..

- There can only be one game.
- This way I can call the game object in my entire game.

```javascript
private static instance: Game;
```

```javascript
public static getInstance() {
  if (!Game.instance) {
    Game.instance = new Game();
  }
  return Game.instance;
}
Game.getInstance();
```

# Polymorfisme

```javascript
private pickedUpItems: Item[] = [];

public update(pickedUpItems: Item[]) {
  this.coins = pickedUpItems.map(pickedUpItem => {
    if (pickedUpItem instanceof Coin) {
      return pickedUpItem;
    }
    return null;
  });
  this.totalCoins = this.coins.length;
}
```

```javascript
class Bomber extends Character {
  private weapon: Weapon;
}

class Game extends GameObject {
  private addShootingEvent(): void {
    this.shootEventListener = () => this.weapon.shoot(this.weapon);
  }
}

abstract class Weapon extends GameObject implements WeaponBehaviour {
  public shoot(instance: Weapon): void {
    this instanceof Rocketlauncher
    ? (this.bullet = new RocketlauncherBullet(this))
    : (this.bullet = new MachineGunBullet(this));
  }
}
```

# Strategy

```javascript
abstract class Weapon extends GameObject implements WeaponBehaviour {
  public bomber: Bomber;

  constructor(bomber: Bomber) {
    super();
    this.bomber = bomber;
  }
}

class Bomber extends Character {
  constructor() {
    super();
    this.weapon = new MachineGun(this);
  }
}

interface WeaponBehaviour {
  bomber: Bomber;
}
```

# Observer

```javascript
interface Observer {
  notify(): void;
}

interface Subject {
  observers: Observer[];
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
}

class Level extends GameObject implements Subject {
  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(): void {
    this.removeObjectsFromArrayIfNotVisible([this.observers]);
  }

  public levelUp() {
    for(const observer of this.observers) {
      observer.notify();
    }
  }
}

class Character extends GameObject implements Observer {
  public notify(): void {
    this.attackPower = this.level.getAttackPowerLevel();
    this.moveSpeed = this.level.getMoveSpeedLevel();
    console.log(this.element, 'is notified');
  }
}
```

# Gameplay componenten
```javascript
* De game heeft levels met een oplopende moeilijkheidsgraad
* De game ziet er visueel aantrekkelijk uit. Er is aandacht besteed aan een
solide UI en aan een consistent grafisch ontwerp
```
