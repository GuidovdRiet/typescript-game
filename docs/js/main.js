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
        this.bomber = new Bomber();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bomber.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
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
        _this.leftSpeed = 0;
        _this.upSpeed = 0;
        _this.downSpeed = 0;
        _this.rightSpeed = 0;
        _this.animationCount = 0;
        _this.div = document.createElement("bomber");
        document.body.appendChild(_this.div);
        _this.start();
        window.addEventListener("keydown", function (event) {
            _this.move(event, 6);
        });
        window.addEventListener("keyup", function (event) {
            _this.move(event, 0);
            _this.animationCount = 0;
            _this.setWalkingBackground(true);
        });
        return _this;
    }
    Bomber.prototype.start = function () {
        this.x = 50;
        this.y = 100;
        this.setWalkingBackground(true);
    };
    Bomber.prototype.move = function (event, speed) {
        var leftKey = 37;
        var upKey = 38;
        var rightKey = 39;
        var downKey = 40;
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
        this.div.style.backgroundImage = "url(" + baseUrl + this.animationCount + ".png)";
    };
    Bomber.prototype.update = function () {
        var targetX = this.x - this.leftSpeed + this.rightSpeed;
        var targetY = this.y - this.upSpeed + this.downSpeed;
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