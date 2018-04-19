const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const rootpath = require('metalsmith-rootpath');
const assets = require('metalsmith-assets');
const paths = require('./config/paths');
const fingerprint = require('metalsmith-fingerprint-ignore');
const highlight = require('metalsmith-metallic');

const __PROD__ = process.env.NODE_ENV === 'production'

export default Metalsmith(__dirname)
  .metadata({
    title: "WebBiscuit Site",
    description: "WebBiscuit website, built with Metalsmith",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/",
    rootpath: "/"
  })
  .clean(__PROD__)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(highlight())
  .use(markdown())
  .use(permalinks())
  .use(rootpath())
  .use(assets({
    source: "./dist/assets",
    destination: "./assets"
  }))
  .use(fingerprint({ pattern: 'assets/page.css' }))
  .use(fingerprint({ pattern: 'assets/head.js' }))
  .use(fingerprint({ pattern: 'assets/page.js' }))
  .use(layouts({
    engine: 'nunjucks',
  }))

  