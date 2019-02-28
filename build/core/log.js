"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log(debug) {
        var _this = this;
        this.debug = false;
        this.info = function (info) {
            if (_this.debug) {
                console.log(info);
            }
        };
        this.debug = debug;
    }
    return Log;
}());
exports.default = Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFFRSxhQUFZLEtBQWM7UUFBMUIsaUJBRUM7UUFIRCxVQUFLLEdBQUcsS0FBSyxDQUFBO1FBSWIsU0FBSSxHQUFHLFVBQUMsSUFBWTtZQUNsQixJQUFJLEtBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNsQjtRQUNILENBQUMsQ0FBQTtRQU5DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7SUFNSCxVQUFDO0FBQUQsQ0FBQyxBQVZELElBVUMifQ==