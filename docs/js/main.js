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
    }
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
    GameObject.prototype.draw = function (x, y) {
        this.div.style.transform = "translate3d(" + x + "px, " + y + "px, 0px)";
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
        _this.x = 50;
        _this.y = 100;
        _this.div = document.createElement('bomber');
        document.body.appendChild(_this.div);
        _this.draw(_this.x, _this.y);
        return _this;
    }
    return Bomber;
}(GameObject));
//# sourceMappingURL=main.js.map