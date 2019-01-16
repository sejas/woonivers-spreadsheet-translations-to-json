## Google API Guide

https://developers.google.com/sheets/api/quickstart/nodejs

## Info

This folder should be in executed in the parent directory of WooniversApp.

You must create manually a `~/.woo`.

## Build

It compiles the src/\*.typescript files and copy the src and dist into WooniversApp/woo-scripts/translate

```
npm run build
```

## RUN

It compiles the src/\*.typescript files and _watch_ for changes in dist.

```
npm start
```

## RUN just once

```
tsc && node ./dist/index.js
```

## RUN just once from WooniversApp directory

```
npm run woo:translate
```

Translate folder should be placed in WooniversApp/woo-scripts/translate

## What it does?

This project fetchs the data of the [woonivers translation spreadsheet](https://docs.google.com/spreadsheets/d/SOME-SPREADSHEET-ID/edit#gid=0), write the languages into data folder and copy those files into the Woonivers App project.
