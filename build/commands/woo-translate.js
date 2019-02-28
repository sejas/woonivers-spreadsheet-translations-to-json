"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../core/dist/index");
var PREFIX = 'WOO-TRANSLATE:';
module.exports = {
    name: 'woo-translate',
    run: function (_a) {
        var print = _a.print, _b = _a.parameters.options, path = _b.path, id = _b.id, langs = _b.langs, verbose = _b.verbose, filesystem = _a.filesystem;
        return __awaiter(_this, void 0, void 0, function () {
            var error, finished, fullPath, directoryExists, langsToTranslate;
            return __generator(this, function (_c) {
                error = false;
                finished = function (lang) {
                    return print.info(PREFIX + " **" + lang + "** translated ok.");
                };
                /**
                 * Error PATH
                 */
                if (!path) {
                    print.error(PREFIX + " You must specify the *path* where you want to save the \"{lang}.json\" files");
                    error = true;
                }
                /**
                 * Error Google Spreadsheet ID
                 */
                if (!path) {
                    print.error(PREFIX + " You must specify the *id* of Google Spreadsheat");
                    error = true;
                }
                if (error) {
                    return [2 /*return*/, null];
                }
                fullPath = filesystem.path(path);
                directoryExists = filesystem.isDirectory(fullPath);
                langsToTranslate = (langs && langs.split(',')) || ['en', 'es'];
                if (directoryExists) {
                    print.info(PREFIX + " Reading from Spreadsheet ID: " + id + " and destination path: " + fullPath);
                    try {
                        index_1.generateJsonFrom(id, fullPath, langsToTranslate, !!verbose, finished);
                    }
                    catch (error) {
                        print.error(PREFIX + " Ups!, we got an error.");
                        print.error(error);
                    }
                }
                else {
                    print.error(PREFIX + " Given path " + fullPath + " doesn't exist");
                }
                return [2 /*return*/];
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29vLXRyYW5zbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy93b28tdHJhbnNsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQTBEQTs7QUF6REEsK0NBQXdEO0FBRXhELElBQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFBO0FBRS9CLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixJQUFJLEVBQUUsZUFBZTtJQUNyQixHQUFHLEVBQUUsVUFBTyxFQU1LO1lBTGYsZ0JBQUssRUFFSCwwQkFBcUMsRUFBMUIsY0FBSSxFQUFFLFVBQUUsRUFBRSxnQkFBSyxFQUFFLG9CQUFPLEVBRXJDLDBCQUFVOzs7O2dCQUVOLEtBQUssR0FBRyxLQUFLLENBQUE7Z0JBQ1gsUUFBUSxHQUFHLFVBQUMsSUFBWTtvQkFDNUIsT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFJLE1BQU0sV0FBTSxJQUFJLHNCQUFtQixDQUFDO2dCQUFsRCxDQUFrRCxDQUFBO2dCQUVwRDs7bUJBRUc7Z0JBQ0gsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxLQUFLLENBQUMsS0FBSyxDQUNOLE1BQU0sa0ZBQTZFLENBQ3ZGLENBQUE7b0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQTtpQkFDYjtnQkFDRDs7bUJBRUc7Z0JBQ0gsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxLQUFLLENBQUMsS0FBSyxDQUFJLE1BQU0scURBQWtELENBQUMsQ0FBQTtvQkFDeEUsS0FBSyxHQUFHLElBQUksQ0FBQTtpQkFDYjtnQkFFRCxJQUFJLEtBQUssRUFBRTtvQkFDVCxzQkFBTyxJQUFJLEVBQUE7aUJBQ1o7Z0JBRUssUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2hDLGVBQWUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNsRCxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBRXBFLElBQUksZUFBZSxFQUFFO29CQUNuQixLQUFLLENBQUMsSUFBSSxDQUNMLE1BQU0sc0NBQWlDLEVBQUUsK0JBQTBCLFFBQVUsQ0FDakYsQ0FBQTtvQkFDRCxJQUFJO3dCQUNGLHdCQUFnQixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtxQkFDdEU7b0JBQUMsT0FBTyxLQUFLLEVBQUU7d0JBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBSSxNQUFNLDRCQUF5QixDQUFDLENBQUE7d0JBQy9DLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQ25CO2lCQUNGO3FCQUFNO29CQUNMLEtBQUssQ0FBQyxLQUFLLENBQUksTUFBTSxvQkFBZSxRQUFRLG1CQUFnQixDQUFDLENBQUE7aUJBQzlEOzs7O0tBQ0Y7Q0FDRixDQUFBIn0=