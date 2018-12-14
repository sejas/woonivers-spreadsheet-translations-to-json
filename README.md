## Google API Guide

https://developers.google.com/sheets/api/quickstart/nodejs

## RUN

It compiles the src/\*.typescript files and _watch_ for changes in dist.

```
npm start
```

## RUN just once

```
tsc && node ./dist/index.js
```

## What it does?

This project fetchs the data of the [woonivers translation spreadsheet](https://docs.google.com/spreadsheets/d/SOME-SPREADSHEET-ID/edit#gid=0), write the languages into data folder and copy those files into the Woonivers App project.

This folder should be placed in the same parent folder of WooniversApp.
