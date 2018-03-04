# Web Biscuit Website

Source for my static website.

## Features
- Built using metalsmith
- Optimsed using webpack
- Pages written in markdown
- Build tasks written in Gulp
- npm used as package manager
- SemanticUI used as layout framework
- Uses live-server as debug server, with live reloading

## Pre-reqs

`npm install -g live-server`

## Installation

Run `npm install`. This will install the dependencies and build the 3rd party files.

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