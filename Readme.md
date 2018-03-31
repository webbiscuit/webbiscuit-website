# Web Biscuit Website

Source for my static website.

TODO
CSS/SCSS
JS stuff
JS fingerprints
Layout (semantic/bootstrap)
CV
Linting (css, js, html)

## Features
- Built using metalsmith
- Packed with webpack
- Content written in markdown
- Pages templated in nunjucks
- npm used as package manager
- SemanticUI used as layout framework *
- Uses live-server as debug server, with live reloading

## Pre-reqs

`npm install -g live-server`

## Development

Run `npm install`. This will install the dependencies and build the 3rd party files.

### Hot reloading

`npm run dev`

### Testing server

`npm run build`

`npm run serve`

## Production

`npm run build:prod`


### Semantic UI

Semantic UI is used for the layout. If you make any changes to the semantic source files, rebuild with `gulp semantic`.

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

Build all these with `gulp build-cv`