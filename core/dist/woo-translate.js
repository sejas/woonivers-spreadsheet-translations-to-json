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
const config_1 = require("./config");
const services_1 = require("./services");
const woo_lang_1 = require("./woo-lang");
const log_1 = require("./log");
/**
 * WooTranslate: it reads rows , and write the WooLang into the right files
 */
class WooTranslate {
    constructor(rows, langKeys, log = new log_1.default(false)) {
        this.rows = [];
        this.pathToSave = `${config_1.PROJECT_PATH}`;
        this.rows = rows;
        this.log = log;
        this.langKeys = langKeys;
        this.wooLangs = new woo_lang_1.default(this.langKeys);
        this.read();
    }
    read() {
        let currentSection = null;
        let index = 1;
        for (const row of this.rows) {
            this.log.info(`Reading ${index} --- ${row}`);
            const key = row[0];
            switch (row.length) {
                case 0:
                    // We've finished
                    this.log.info(`=========================\n-------------------> finished ! at line ${index} =========================\n`);
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
        throw new Error('Please add a blank line to se the end of the spreadsheet');
    }
    toJSON() {
        return this.wooLangs.langs;
    }
    saveToFiles(destinationPath, callback = (lang) => null) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const lang of this.langKeys) {
                const fileName = `${lang}.json`;
                const localFile = `${this.pathToSave}/${fileName}`;
                this.log.info(`Saving ${fileName}`);
                yield services_1.writeToFile(localFile, this.wooLangs.langs[lang]);
                if (destinationPath) {
                    const destinationFile = `${destinationPath}/${fileName}`;
                    fs.copyFile(localFile, destinationFile, err => {
                        if (err)
                            throw err;
                        this.log.info(`- [x] Copied ${localFile} to ${destinationFile}.`);
                        fs.unlink(localFile, err => {
                            if (err)
                                throw err;
                            this.log.info(`- [x] Deleted ${localFile}.`);
                            // TODO: convert to async/await and return the callback after the end of the loop
                            callback(lang);
                        });
                    });
                }
            }
        });
    }
}
exports.default = WooTranslate;
//# sourceMappingURL=woo-translate.js.map