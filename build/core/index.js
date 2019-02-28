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
//tslint:disable
var fs = require("fs");
var googleapis_1 = require("googleapis");
var readline = require("readline");
var config_1 = require("./config");
var woo_translate_1 = require("./woo-translate");
var log_1 = require("./log");
// const spreadsheetId = "SOME-SPREADSHEET-ID"
// const destinationPath = `${PROJECT_PATH}/../../src/i18n`
exports.generateJsonFrom = function (spreadsheetId, destinationPath, langKeys, //example: ["en", "es"]
debug, callbackGlobal) {
    if (debug === void 0) { debug = false; }
    if (callbackGlobal === void 0) { callbackGlobal = function (lang) { return null; }; }
    var log = new log_1.default(debug);
    // If modifying these scopes, delete token.json.
    var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    // Load client secrets from a local file.
    fs.readFile(config_1.CREDENTIALS_PATH, function (err, content) {
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
        fs.readFile(config_1.TOKEN_PATH, function (err, token) {
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
        console.log("\n    This is the first time you execute this command.\n    Please, be gentle and go to this URL to generate a new token.\n    The token will be saved in this path \"~/.woo/woo-token.json\".\n    \n    CLICK HERE -->  " + authUrl);
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
                fs.writeFile(config_1.TOKEN_PATH, JSON.stringify(token), function (err) {
                    if (err)
                        console.log(err);
                    log.info("Token stored to " + config_1.TOKEN_PATH);
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
        var _this = this;
        var sheets = googleapis_1.google.sheets({ version: 'v4', auth: auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'translations'
        }, function (err, res) { return __awaiter(_this, void 0, void 0, function () {
            var rows, wooTranslation, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err)
                            return [2 /*return*/, console.log('--> The API returned an error: ' + err)];
                        rows = res.data.values;
                        if (!(rows.length > 1)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        wooTranslation = new woo_translate_1.default(rows.slice(1), langKeys, log);
                        // console.log(wooTranslation.toJSON())
                        log.info('saving to files');
                        return [4 /*yield*/, wooTranslation.saveToFiles(destinationPath, callbackGlobal)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log('--> Error catched: ', { error: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        console.log('No data found.');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWdCO0FBQ2hCLHVCQUF5QjtBQUN6Qix5Q0FBbUM7QUFDbkMsbUNBQXFDO0FBRXJDLG1DQUF1RDtBQUN2RCxpREFBMEM7QUFDMUMsNkJBQXVCO0FBRXZCLHVFQUF1RTtBQUN2RSwyREFBMkQ7QUFFOUMsUUFBQSxnQkFBZ0IsR0FBRyxVQUM5QixhQUFxQixFQUNyQixlQUF1QixFQUN2QixRQUFrQixFQUFFLHVCQUF1QjtBQUMzQyxLQUFhLEVBQ2IsY0FBdUM7SUFEdkMsc0JBQUEsRUFBQSxhQUFhO0lBQ2IsK0JBQUEsRUFBQSwyQkFBa0IsSUFBWSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUk7SUFFdkMsSUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUIsZ0RBQWdEO0lBQ2hELElBQU0sTUFBTSxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQTtJQUN4RSwwRUFBMEU7SUFDMUUsNEVBQTRFO0lBQzVFLFFBQVE7SUFDUix5Q0FBeUM7SUFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBZ0IsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO1FBQ3pDLElBQUksR0FBRztZQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNyRSx3RUFBd0U7UUFDeEUsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQTtJQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUVGOzs7OztPQUtHO0lBQ0gsU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLFFBQVE7UUFDaEMsSUFBQSwwQkFBbUUs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