"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * WooLang: it manges the translations
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
            const [firstKey, secondKey] = key.split('.');
            if (secondKey) {
                this.langs[lang][section][firstKey] = Object.assign({}, this.langs[lang][section][firstKey], { [secondKey]: row[index++] });
            }
            else {
                this.langs[lang][section][firstKey] = row[index++];
            }
        }
    }
}
exports.default = WooLang;
//# sourceMappingURL=woo-lang.js.map