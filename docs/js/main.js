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
    }
    GameObject.prototype.collision = function (c1, c2) {
        if (c1 || c2) {
            return !(c2.x > c1.x + c1.width ||
                c2.x + c2.width < c1.x ||
                c2.y > c1.y + c1.height ||
                c2.y + c2.height < c1.y);
        }
    };
    return GameObject;
}());
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.element = document.createElement(name);
        document.body.appendChild(_this.element);
        _this.width = _this.element.clientWidth;
        _this.height = _this.element.clientHeight;
        return _this;
    }
    Character.prototype.getPosition = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
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
        _this.animationCount = 0;
        _this.start();
        window.addEventListener("keydown", function (event) {
            return _this.move(event, 4);
        });
        window.addEventListener("keyup", function (event) {
            _this.move(event, 0);
            _this.setWalkingBackground(true);
        });
        return _this;
    }
    Bomber.prototype.start = function () {
        this.x = window.innerWidth / 2 - this.width;
        this.y = window.innerHeight / 2 - this.height;
        this.setWalkingBackground(true);
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
                this.setWalkingBackground(false);
                break;
            case rightKey:
                this.rightSpeed = speed;
                this.setWalkingBackground(false);
                break;
            case upKey:
                this.upSpeed = speed;
                this.setWalkingBackground(false);
                break;
            case downKey:
                this.downSpeed = speed;
                this.setWalkingBackground(false);
                break;
        }
    };
    Bomber.prototype.setWalkingBackground = function (startPostion) {
        var baseUrl = "../docs/img/characters/bomber/spr_player_";
        if (startPostion) {
            this.animationCount = 0;
        }
        else {
            this.animationCount <= 2
                ? this.animationCount++
                : (this.animationCount = 0);
        }
        this.element.style.backgroundImage = "url(" + baseUrl + this.animationCount + ".png)";
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
        this.weapon.draw();
        this.draw();
    };
    Bomber.prototype.draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return Bomber;
}(Character));
var Walker = (function (_super) {
    __extends(Walker, _super);
    function Walker() {
        var _this = _super.call(this, "walker") || this;
        _this.start();
        return _this;
    }
    Walker.prototype.start = function () {
        this.x = window.innerWidth - this.width;
        this.y = (window.innerHeight / 100) * (Math.random() * 100);
        this.draw();
    };
    Walker.prototype.draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return Walker;
}(Character));
var Game = (function () {
    function Game() {
        this.bomber = new Bomber();
        this.walker = new Walker();
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bomber.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
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
        });
    };
    MachineGun.prototype.start = function () {
        this.draw();
    };
    MachineGun.prototype.draw = function () {
        var bomberPosition = this.bomber.getPosition();
        this.x = bomberPosition.x;
        this.y = bomberPosition.y + this.height / 2 + this.bomberHeight / 2;
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return MachineGun;
}(Gun));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bullet.prototype.removeIfLeavesScreen = function () {
        if (this.x > window.innerWidth) {
            this.element.remove();
        }
    };
    return Bullet;
}(GameObject));
var MachineGunBullet = (function (_super) {
    __extends(MachineGunBullet, _super);
    function MachineGunBullet(machineGun) {
        var _this = _super.call(this) || this;
        _this.bulletSpeed = 10;
        _this.element = document.createElement("MachineGunBullet");
        document.body.appendChild(_this.element);
        _this.width = _this.element.offsetWidth;
        _this.height = _this.element.offsetHeight;
        _this.machineGun = machineGun;
        _this.start();
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
        this.removeIfLeavesScreen();
        this.draw();
    };
    MachineGunBullet.prototype.draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return MachineGunBullet;
}(Bullet));
//# sourceMappingURL=main.js.map