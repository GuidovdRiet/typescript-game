# Typescript shooter
Within this game I implemented the following design patterns:

* Singleton
* Strategy pattern
* Observer pattern
* Polymorphism

# Installation
1. Git clone project
2. Open index.html
3. Play game

# UML 


# Pull request 
Within this pull request I added the functionality where enemies are created at a random position on the screen. I made use of inheritance and composition.

[Link to pull request](https://github.com/Fabiantjoeaon/programmeren-4-game/pull/1 "Take a look!")

# Peer review
[Link to peer review](https://github.com/Fabiantjoeaon/programmeren-4-game/issues/2 "Take a look!")

# Singleton
I used a the Singleton pattern to create a game object. Why?..
* There can only be one game.
* This way I can call the game object in my entire game.

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


# Strategy

# Observer

# Gameplay componenten