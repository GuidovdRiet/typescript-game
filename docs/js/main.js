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
        window.removeEventListener('click', callBack);
    };
    GameObject.prototype.draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return GameObject;
}());
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.animationCount = 0;
        _this.health = 100;
        _this.element = document.createElement(name);
        document.body.appendChild(_this.element);
        _this.width = _this.element.clientWidth;
        _this.height = _this.element.clientHeight;
        return _this;
    }
    Character.prototype.setWalkingBackground = function (startPostion, backgrounds, baseUrl) {
        startPostion
            ? (this.animationCount = 0)
            : this.animationCount <= backgrounds
                ? this.animationCount++
                : (this.animationCount = 0);
        this.element.style.backgroundImage = "url(" + baseUrl + this.animationCount + ".png)";
    };
    Character.prototype.animate = function (url) {
        var _this = this;
        this.intervalId = setInterval(function () {
            _this.setWalkingBackground(false, 2, url);
        }, 150);
    };
    Character.prototype.checkIfDead = function (character) {
        if (this.health <= 0) {
            this.removeElement();
            Game.getInstance()
                .getitems()
                .push(new Coin(character));
            this.healthBar.removeElement();
            this.clearInterval(this.intervalId);
        }
    };
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
    function Bomber() {
        var _this = _super.call(this, "bomber") || this;
        _this.leftSpeed = 0;
        _this.upSpeed = 0;
        _this.downSpeed = 0;
        _this.rightSpeed = 0;
        _this.baseUrlBackgroundAnimation = "../docs/img/characters/bomber/spr_player_";
        _this.start();
        _this.moveSpeed = 4;
        window.addEventListener("keydown", function (event) {
            _this.move(event, _this.moveSpeed);
            _this.switchWeapons(event);
        });
        window.addEventListener("keyup", function (event) {
            _this.move(event, 0);
            _this.setWalkingBackground(true, 2, _this.baseUrlBackgroundAnimation);
        });
        window.addEventListener("click", function () {
            _this.weapon.shoot(_this.weapon);
        });
        return _this;
    }
    Bomber.prototype.start = function () {
        this.x = window.innerWidth / 2 - this.width;
        this.y = window.innerHeight / 2 - this.height;
        this.setWalkingBackground(true, 2, this.baseUrlBackgroundAnimation);
        this.weapon = new MachineGun(this);
    };
    Bomber.prototype.switchWeapons = function (event) {
        var firstWeaponKey = 49;
        var secondWeaponKey = 50;
        switch (event.keyCode) {
            case firstWeaponKey:
                this.weapon.removeElement();
                this.weapon = new MachineGun(this);
                break;
            case secondWeaponKey:
                this.weapon.removeElement();
                this.weapon = new Rocketlauncher(this);
                break;
        }
    };
    Bomber.prototype.move = function (event, speed) {
        var leftKey = 65;
        var upKey = 87;
        var rightKey = 68;
        var downKey = 83;
        switch (event.keyCode) {
            case leftKey:
                this.leftSpeed = speed;
                this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
                break;
            case rightKey:
                this.rightSpeed = speed;
                this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
                break;
            case upKey:
                this.upSpeed = speed;
                this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
                break;
            case downKey:
                this.downSpeed = speed;
                this.setWalkingBackground(false, 2, this.baseUrlBackgroundAnimation);
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
;
var Walker = (function (_super) {
    __extends(Walker, _super);
    function Walker() {
        var _this = _super.call(this, "walker") || this;
        _this.baseUrlBackgroundAnimation = "../docs/img/characters/zombies/walker/spr_zombie1_attack_";
        _this.start();
        return _this;
    }
    Walker.prototype.start = function () {
        this.x = window.innerWidth - this.width;
        this.y = (window.innerHeight / 100) * (Math.random() * 90);
        this.attackPower = 3;
        this.moveSpeed = 3;
        this.healthBar = new HealthBar(this);
        this.setAttackPower(this.attackPower);
        this.update();
        this.animate(this.baseUrlBackgroundAnimation);
    };
    Walker.prototype.update = function () {
        this.x = this.x - this.moveSpeed;
        this.healthBar.update();
        this.removeElementHandler();
        this.checkIfDead(this);
        this.draw();
    };
    return Walker;
}(Character));
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.walkers = [];
        _this.bullets = [];
        _this.items = [];
        _this.pickedUpItems = [];
        _this.bomber = new Bomber();
        _this.walkers.push(new Walker());
        setInterval(function () {
            _this.walkers.push(new Walker());
        }, 7000);
        _this.gameLoop();
        _this.createUi();
        return _this;
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.createBomber();
        this.createEnemies();
        this.removeObjectsHandler();
        this.collisionHandler();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.createBomber = function () {
        this.bomber.update();
        this.bomber.getHealth();
    };
    Game.prototype.createEnemies = function () {
        this.walkers.forEach(function (walker) {
            walker.update();
        });
    };
    Game.prototype.createUi = function () {
        this.health = new Health();
    };
    Game.prototype.addBulletsToArray = function (bullet) {
        this.bullets.push(bullet);
    };
    Game.prototype.removeObjectsHandler = function () {
        this.removeObjectsFromArrayIfNotVisible([this.bullets, this.walkers]);
    };
    Game.prototype.collisionHandler = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (this.collision(item, this.bomber)) {
                item.removeElement();
                this.pickedUpItems.push(item);
                this.removeObjectsFromArrayIfNotVisible([this.items]);
            }
        }
        for (var _b = 0, _c = this.walkers; _b < _c.length; _b++) {
            var walker = _c[_b];
            if (this.collision(this.bomber, walker)) {
                this.bomber.damage(walker.getAttackPower());
                this.health.update(this.bomber);
            }
            for (var _d = 0, _e = this.bullets; _d < _e.length; _d++) {
                var bullet = _e[_d];
                if (this.collision(bullet, walker)) {
                    walker.damage(this.bomber.getWeapon().getAttackPower());
                    bullet.removeElement();
                }
            }
        }
    };
    Game.prototype.removeObjectsFromArrayIfNotVisible = function (arrays) {
        arrays.map(function (array) {
            array.map(function (item, index) {
                if (!item.getVisibility()) {
                    array.splice(index, 1);
                }
            });
        });
    };
    Game.prototype.getBulletsArray = function () {
        return this.bullets;
    };
    Game.prototype.getitems = function () {
        return this.items;
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}(GameObject));
var HealthBar = (function (_super) {
    __extends(HealthBar, _super);
    function HealthBar(character) {
        var _this = _super.call(this) || this;
        _this.element = document.createElement("healthbar");
        document.body.appendChild(_this.element);
        _this.character = character;
        _this.health = _this.character.getHealth();
        _this.width = _this.element.clientWidth;
        _this.update();
        return _this;
    }
    HealthBar.prototype.decreaseWidthOnDamage = function () {
        this.element.style.width = this.character.getHealth() / 2 + "px";
    };
    HealthBar.prototype.update = function () {
        this.x = this.character.getPosition().x;
        this.y = this.character.getPosition().y;
        this.removeElementHandler();
        this.decreaseWidthOnDamage();
        this.draw();
    };
    return HealthBar;
}(GameObject));
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickedUp = false;
        return _this;
    }
    Item.prototype.setPickedUp = function (pickedUp) {
        this.pickedUp = pickedUp;
    };
    Item.prototype.getPickedUp = function () {
        return this.pickedUp;
    };
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
var Ui = (function (_super) {
    __extends(Ui, _super);
    function Ui() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ui;
}(GameObject));
var Health = (function (_super) {
    __extends(Health, _super);
    function Health() {
        var _this = _super.call(this) || this;
        _this.start();
        return _this;
    }
    Health.prototype.start = function () {
        this.element = document.createElement("health");
        var healthbarContainer = document.querySelector("healthbarcontainer");
        healthbarContainer.appendChild(this.element);
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
    };
    Health.prototype.update = function (bomber) {
        var colorHealthOrange = 60;
        var colorHealthRed = 30;
        var bomberHealth = bomber.getHealth();
        if (bomberHealth < colorHealthOrange)
            this.element.style.background = "#F78C6C";
        if (bomberHealth < colorHealthRed)
            this.element.style.background = "#B83C3C";
        this.element.style.width = (this.width / 100) * bomberHealth + "px";
    };
    return Health;
}(Ui));
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
    Weapon.prototype.shoot = function (instance) {
        this instanceof Rocketlauncher
            ? (this.bullet = new RocketlauncherBullet(this))
            : (this.bullet = new MachineGunBullet(this));
        Game.getInstance().addBulletsToArray(this.bullet);
    };
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
    return MachineGun;
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
    return Rocketlauncher;
}(Weapon));
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
//# sourceMappingURL=main.js.map