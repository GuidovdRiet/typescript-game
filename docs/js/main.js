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
    new Game();
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
    function Character() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Character;
}(GameObject));
var Bomber = (function (_super) {
    __extends(Bomber, _super);
    function Bomber() {
        var _this = _super.call(this) || this;
        _this._leftSpeed = 0;
        _this._upSpeed = 0;
        _this._downSpeed = 0;
        _this._rightSpeed = 0;
        _this._animationCount = 0;
        _this.element = document.createElement("bomber");
        document.body.appendChild(_this.element);
        _this.width = _this.element.clientWidth;
        _this.height = _this.element.clientHeight;
        _this._start();
        window.addEventListener("keydown", function (event) {
            return _this.move(event, 6);
        });
        window.addEventListener("keyup", function (event) {
            _this.move(event, 0);
            _this._setWalkingBackground(true);
        });
        return _this;
    }
    Bomber.prototype._start = function () {
        this.x = (window.innerWidth / 2) - this.width;
        this.y = (window.innerHeight / 2) - this.height;
        this._setWalkingBackground(true);
        this._weapon = new MachineGun(this);
    };
    Bomber.prototype.move = function (event, speed) {
        var leftKey = 37;
        var upKey = 38;
        var rightKey = 39;
        var downKey = 40;
        switch (event.keyCode) {
            case leftKey:
                this._leftSpeed = speed;
                this._setWalkingBackground(false);
                break;
            case rightKey:
                this._rightSpeed = speed;
                this._setWalkingBackground(false);
                break;
            case upKey:
                this._upSpeed = speed;
                this._setWalkingBackground(false);
                break;
            case downKey:
                this._downSpeed = speed;
                this._setWalkingBackground(false);
                break;
        }
    };
    Bomber.prototype._setWalkingBackground = function (startPostion) {
        var baseUrl = "../docs/img/characters/bomber/spr_player_";
        if (startPostion) {
            this._animationCount = 0;
        }
        else {
            this._animationCount <= 2
                ? this._animationCount++
                : (this._animationCount = 0);
        }
        this.element.style.backgroundImage = "url(" + baseUrl + this._animationCount + ".png)";
    };
    Bomber.prototype.update = function () {
        var targetX = this.x - this._leftSpeed + this._rightSpeed;
        var targetY = this.y - this._upSpeed + this._downSpeed;
        var screenCorrection = 15;
        if (targetX < window.innerWidth - screenCorrection - this.width &&
            targetX > 0)
            this.x = targetX;
        if (targetY < window.innerHeight - screenCorrection - this.height &&
            targetY > 0)
            this.y = targetY;
        this._weapon.draw();
        this._draw();
    };
    Bomber.prototype._draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return Bomber;
}(Character));
var Game = (function () {
    function Game() {
        this._bomber = new Bomber();
        this._gameLoop();
    }
    Game.prototype._gameLoop = function () {
        var _this = this;
        this._bomber.update();
        requestAnimationFrame(function () { return _this._gameLoop(); });
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
        _this._bomber = bomber;
        _this.element = document.createElement("machinegun");
        document.body.appendChild(_this.element);
        _this.height = _this.element.offsetHeight;
        _this.width = _this.element.offsetWidth;
        _this._bomberHeight = bomber.getHeight();
        _this._shoot();
        _this._start();
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
    MachineGun.prototype._shoot = function () {
        var _this = this;
        document.addEventListener("click", function () {
            _this._machineGunBullet = new MachineGunBullet(_this);
        });
    };
    MachineGun.prototype._start = function () {
        this.draw();
    };
    MachineGun.prototype.draw = function () {
        var bomberPosition = this._bomber.getPosition();
        this.x = bomberPosition.x;
        this.y = bomberPosition.y + this.height / 2 + this._bomberHeight / 2;
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
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
        _this.element = document.createElement("MachineGunBullet");
        document.body.appendChild(_this.element);
        _this._machineGun = machineGun;
        _this._start();
        return _this;
    }
    MachineGunBullet.prototype._start = function () {
        var weaponPosition = this._machineGun.getPostion();
        var weaponWidth = this._machineGun.getWidth();
        var bulletHeight = this.element.offsetHeight;
        this.x = weaponPosition.x + weaponWidth;
        this.y = weaponPosition.y + bulletHeight - 1;
        this.draw();
        this._update();
    };
    MachineGunBullet.prototype._update = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this._update(); });
        this.x = this.x + 10;
        this.draw();
    };
    MachineGunBullet.prototype.draw = function () {
        this.element.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return MachineGunBullet;
}(Bullet));
//# sourceMappingURL=main.js.map