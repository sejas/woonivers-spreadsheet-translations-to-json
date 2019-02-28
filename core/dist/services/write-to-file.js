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
exports.writeToFileGeneric = (method, filename, data, flag = "w") => new Promise((resolve, reject) => {
    const dataToWrite = "string" !== typeof data ? JSON.stringify(data, null, 2) : data;
    fs[method](filename, dataToWrite, { flag }, err => {
        if (err) {
            reject();
            throw err;
        }
        // console.log(`The file "${filename}" was saved!`)
        resolve();
    });
});
exports.writeToFile = (filename, data) => __awaiter(this, void 0, void 0, function* () {
    return exports.writeToFileGeneric("writeFile", filename, data);
});
exports.appendToFile = (filename, data, n = 2) => __awaiter(this, void 0, void 0, function* () {
    let dataWithEnters = `${data}`;
    for (let i = 0; i < n; i++) {
        dataWithEnters += "\n";
    }
    return exports.writeToFileGeneric("appendFile", filename, dataWithEnters);
});
//# sourceMappingURL=write-to-file.js.map