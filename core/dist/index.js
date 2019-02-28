"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//tslint:disable
const fs = require("fs");
const googleapis_1 = require("googleapis");
const readline = require("readline");
const config_1 = require("./config");
const woo_translate_1 = require("./woo-translate");
const log_1 = require("./log");
// const spreadsheetId = "SOME-SPREADSHEET-ID"
// const destinationPath = `${PROJECT_PATH}/../../src/i18n`
exports.generateJsonFrom = (spreadsheetId, destinationPath, langKeys, //example: ["en", "es"]
debug = false, callbackGlobal = (lang) => null) => {
    const log = new log_1.default(debug);
    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    // Load client secrets from a local file.
    fs.readFile(config_1.CREDENTIALS_PATH, (err, content) => {
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
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        // Check if we have previously stored a token.
        fs.readFile(config_1.TOKEN_PATH, (err, token) => {
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
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log(`
    This is the first time you execute this command.
    Please, be gentle and go to this URL to generate a new token.
    The token will be saved in this path "~/.woo/woo-token.json".
    CLICK HERE --> : ${authUrl}`);
        console.log(`Authorize this app by visiting this url: ${authUrl}`);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', code => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    return console.log('Error while trying to retrieve access token', err);
                }
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(config_1.TOKEN_PATH, JSON.stringify(token), err => {
                    if (err)
                        console.log(err);
                    log.info(`Token stored to ${config_1.TOKEN_PATH}`);
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
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'translations'
        }, (err, res) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return console.log('--> The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length > 1) {
                try {
                    const wooTranslation = new woo_translate_1.default(rows.slice(1), langKeys, log);
                    // console.log(wooTranslation.toJSON())
                    log.info('saving to files');
                    yield wooTranslation.saveToFiles(destinationPath, callbackGlobal);
                }
                catch (error) {
                    console.log('--> Error catched: ', { error });
                }
            }
            else {
                console.log('No data found.');
            }
        }));
    }
};
//# sourceMappingURL=index.js.map