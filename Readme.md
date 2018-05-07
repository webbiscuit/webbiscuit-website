# Web Biscuit Website

Source for my website.

Hugely inspired by https://github.com/axe312ger/metalsmith-webpack-suite.

## Features
- Built using metalsmith
- Packed with webpack
- Content written in markdown
- Pages templated using nunjucks
- npm used as package manager
- Flexgrid layout
- Uses browser-sync as debug server, with live reloading

## Development

Run `npm install`. This will install the dependencies and build the 3rd party files.

### Hot reloading

`npm run dev`

### Testing server

`npm run build`

`npm run serve`

## Production

`npm run build:prod`


## Site building
`npm run build`

or, for an optimised build, 

`npm run build-prod`

## Run dev server

`npm run serve`

## Bonus Features
The resume that appears on the site can be built into multiple formats using the same .md file:
- HTML
- PDF
- docx

Build all these with `npm run build:cv`

Make sure you have pandoc installed.

You might also need some supporting libraries for pandoc:
- texlive-latex-base
- texlive-fonts-recommended

## TODO

- Greenkeeper?
- Push to AWS
