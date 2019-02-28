var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var build = require('gluegun').build;
/**
 * Create the cli and kick it off
 */
function run(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var cli, toolbox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cli = build()
                        .brand('woo-translate')
                        .src(__dirname)
                        .plugins('./node_modules', { matching: 'woo-translate-*', hidden: true })
                        .help() // provides default for help, h, --help, -h
                        .version() // provides default for version, v, --version, -v
                        .create();
                    return [4 /*yield*/, cli.run(argv)
                        // send it back (for testing, mostly)
                    ];
                case 1:
                    toolbox = _a.sent();
                    // send it back (for testing, mostly)
                    return [2 /*return*/, toolbox];
            }
        });
    });
}
module.exports = { run: run };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFRLElBQUEsZ0NBQUssQ0FBdUI7QUFFcEM7O0dBRUc7QUFDSCxTQUFlLEdBQUcsQ0FBQyxJQUFJOzs7Ozs7b0JBRWYsR0FBRyxHQUFHLEtBQUssRUFBRTt5QkFDaEIsS0FBSyxDQUFDLGVBQWUsQ0FBQzt5QkFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQzt5QkFDZCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3lCQUN4RSxJQUFJLEVBQUUsQ0FBQywyQ0FBMkM7eUJBQ2xELE9BQU8sRUFBRSxDQUFDLGlEQUFpRDt5QkFDM0QsTUFBTSxFQUFFLENBQUE7b0JBR0sscUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBRW5DLHFDQUFxQztzQkFGRjs7b0JBQTdCLE9BQU8sR0FBRyxTQUFtQjtvQkFFbkMscUNBQXFDO29CQUNyQyxzQkFBTyxPQUFPLEVBQUE7Ozs7Q0FDZjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFBIn0=