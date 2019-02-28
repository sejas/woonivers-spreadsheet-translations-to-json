"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
//tslint:disable
var fs = require("fs");
var googleapis_1 = require("googleapis");
var readline = require("readline");
var services_1 = require("./services");
// const spreadsheetId = "SOME-SPREADSHEET-ID"
// const destinationPath = `${PROJECT_PATH}/../../src/i18n`
exports.generateJsonFrom = function (spreadsheetId, destinationPath) {
    return 'FIN';
    var PROJECT_USER_PATH = require('os').homedir() + "/.woo";
    var TOKEN_PATH = PROJECT_USER_PATH + "/woo-token.json";
    var CREDENTIALS_PATH = PROJECT_USER_PATH + "/woo-credentials.json";
    var PROJECT_PATH = __dirname + "/..";
    // If modifying these scopes, delete token.json.
    var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    // Load client secrets from a local file.
    fs.readFile(CREDENTIALS_PATH, function (err, content) {
        if (err)
            return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content.toString()), readSpreadSheeetToTranslate);
    });
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
        var _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
        var oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function (err, token) {
            if (err)
                return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token.toString()));
            callback(oAuth2Client);
        });
    }
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getNewToken(oAuth2Client, callback) {
        var authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function (code) {
            rl.close();
            oAuth2Client.getToken(code, function (err, token) {
                if (err) {
                    return console.log('Error while trying to retrieve access token', err);
                }
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
                    if (err)
                        console.log(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }
    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    function readSpreadSheeetToTranslate(auth) {
        var sheets = googleapis_1.google.sheets({ version: 'v4', auth: auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'translations'
        }, function (err, res) {
            if (err)
                return console.log('--> The API returned an error: ' + err);
            var rows = res.data.values;
            if (rows.length > 1) {
                try {
                    var wooTranslation = new WooTranslate(rows.slice(1));
                    // console.log(wooTranslation.toJSON())
                    console.log('saving to files');
                    wooTranslation.saveToFiles(true);
                }
                catch (error) {
                    console.log('--> Error catched: ', { error: error });
                }
            }
            else {
                console.log('No data found.');
            }
        });
    }
    /**
     * WooLang: it manges the translations
     */
    var WooLang = /** @class */ (function () {
        function WooLang(langsArray) {
            this.langs = {};
            for (var _i = 0, langsArray_1 = langsArray; _i < langsArray_1.length; _i++) {
                var lang = langsArray_1[_i];
                this.addLang(lang);
            }
        }
        Object.defineProperty(WooLang.prototype, "langKeys", {
            get: function () {
                return Object.keys(this.langs);
            },
            enumerable: true,
            configurable: true
        });
        WooLang.prototype.addLang = function (lang) {
            this.langs[lang] = {};
        };
        WooLang.prototype.addSection = function (section) {
            for (var _i = 0, _a = this.langKeys; _i < _a.length; _i++) {
                var lang = _a[_i];
                this.langs[lang][section] = {};
            }
        };
        WooLang.prototype.addTrasnlationToSection = function (section, _a) {
            var key = _a[0], row = _a.slice(1);
            var _b;
            debugger;
            var index = 0;
            for (var _i = 0, _c = this.langKeys; _i < _c.length; _i++) {
                var lang = _c[_i];
                var _d = key.split('.'), firstKey = _d[0], secondKey = _d[1];
                if (secondKey) {
                    this.langs[lang][section][firstKey] = __assign({}, this.langs[lang][section][firstKey], (_b = {}, _b[secondKey] = row[index++], _b));
                }
                else {
                    this.langs[lang][section][firstKey] = row[index++];
                }
            }
        };
        return WooLang;
    }());
    /**
     * WooTranslate: it reads rows , and write the WooLang into the right files
     */
    var WooTranslate = /** @class */ (function () {
        function WooTranslate(rows) {
            this.langKeys = ['en', 'es'];
            this.rows = [];
            // The lang keys should be alphebatized
            this.wooLangs = new WooLang(this.langKeys);
            this.pathToSave = "" + PROJECT_PATH;
            this.rows = rows;
            this.read();
        }
        WooTranslate.prototype.read = function () {
            var currentSection = null;
            var index = 1;
            for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
                var row = _a[_i];
                console.log("Reading " + index + " --- " + row);
                var key = row[0];
                switch (row.length) {
                    case 0:
                        // We've finished
                        console.log("=========================\n-------------------> finished ! at line " + index + " =========================\n");
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
        WooTranslate.prototype.saveToFiles = function (copyToProject) {
            return __awaiter(this, void 0, void 0, function () {
                var _loop_1, this_1, _i, _a, lang;
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
                                            console.log("Saving " + fileName);
                                            return [4 /*yield*/, services_1.writeToFile(localFile, this_1.wooLangs.langs[lang])];
                                        case 1:
                                            _a.sent();
                                            if (copyToProject) {
                                                destinationFile_1 = destinationPath + "/" + fileName;
                                                fs.copyFile(localFile, destinationFile_1, function (err) {
                                                    if (err)
                                                        throw err;
                                                    console.log("- [x] Copied " + localFile + " to " + destinationFile_1 + ".");
                                                    fs.unlink(localFile, function (err) {
                                                        if (err)
                                                            throw err;
                                                        console.log("- [x] Deleted " + localFile + ".");
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQkFBZ0I7QUFDaEIsdUJBQXlCO0FBRXpCLHlDQUFtQztBQUNuQyxtQ0FBcUM7QUFFckMsdUNBQXdDO0FBRXhDLHVFQUF1RTtBQUN2RSwyREFBMkQ7QUFFOUMsUUFBQSxnQkFBZ0IsR0FBRyxVQUM5QixhQUFxQixFQUNyQixlQUF1QjtJQUV2QixPQUFPLEtBQUssQ0FBQTtJQUNaLElBQU0saUJBQWlCLEdBQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFPLENBQUE7SUFDM0QsSUFBTSxVQUFVLEdBQU0saUJBQWlCLG9CQUFpQixDQUFBO0lBQ3hELElBQU0sZ0JBQWdCLEdBQU0saUJBQWlCLDBCQUF1QixDQUFBO0lBQ3BFLElBQU0sWUFBWSxHQUFNLFNBQVMsUUFBSyxDQUFBO0lBRXRDLGdEQUFnRDtJQUNoRCxJQUFNLE1BQU0sR0FBRyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7SUFDeEUsMEVBQTBFO0lBQzFFLDRFQUE0RTtJQUM1RSxRQUFRO0lBQ1IseUNBQXlDO0lBQ3pDLEVBQUUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztRQUN6QyxJQUFJLEdBQUc7WUFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDckUsd0VBQXdFO1FBQ3hFLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLDJCQUEyQixDQUFDLENBQUE7SUFDeEUsQ0FBQyxDQUFDLENBQUE7SUFFRjs7Ozs7T0FLRztJQUNILFNBQVMsU0FBUyxDQUFDLFdBQVcsRUFBRSxR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