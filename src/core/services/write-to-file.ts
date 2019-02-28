const fs = require("fs")

export const writeToFileGeneric = (method, filename, data, flag = "w") =>
  new Promise((resolve, reject) => {
    const dataToWrite: string =
      "string" !== typeof data ? JSON.stringify(data, null, 2) : data
    fs[method](filename, dataToWrite, { flag }, err => {
      if (err) {
        reject()
        throw err
      }
      // console.log(`The file "${filename}" was saved!`)
      resolve()
    })
  })

export const writeToFile = async (filename, data) => {
  return writeToFileGeneric("writeFile", filename, data)
}

export const appendToFile = async (filename, data, n = 2) => {
  let dataWithEnters = `${data}`
  for (let i = 0; i < n; i++) {
    dataWithEnters += "\n"
  }
  return writeToFileGeneric("appendFile", filename, dataWithEnters)
}
