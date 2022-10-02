# Web Biscuit Website

[![Node.js CI](https://github.com/webbiscuit/webbiscuit-website/workflows/Node.js%20CI/badge.svg)](https://github.com/webbiscuit/webbiscuit-website/actions?query=workflow%3A%22Node.js+CI%22)

[![Known Vulnerabilities](https://snyk.io/test/github/webbiscuit/webbiscuit-website/badge.svg)](https://snyk.io/test/github/webbiscuit/webbiscuit-website)

Source for Web Biscuit website.

## Features
- Built using Gatsby
- Content written in markdownx
- Pages templated using react
- yarn used as package manager
- Deploy to AWS
- Github build actions and badges and stuff

## Development

Run `yarn install`. This will install the dependencies and build the 3rd party files.

### Dev server with hot reloading

`yarn run dev`

## Site building
`npm run build`

<!-- ## Bonus Features
The resume that appears on the site can be built into multiple formats using the same .md file:
- HTML
- PDF
- docx

Build all these with `npm run build:cv`

Make sure you have pandoc installed.

You might also need some supporting libraries for pandoc:
- texlive-latex-base
- texlive-fonts-recommended -->


## Things TODO

- Show by tags
- Show by date?
- Preview blog page
- Better home page
- Better cv page
- Articles
- Contact
- Deploy
- Smart Styling?
- Days ago counter for blog
- Alternative to inline images (gatsby-remark-images) - causes "react-dom.development.js:86 Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>."
- Downloadable version of CV
- SEO meta things