var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.addEventListener('load', function () {
    Game.getInstance();
});
var GameObject = (function () {
    function GameObject() {
        this.visibility = true;
    }
    GameObject.prototype.collision = function (c1, c2) {
        if (c1 || c2) {
            return !(c2.x > c1.x + c1.width ||
                c2.x + c2.width < c1.x ||
                c2.y > c1.y + c1.height ||
                c2.y + c2.height < c1.y);
        }
    };
    GameObject.prototype.setVisibility = function (visibility) {
        this.visibility = visibility;
    };
    GameObject.prototype.getVisibility = function () {
        return this.visibility;
    };
    GameObject.prototype.removeElement = function () {
        this.element.remove();
        this.visibility = false;
    };
    GameObject.prototype.setAttackPower = function (maxDamage) {
        this.attackPower = Math.floor((Math.random() * 10) / maxDamage);
    };
    GameObject.prototype.getAttackPower = function () {
        return this.attackPower;
    };
    GameObject.prototype.getPosition = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
    };
    GameObject.prototype.removeElementHandler = function () {
        this.removeDomElementIfLeavesScreen();
        if (this.removeDomElementIfLeavesScreen()) {
            this.clearInterval(this.intervalId);
        }
    };
    GameObject.prototype.removeObjectsFromArrayIfNotVisible = function (arrays) {
        arrays.map(function (array) {
            array.map(function (item, index) {
                if (!item.getVisibility()) {
                    array.splice(index, 1);
                }
            });
        });
    };
    GameObject.prototype.removeDomElementIfLeavesScreen = function () {
        if (this.x > window.innerWidth || this.x < 0) {
            this.removeElement();
            return true;
        }
        return false;
    };
    GameObject.prototype.clearInterval = function (intervalId) {
        clearInterval(intervalId);
    };
    GameObject.prototype.removeListener = function (eventType, callBack) {
        window.removeEventListener("click", callBack);
    };
    GameObject.prototype.draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return GameObject;
}());
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name, level) {
        var _this = _super.call(this) || this;
        _this.health = 100;
        _this.element = document.createElement(name);
        document.body.appendChild(_this.element);
        _this.level = level;
        _this.width = _this.element.clientWidth;
        _this.height = _this.element.clientHeight;
        return _this;
    }
    Character.prototype.notify = function () {
        this.attackPower = this.level.getAttackPowerLevel();
        this.moveSpeed = this.level.getMoveSpeedLevel();
        console.log(this.element, "is notified");
    };
    Character.prototype.animate = function (setToFirstSprite) {
        var pos = 0 - this.frame * this.framewidth;
        this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        if (setToFirstSprite)
            pos = 0;
        this.element.style.backgroundPosition = pos + "px 0px";
    };
    Character.prototype.checkIfDead = function (character) {
        if (this.health <= 0) {
            this.removeElement();
            Game.getInstance()
                .getitems()
                .push(new Coin(character));
            this.walkerHealthBar.removeElement();
            this.clearInterval(this.intervalId);
        }
    };
    Character.prototype.update = function () { };
    Character.prototype.getHealth = function () {
        return this.health;
    };
    Character.prototype.damage = function (damage) {
        this.health = this.health - damage;
    };
    Character.prototype.getMoveSpeed = function () {
        return this.moveSpeed;
    };
    Character.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Character.prototype.getHeight = function () {
        return this.height;
    };
    Character.prototype.getWidth = function () {
        return this.height;
    };
    return Character;
}(GameObject));
var Bomber = (function (_super) {
    __extends(Bomber, _super);
    function Bomber(level) {
        var _this = _super.call(this, "bomber", level) || this;
        _this.leftSpeed = 0;
        _this.upSpeed = 0;
        _this.downSpeed = 0;
        _this.rightSpeed = 0;
        _this.start();
        _this.moveSpeed = 4;
        _this.frames = 4;
        _this.frame = 0;
        _this.framewidth = 60;
        level.subscribe(_this);
        window.addEventListener("keydown", function (event) {
            _this.move(event, _this.moveSpeed);
            _this.switchWeapons(event);
        });
        window.addEventListener("keyup", function (event) {
            _this.move(event, 0);
            _this.animate(true);
        });
        _this.addShootingEvent();
        return _this;
    }
    Bomber.prototype.addShootingEvent = function () {
        var _this = this;
        this.shootEventListener = function () { return _this.weapon.shoot(); };
        window.addEventListener("click", this.shootEventListener);
    };
    Bomber.prototype.start = function () {
        this.x = window.innerWidth / 2 - this.width;
        this.y = window.innerHeight / 2 - this.height;
        this.weapon = new MachineGun(this);
    };
    Bomber.prototype.switchWeapons = function (event) {
        var firstWeaponKey = 49;
        var secondWeaponKey = 50;
        switch (event.keyCode) {
            case firstWeaponKey:
                this.weapon.removeElement();
                this.weapon.removeListener("click", this.shootEventListener);
                this.addShootingEvent();
                this.weapon = new MachineGun(this);
                break;
            case secondWeaponKey:
                this.weapon.removeElement();
                this.weapon.removeListener("click", this.shootEventListener);
                this.addShootingEvent();
                this.weapon = new Rocketlauncher(this);
                break;
        }
    };
    Bomber.prototype.move = function (event, speed) {
        this.animate(false);
        var leftKey = 65;
        var upKey = 87;
        var rightKey = 68;
        var downKey = 83;
        switch (event.keyCode) {
            case leftKey:
                this.leftSpeed = speed;
                break;
            case rightKey:
                this.rightSpeed = speed;
                break;
            case upKey:
                this.upSpeed = speed;
                break;
            case downKey:
                this.downSpeed = speed;
                break;
        }
    };
    Bomber.prototype.getWeapon = function () {
        return this.weapon;
    };
    Bomber.prototype.update = function () {
        var targetX = this.x - this.leftSpeed + this.rightSpeed;
        var targetY = this.y - this.upSpeed + this.downSpeed;
        var screenCorrection = 15;
        if (targetX < window.innerWidth - screenCorrection - this.width &&
            targetX > 0)
            this.x = targetX;
        if (targetY < window.innerHeight - screenCorrection - this.height &&
            targetY > 0)
            this.y = targetY;
        this.weapon.start(this.weapon.getYPos());
        this.draw();
    };
    return Bomber;
}(Character));
var Walker = (function (_super) {
    __extends(Walker, _super);
    function Walker(level) {
        var _this = _super.call(this, "walker", level) || this;
        _this.frames = 4;
        _this.frame = 0;
        _this.framewidth = 60;
        level.subscribe(_this);
        _this.start();
        return _this;
    }
    Walker.prototype.start = function () {
        var _this = this;
        this.x = window.innerWidth - this.width;
        this.y = (window.innerHeight / 100) * (Math.random() * 90);
        this.attackPower = this.level.getAttackPowerLevel();
        this.moveSpeed = this.level.getMoveSpeedLevel();
        setInterval(function () {
            _this.animate(false);
        }, 100);
        this.walkerHealthBar = new WalkerHealthBar(this);
        this.setAttackPower(this.attackPower);
        this.update();
    };
    Walker.prototype.update = function () {
        this.x = this.x - this.moveSpeed;
        this.walkerHealthBar.update();
        this.removeElementHandler();
        this.checkIfDead(this);
        this.draw();
    };
    return Walker;
}(Character));
;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.bullets = [];
        _this.characters = [];
        _this.items = [];
        _this.pickedUpItems = [];
        _this.level = new Level();
        _this.bomber = new Bomber(_this.level);
        _this.characters.push(_this.bomber);
        setInterval(function () {
            _this.characters.push(new Walker(_this.level));
        }, 2000);
        _this.createUI();
        _this.gameLoop();
        return _this;
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.updateCharacters();
        this.removeObjectsHandler();
        this.collisionHandler();
        this.levelHandler();
        this.level.unsubscribe();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.levelHandler = function () {
        if (this.level.getTotalCoinsTillNextLevel() === this.coinsBar.getTotalCoins()) {
            this.level.levelUp();
            this.levelCounter.setLevel();
        }
    };
    Game.prototype.unsubscribe = function (observer) {
        console.log("remove from array unsubscribe");
    };
    Game.prototype.updateCharacters = function () {
        this.characters.forEach(function (character) {
            character.update();
        });
    };
    Game.prototype.createUI = function () {
        this.playerHealthBar = new PlayerHealthBar();
        this.coinsBar = new CoinsBar(this.pickedUpItems, this.level);
        this.levelCounter = new LevelCounter(this.level);
    };
    Game.prototype.addBulletsToArray = function (bullet) {
        this.bullets.push(bullet);
    };
    Game.prototype.removeObjectsHandler = function () {
        this.removeObjectsFromArrayIfNotVisible([this.bullets, this.characters]);
    };
    Game.prototype.collisionHandler = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (this.collision(item, this.bomber)) {
                item.removeElement();
                this.pickedUpItems.push(item);
                this.coinsBar.update(this.pickedUpItems);
                this.removeObjectsFromArrayIfNotVisible([this.items]);
            }
        }
        for (var _b = 0, _c = this.characters; _b < _c.length; _b++) {
            var character = _c[_b];
            if (character instanceof Walker) {
                if (this.collision(this.bomber, character)) {
                    this.bomber.damage(character.getAttackPower());
                    this.playerHealthBar.update(this.bomber);
                }
            }
            for (var _d = 0, _e = this.bullets; _d < _e.length; _d++) {
                var bullet = _e[_d];
                if (this.collision(bullet, character)) {
                    character.damage(this.bomber.getWeapon().getAttackPower());
                    bullet.removeElement();
                }
            }
        }
    };
    Game.prototype.getBulletsArray = function () {
        return this.bullets;
    };
    Game.prototype.getitems = function () {
        return this.items;
    };
    return Game;
}(GameObject));
var Level = (function (_super) {
    __extends(Level, _super);
    function Level() {
        var _this = _super.call(this) || this;
        _this.level = 1;
        _this.totalCoinsTillNextLevel = 3;
        _this.attackPowerLevel = 3;
        _this.moveSpeedLevel = 3;
        _this.observers = [];
        return _this;
    }
    Level.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    Level.prototype.unsubscribe = function () {
        this.removeObjectsFromArrayIfNotVisible([this.observers]);
    };
    Level.prototype.levelUp = function () {
        console.log('Level up!', this.level);
        this.level = this.level + 1;
        this.totalCoinsTillNextLevel = this.totalCoinsTillNextLevel + 2;
        this.attackPowerLevel = this.attackPowerLevel + 3;
        this.moveSpeedLevel = this.moveSpeedLevel + 1;
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.notify();
        }
    };
    Level.prototype.getObservers = function () {
        return this.observers;
    };
    Level.prototype.getTotalCoinsTillNextLevel = function () {
        return this.totalCoinsTillNextLevel;
    };
    Level.prototype.getMoveSpeedLevel = function () {
        return this.moveSpeedLevel;
    };
    Level.prototype.getAttackPowerLevel = function () {
        return this.attackPowerLevel;
    };
    Level.prototype.getLevelCount = function () {
        return this.level;
    };
    return Level;
}(GameObject));
var WalkerHealthBar = (function (_super) {
    __extends(WalkerHealthBar, _super);
    function WalkerHealthBar(character) {
        var _this = _super.call(this) || this;
        _this.element = document.createElement("walkerhealthbar");
        document.body.appendChild(_this.element);
        _this.character = character;
        _this.health = _this.character.getHealth();
        _this.width = _this.element.clientWidth;
        _this.update();
        return _this;
    }
    WalkerHealthBar.prototype.decreaseWidthOnDamage = function () {
        this.element.style.width = this.character.getHealth() / 2 + "px";
    };
    WalkerHealthBar.prototype.update = function () {
        this.x = this.character.getPosition().x;
        this.y = this.character.getPosition().y;
        this.removeElementHandler();
        this.decreaseWidthOnDamage();
        this.draw();
    };
    return WalkerHealthBar;
}(GameObject));
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Item;
}(GameObject));
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(character) {
        var _this = _super.call(this) || this;
        _this.x = character.getPosition().x;
        _this.y = character.getPosition().y;
        _this.element = document.createElement("coin");
        document.body.appendChild(_this.element);
        _this.element.style.display = "block";
        _this.draw();
        return _this;
    }
    return Coin;
}(Item));
var CoinsBar = (function (_super) {
    __extends(CoinsBar, _super);
    function CoinsBar(pickedUpItems, level) {
        var _this = _super.call(this) || this;
        _this.coins = [];
        _this.totalCoins = 0;
        _this.level = level;
        _this.element = document.createElement("coinsbar");
        var coinbarContainer = document.querySelector("coinbarcontainer");
        coinbarContainer.appendChild(_this.element);
        _this.update(pickedUpItems);
        return _this;
    }
    CoinsBar.prototype.update = function (pickedUpItems) {
        this.coins = pickedUpItems.map(function (pickedUpItem) {
            if (pickedUpItem instanceof Coin) {
                return pickedUpItem;
            }
            return null;
        });
        this.totalCoins = this.coins.length;
        this.displayTotalCoins();
        this.setCoinBarWidth();
    };
    CoinsBar.prototype.getTotalCoins = function () {
        return this.totalCoins;
    };
    CoinsBar.prototype.displayTotalCoins = function () {
        this.element.innerHTML = "";
        var h4 = document.createElement("h4");
        h4.innerHTML = "" + this.totalCoins;
        this.element.appendChild(h4);
    };
    CoinsBar.prototype.setCoinBarWidth = function () {
        var width = (this.level.getTotalCoinsTillNextLevel()) * (this.totalCoins * 10);
        console.log(width);
        this.element.style.width = width + "px";
    };
    return CoinsBar;
}(GameObject));
var LevelCounter = (function (_super) {
    __extends(LevelCounter, _super);
    function LevelCounter(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        _this.element = document.createElement("h1");
        _this.wrapper = document.querySelector("levelcounter");
        _this.element.innerHTML = "1";
        _this.wrapper.appendChild(_this.element);
        return _this;
    }
    LevelCounter.prototype.setLevel = function () {
        this.element.innerHTML = "" + this.level.getLevelCount();
        this.wrapper.appendChild(this.element);
    };
    return LevelCounter;
}(GameObject));
var PlayerHealthBar = (function (_super) {
    __extends(PlayerHealthBar, _super);
    function PlayerHealthBar() {
        var _this = _super.call(this) || this;
        _this.start();
        return _this;
    }
    PlayerHealthBar.prototype.start = function () {
        this.element = document.createElement("playerhealthbar");
        var healthbarContainer = document.querySelector("healthbarcontainer");
        healthbarContainer.appendChild(this.element);
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
    };
    PlayerHealthBar.prototype.update = function (bomber) {
        var colorHealthOrange = 60;
        var colorHealthRed = 30;
        var bomberHealth = bomber.getHealth();
        if (bomberHealth < colorHealthOrange)
            this.element.style.background = "#F78C6C";
        if (bomberHealth < colorHealthRed)
            this.element.style.background = "#B83C3C";
        this.element.style.width = (this.width / 100) * bomberHealth + "px";
    };
    return PlayerHealthBar;
}(GameObject));
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(bomber) {
        var _this = _super.call(this) || this;
        _this.bomber = bomber;
        return _this;
    }
    Weapon.prototype.start = function (yPos) {
        var bomberPosition = this.bomber.getPosition();
        this.x = bomberPosition.x;
        this.y = bomberPosition.y + this.height / yPos + this.bomberHeight / yPos;
        this.draw();
    };
    Weapon.prototype.getWidth = function () {
        return this.width;
    };
    Weapon.prototype.getYPos = function () {
        return this.yPos;
    };
    Weapon.prototype.shoot = function () { };
    return Weapon;
}(GameObject));
var MachineGun = (function (_super) {
    __extends(MachineGun, _super);
    function MachineGun(bomber) {
        var _this = _super.call(this, bomber) || this;
        _this.element = document.createElement("machinegun");
        document.body.appendChild(_this.element);
        _this.attackPower = 10;
        _this.yPos = 2;
        _this.height = _this.element.offsetHeight;
        _this.width = _this.element.offsetWidth;
        _this.bomberHeight = bomber.getHeight();
        _this.start(_this.yPos);
        return _this;
    }
    MachineGun.prototype.shoot = function () {
        this.bullet = new MachineGunBullet(this);
        Game.getInstance().addBulletsToArray(this.bullet);
    };
    return MachineGun;
}(Weapon));
var Rocketlauncher = (function (_super) {
    __extends(Rocketlauncher, _super);
    function Rocketlauncher(bomber) {
        var _this = _super.call(this, bomber) || this;
        _this.element = document.createElement("rocketlauncher");
        document.body.appendChild(_this.element);
        _this.attackPower = 100;
        _this.yPos = 3;
        _this.height = _this.element.offsetHeight;
        _this.width = _this.element.offsetWidth;
        _this.bomberHeight = bomber.getHeight();
        _this.start(_this.yPos);
        return _this;
    }
    Rocketlauncher.prototype.shoot = function () {
        this.bullet = new RocketlauncherBullet(this);
        Game.getInstance().addBulletsToArray(this.bullet);
    };
    return Rocketlauncher;
}(Weapon));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bullet.prototype.start = function () {
        var weaponPosition = this.weapon.getPosition();
        var weaponWidth = this.weapon.getWidth();
        var bulletHeight = this.element.offsetHeight;
        this.x = weaponPosition.x + weaponWidth;
        this.y = weaponPosition.y + bulletHeight - 1;
        this.draw();
        this.update();
    };
    Bullet.prototype.update = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.update(); });
        this.x = this.x + this.bulletSpeed;
        this.removeDomElementIfLeavesScreen();
        this.draw();
    };
    return Bullet;
}(GameObject));
var MachineGunBullet = (function (_super) {
    __extends(MachineGunBullet, _super);
    function MachineGunBullet(machineGun) {
        var _this = _super.call(this) || this;
        _this.element = document.createElement("machinegunbullet");
        document.body.appendChild(_this.element);
        _this.width = _this.element.offsetWidth;
        _this.height = _this.element.offsetHeight;
        _this.weapon = machineGun;
        _this.bulletSpeed = 10;
        _this.start();
        return _this;
    }
    return MachineGunBullet;
}(Bullet));
var RocketlauncherBullet = (function (_super) {
    __extends(RocketlauncherBullet, _super);
    function RocketlauncherBullet(rocketlauncher) {
        var _this = _super.call(this) || this;
        _this.element = document.createElement("rocketlauncherbullet");
        document.body.appendChild(_this.element);
        _this.width = _this.element.offsetWidth;
        _this.height = _this.element.offsetHeight;
        _this.weapon = rocketlauncher;
        _this.bulletSpeed = 4;
        _this.start();
        return _this;
    }
    return RocketlauncherBullet;
}(Bullet));
//# sourceMappingURL=main.js.map