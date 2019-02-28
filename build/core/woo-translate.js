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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var config_1 = require("./config");
var services_1 = require("./services");
var woo_lang_1 = require("./woo-lang");
var log_1 = require("./log");
/**
 * WooTranslate: it reads rows , and write the WooLang into the right files
 */
var WooTranslate = /** @class */ (function () {
    function WooTranslate(rows, langKeys, log) {
        if (log === void 0) { log = new log_1.default(false); }
        this.rows = [];
        this.pathToSave = "" + config_1.PROJECT_PATH;
        this.rows = rows;
        this.log = log;
        this.langKeys = langKeys;
        this.wooLangs = new woo_lang_1.default(this.langKeys);
        this.read();
    }
    WooTranslate.prototype.read = function () {
        var currentSection = null;
        var index = 1;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            this.log.info("Reading " + index + " --- " + row);
            var key = row[0];
            switch (row.length) {
                case 0:
                    // We've finished
                    this.log.info("=========================\n-------------------> finished ! at line " + index + " =========================\n");
                    return;
                case 1:
                    // create a new section
                    currentSection = key;
                    this.wooLangs.addSection(key);
                    break;
                default:
                    if (row.length < this.langKeys.length) {
                        console.warn("MISSING TRANSLATION at line " + index, { row: row });
                    }
                    if (currentSection) {
                        this.wooLangs.addTrasnlationToSection(currentSection, row);
                    }
                    else {
                        throw new Error("Translations without section at line: " + index);
                    }
                    break;
            }
            index++;
        }
        // This neve sholud be executed
        throw new Error('Please add a blank line to se the end of the spreadsheet');
    };
    WooTranslate.prototype.toJSON = function () {
        return this.wooLangs.langs;
    };
    WooTranslate.prototype.saveToFiles = function (destinationPath, callback) {
        if (callback === void 0) { callback = function (lang) { return null; }; }
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, lang;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (lang) {
                            var fileName, localFile, destinationFile_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileName = lang + ".json";
                                        localFile = this_1.pathToSave + "/" + fileName;
                                        this_1.log.info("Saving " + fileName);
                                        return [4 /*yield*/, services_1.writeToFile(localFile, this_1.wooLangs.langs[lang])];
                                    case 1:
                                        _a.sent();
                                        if (destinationPath) {
                                            destinationFile_1 = destinationPath + "/" + fileName;
                                            fs.copyFile(localFile, destinationFile_1, function (err) {
                                                if (err)
                                                    throw err;
                                                _this.log.info("- [x] Copied " + localFile + " to " + destinationFile_1 + ".");
                                                fs.unlink(localFile, function (err) {
                                                    if (err)
                                                        throw err;
                                                    _this.log.info("- [x] Deleted " + localFile + ".");
                                                    // TODO: convert to async/await and return the callback after the end of the loop
                                                    callback(lang);
                                                });
                                            });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.langKeys;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        lang = _a[_i];
                        return [5 /*yield**/, _loop_1(lang)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return WooTranslate;
}());
exports.default = WooTranslate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29vLXRyYW5zbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3dvby10cmFuc2xhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUF5QjtBQUN6QixtQ0FBdUM7QUFDdkMsdUNBQXdDO0FBQ3hDLHVDQUFnQztBQUNoQyw2QkFBdUI7QUFFdkI7O0dBRUc7QUFDSDtJQVFFLHNCQUFZLElBQWMsRUFBRSxRQUFrQixFQUFFLEdBQW9CO1FBQXBCLG9CQUFBLEVBQUEsVUFBVSxhQUFHLENBQUMsS0FBSyxDQUFDO1FBTnBFLFNBQUksR0FBRyxFQUFFLENBQUE7UUFHVCxlQUFVLEdBQUcsS0FBRyxxQkFBYyxDQUFBO1FBSTVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFDTywyQkFBSSxHQUFaO1FBQ0UsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLEtBQWtCLFVBQVMsRUFBVCxLQUFBLElBQUksQ0FBQyxJQUFJLEVBQVQsY0FBUyxFQUFULElBQVMsRUFBRTtZQUF4QixJQUFNLEdBQUcsU0FBQTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQVcsS0FBSyxhQUFRLEdBQUssQ0FBQyxDQUFBO1lBQzVDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQixRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7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