import fs = require('fs')
import { PROJECT_PATH } from './config'
import { writeToFile } from './services'
import WooLang from './woo-lang'
import Log from './log'

/**
 * WooTranslate: it reads rows , and write the WooLang into the right files
 */
export default class WooTranslate {
  private langKeys: string[] // exmaple: ['en', 'es']
  rows = []
  // The lang keys should be alphebatized
  wooLangs: WooLang
  pathToSave = `${PROJECT_PATH}`
  log: Log

  constructor(rows: string[], langKeys: string[], log = new Log(false)) {
    this.rows = rows
    this.log = log
    this.langKeys = langKeys
    this.wooLangs = new WooLang(this.langKeys)
    this.read()
  }
  private read() {
    let currentSection = null
    let index = 1
    for (const row of this.rows) {
      this.log.info(`Reading ${index} --- ${row}`)
      const key = row[0]
      switch (row.length) {
        case 0:
          // We've finished
          this.log.info(
            `=========================\n-------------------> finished ! at line ${index} =========================\n`
          )
          return
        case 1:
          // create a new section
          currentSection = key
          this.wooLangs.addSection(key)
          break
        default:
          if (row.length < this.langKeys.length) {
            console.warn(`MISSING TRANSLATION at line ${index}`, { row })
          }
          if (currentSection) {
            this.wooLangs.addTrasnlationToSection(currentSection, row)
          } else {
            throw new Error(`Translations without section at line: ${index}`)
          }
          break
      }
      index++
    }
    // This neve sholud be executed
    throw new Error('Please add a blank line to se the end of the spreadsheet')
  }

  toJSON() {
    return this.wooLangs.langs
  }

  async saveToFiles(
    destinationPath?: string,
    callback = (lang: string) => null
  ) {
    for (const lang of this.langKeys) {
      const fileName = `${lang}.json`
      const localFile = `${this.pathToSave}/${fileName}`
      this.log.info(`Saving ${fileName}`)
      await writeToFile(localFile, this.wooLangs.langs[lang])
      if (destinationPath) {
        const destinationFile = `${destinationPath}/${fileName}`
        fs.copyFile(localFile, destinationFile, err => {
          if (err) throw err
          this.log.info(`- [x] Copied ${localFile} to ${destinationFile}.`)
          fs.unlink(localFile, err => {
            if (err) throw err
            this.log.info(`- [x] Deleted ${localFile}.`)
            // TODO: convert to async/await and return the callback after the end of the loop
            callback(lang)
          })
        })
      }
    }
  }
}
