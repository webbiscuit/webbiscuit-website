# Web Biscuit Website

Source for my static website.

## Features
- Built using metalsmith
- Optimsed using webpack
- Pages written in markdown
- Build tasks written in Gulp
- npm used as package manager
- SemanticUI used as layout framework
- Uses npm express as debug server, with live reloading

## Installation

Run `npm init`. This will install the dependencies and build the 3rd party files.

### Semantic UI

Semantic UI is used for the layout. If you make any changes to the semantic source files, rebuild with `gulp semantic`.

## Site building
`npm run build-dev`

or, for an optimised build, 

`npm run build-prod`

## Run dev server

`npm run serve-dev`

## Bonus Features
The resume that appears on the site can be built into multiple formats using the same .md file:
- HTML
- PDF
- docx

Build all these with `npm build-cv`