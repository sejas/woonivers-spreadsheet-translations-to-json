/**
 * WooLang: it manges the translations
 */
export default class WooLang {
  langs = {}
  constructor(langsArray?: string[]) {
    for (const lang of langsArray) {
      this.addLang(lang)
    }
  }
  get langKeys() {
    return Object.keys(this.langs)
  }
  addLang(lang) {
    this.langs[lang] = {}
  }
  addSection(section: string) {
    for (const lang of this.langKeys) {
      this.langs[lang][section] = {}
    }
  }
  addTrasnlationToSection(section: string, [key, ...row]: string[]) {
    debugger
    let index = 0
    for (const lang of this.langKeys) {
      const [firstKey, secondKey] = key.split('.')
      if (secondKey) {
        this.langs[lang][section][firstKey] = {
          ...this.langs[lang][section][firstKey],
          [secondKey]: row[index++]
        }
      } else {
        this.langs[lang][section][firstKey] = row[index++]
      }
    }
  }
}
