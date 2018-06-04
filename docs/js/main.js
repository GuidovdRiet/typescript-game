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
    GameObject.prototype.setAttackPower = function (maxDamage) {
        this.attackPower = Math.floor(Math.random() * 10 / maxDamage);
    };
    GameObject.prototype.getAttackPower = function () {
        return this.attackPower;
    };
    GameObject.prototype.getVisibility = function () {
        return this.visibility;
    };
    GameObject.prototype.collision = function (c1, c2) {
        if (c1 || c2) {
            return !(c2.x > c1.x + c1.width ||
                c2.x + c2.width < c1.x ||
                c2.y > c1.y + c1.height ||
                c2.y + c2.height < c1.y);
        }
    };
    GameObject.prototype.removeElement = function () {
        this.element.remove();
        this.visibility = false;
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
        window.removeEventListener(eventType, callBack);
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
        _this.targetIsLeft = true;
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
    Character.prototype.checkIfDead = function () {
        if (this.health <= 0) {
            this.removeElement();
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
    Character.prototype.getPosition = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
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
            return _this.move(event, _this.moveSpeed);
        });
        window.addEventListener("keyup", function (event) {
            _this.move(event, 0);
            _this.setWalkingBackground(true, 2, _this.baseUrlBackgroundAnimation);
        });
        return _this;
    }
    Bomber.prototype.start = function () {
        this.x = window.innerWidth / 2 - this.width;
        this.y = window.innerHeight / 2 - this.height;
        this.setWalkingBackground(true, 2, this.baseUrlBackgroundAnimation);
        this.weapon = new MachineGun(this);
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
        this.weapon.start();
        this.draw();
    };
    return Bomber;
}(Character));
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
        this.y = window.innerHeight / 100 * (Math.random() * 90);
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
        this.checkIfDead();
        this.draw();
    };
    return Walker;
}(Character));
;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.walkers = new Array();
        _this.bullets = new Array();
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
        this.damageHandler();
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
    Game.prototype.damageHandler = function () {
        for (var _i = 0, _a = this.walkers; _i < _a.length; _i++) {
            var walker = _a[_i];
            if (this.collision(this.bomber, walker)) {
                this.bomber.damage(walker.getAttackPower());
                this.health.update(this.bomber.getHealth());
            }
            for (var _b = 0, _c = this.bullets; _b < _c.length; _b++) {
                var bullet = _c[_b];
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
    Health.prototype.update = function (health) {
        console.log(health);
        this.element.style.width = this.width / 100 * health + "px";
    };
    return Health;
}(Ui));
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Gun;
}(GameObject));
var MachineGun = (function (_super) {
    __extends(MachineGun, _super);
    function MachineGun(bomber) {
        var _this = _super.call(this) || this;
        _this.bomber = bomber;
        _this.element = document.createElement("machinegun");
        document.body.appendChild(_this.element);
        _this.attackPower = 10;
        _this.height = _this.element.offsetHeight;
        _this.width = _this.element.offsetWidth;
        _this.bomberHeight = bomber.getHeight();
        _this.shoot();
        _this.start();
        return _this;
    }
    MachineGun.prototype.getPostion = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
    };
    MachineGun.prototype.getWidth = function () {
        return this.width;
    };
    MachineGun.prototype.shoot = function () {
        var _this = this;
        document.addEventListener("click", function () {
            _this.machineGunBullet = new MachineGunBullet(_this);
            Game.getInstance().addBulletsToArray(_this.machineGunBullet);
        });
    };
    MachineGun.prototype.start = function () {
        var bomberPosition = this.bomber.getPosition();
        this.x = bomberPosition.x;
        this.y = bomberPosition.y + this.height / 2 + this.bomberHeight / 2;
        this.draw();
    };
    return MachineGun;
}(Gun));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bullet;
}(GameObject));
var MachineGunBullet = (function (_super) {
    __extends(MachineGunBullet, _super);
    function MachineGunBullet(machineGun) {
        var _this = _super.call(this) || this;
        _this.bulletSpeed = 10;
        _this.MachineGunBulletArray = Game.getInstance().getBulletsArray();
        _this.index = _this.MachineGunBulletArray.indexOf(_this);
        _this.element = document.createElement("MachineGunBullet");
        document.body.appendChild(_this.element);
        _this.width = _this.element.offsetWidth;
        _this.height = _this.element.offsetHeight;
        _this.machineGun = machineGun;
        _this.start();
        window.addEventListener('keydown', function (event) {
            if (event.keyCode === 32) {
                var index = _this.MachineGunBulletArray.indexOf(_this);
            }
        });
        return _this;
    }
    MachineGunBullet.prototype.start = function () {
        var weaponPosition = this.machineGun.getPostion();
        var weaponWidth = this.machineGun.getWidth();
        var bulletHeight = this.element.offsetHeight;
        this.x = weaponPosition.x + weaponWidth;
        this.y = weaponPosition.y + bulletHeight - 1;
        this.draw();
        this.update();
    };
    MachineGunBullet.prototype.update = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.update(); });
        this.x = this.x + this.bulletSpeed;
        this.removeDomElementIfLeavesScreen();
        this.draw();
    };
    return MachineGunBullet;
}(Bullet));
//# sourceMappingURL=main.js.map