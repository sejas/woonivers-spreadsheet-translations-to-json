import { GluegunToolbox } from 'gluegun'
import { generateJsonFrom } from '../core'

const PREFIX = 'WOO-TRANSLATE:'

module.exports = {
  name: 'woo-translate',
  run: async ({
    print,
    parameters: {
      options: { path, id, langs, verbose }
    },
    filesystem
  }: GluegunToolbox) => {
    let error = false
    const finished = (lang: string) =>
      print.info(`${PREFIX} **${lang}** translated ok.`)

    /**
     * Error PATH
     */
    if (!path) {
      print.error(
        `${PREFIX} You must specify the *path* where you want to save the "{lang}.json" files`
      )
      error = true
    }
    /**
     * Error Google Spreadsheet ID
     */
    if (!path) {
      print.error(`${PREFIX} You must specify the *id* of Google Spreadsheat`)
      error = true
    }

    if (error) {
      return null
    }

    const fullPath = filesystem.path(path)
    const directoryExists = filesystem.isDirectory(fullPath)
    const langsToTranslate = (langs && langs.split(',')) || ['en', 'es']

    if (directoryExists) {
      print.info(
        `${PREFIX} Reading from Spreadsheet ID: ${id} and destination path: ${fullPath}`
      )
      try {
        generateJsonFrom(id, fullPath, langsToTranslate, !!verbose, finished)
      } catch (error) {
        print.error(`${PREFIX} Ups!, we got an error.`)
        print.error(error)
      }
    } else {
      print.error(`${PREFIX} Given path ${fullPath} doesn't exist`)
    }
  }
}
