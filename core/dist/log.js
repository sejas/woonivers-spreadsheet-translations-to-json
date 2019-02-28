"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    constructor(debug) {
        this.debug = false;
        this.info = (info) => {
            if (this.debug) {
                console.log(info);
            }
        };
        this.debug = debug;
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map