import { GluegunToolbox } from 'gluegun'
import { generateJsonFrom } from '../../core/dist/index'

module.exports = {
  name: 'woo-translate',
  run: async ({
    print,
    parameters: {
      options: { path, id }
    }
  }: GluegunToolbox) => {
    let error = false
    if (!path) {
      print.error(
        'You must specify the path where you want to save the `${lang}.json` files'
      )
      error = true
    }
    if (!path) {
      print.error('You must specify the *Google Spreadsheat ID*')
      error = true
    }
    if (error) {
      return null
    }
    print.info(generateJsonFrom(id, path))
    // print.info(JSON.stringify({ path, id }))
  }
}
