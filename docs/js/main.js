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
window.addEventListener('load', function () {
    new Game();
});
var Bomber = (function (_super) {
    __extends(Bomber, _super);
    function Bomber() {
        var _this = _super.call(this) || this;
        _this._leftSpeed = 0;
        _this._upSpeed = 0;
        _this._downSpeed = 0;
        _this._rightSpeed = 0;
        _this._animationCount = 0;
        _this.div = document.createElement("bomber");
        document.body.appendChild(_this.div);
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
        this.x = 50;
        this.y = 100;
        this._setWalkingBackground(true);
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
        this.div.style.backgroundImage = "url(" + baseUrl + this._animationCount + ".png)";
    };
    Bomber.prototype.update = function () {
        var targetX = this.x - this._leftSpeed + this._rightSpeed;
        var targetY = this.y - this._upSpeed + this._downSpeed;
        this.x = targetX;
        this.y = targetY;
        this.draw();
    };
    Bomber.prototype.draw = function () {
        this.div.style.transform = "translate3d(" + this.x + "px, " + this.y + "px, 0px)";
    };
    return Bomber;
}(GameObject));
//# sourceMappingURL=main.js.map