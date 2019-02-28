export default class Log {
  debug = false
  constructor(debug: boolean) {
    this.debug = debug
  }
  info = (info: string) => {
    if (this.debug) {
      console.log(info)
    }
  }
}
