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
const fs = require("fs");
const readline = require("readline");
const googleapis_1 = require("googleapis");
const services_1 = require("./services");
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";
const spreadsheetId = "SOME-SPREADSHEET-ID";
// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
    if (err)
        return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), readSpreadSheeetToTranslate);
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
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err)
            return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
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
        access_type: "offline",
        scope: SCOPES
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter the code from that page here: ", code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error("Error while trying to retrieve access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err)
                    console.error(err);
                console.log("Token stored to", TOKEN_PATH);
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
    const sheets = googleapis_1.google.sheets({ version: "v4", auth });
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "translations"
    }, (err, res) => {
        if (err)
            return console.log("--> The API returned an error: " + err);
        const rows = res.data.values;
        if (rows.length > 1) {
            try {
                const wooTranslation = new WooTranslate(rows.slice(1));
                // console.log(wooTranslation.toJSON())
                console.log("saving to files");
                wooTranslation.saveToFiles(true);
            }
            catch (error) {
                console.log("--> Error catched: ", { error });
            }
        }
        else {
            console.log("No data found.");
        }
    });
}
/**
 * arrayTojson
 */
class WooLang {
    constructor(langsArray) {
        this.langs = {};
        for (const lang of langsArray) {
            this.addLang(lang);
        }
    }
    get langKeys() {
        return Object.keys(this.langs);
    }
    addLang(lang) {
        this.langs[lang] = {};
    }
    addSection(section) {
        for (const lang of this.langKeys) {
            this.langs[lang][section] = {};
        }
    }
    addTrasnlationToSection(section, [key, ...row]) {
        debugger;
        let index = 0;
        for (const lang of this.langKeys) {
            const [firstKey, secondKey] = key.split(".");
            if (secondKey) {
                this.langs[lang][section][firstKey] = Object.assign({}, this.langs[lang][section][firstKey], { [secondKey]: row[index++] });
            }
            else {
                this.langs[lang][section][firstKey] = row[index++];
            }
        }
    }
}
class WooTranslate {
    constructor(rows) {
        this.langKeys = ["en", "es"];
        this.rows = [];
        // The lang keys should be alphebatized
        this.wooLangs = new WooLang(this.langKeys);
        this.pathToSave = "./data";
        this.rows = rows;
        this.read();
    }
    read() {
        let currentSection = null;
        let index = 1;
        for (const row of this.rows) {
            console.log(`Reading ${index} --- ${row}`);
            const key = row[0];
            switch (row.length) {
                case 0:
                    // We've finished
                    console.log(`=========================\n-------------------> finished ! at line ${index} =========================\n`);
                    return;
                case 1:
                    // create a new section
                    currentSection = key;
                    this.wooLangs.addSection(key);
                    break;
                default:
                    if (row.length < this.langKeys.length) {
                        console.warn(`MISSING TRANSLATION at line ${index}`, { row });
                    }
                    if (currentSection) {
                        this.wooLangs.addTrasnlationToSection(currentSection, row);
                    }
                    else {
                        throw new Error(`Translations without section at line: ${index}`);
                    }
                    break;
            }
            index++;
        }
        // This neve sholud be executed
        throw new Error("Please add a blank line to se the end of the spreadsheet");
    }
    toJSON() {
        return this.wooLangs.langs;
    }
    saveToFiles(copyToProject) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const lang of this.langKeys) {
                const fileName = `${lang}.json`;
                const localFile = `${this.pathToSave}/${fileName}`;
                console.log(`Saving ${fileName}`);
                yield services_1.writeToFile(localFile, this.wooLangs.langs[lang]);
                if (copyToProject) {
                    const destinationFile = `../WooniversApp/src/i18n/${fileName}`;
                    fs.copyFile(localFile, destinationFile, err => {
                        if (err)
                            throw err;
                        console.log(`- [x] Copied ${localFile} to ${destinationFile}.`);
                    });
                }
            }
        });
    }
}
//# sourceMappingURL=index.js.map