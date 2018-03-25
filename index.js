const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const rootpath = require('metalsmith-rootpath');
const assets = require('metalsmith-assets');

Metalsmith(__dirname)
  .metadata({
    title: "WebBiscuit Site",
    description: "WebBiscuit website, built with Metalsmith",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(permalinks())
  .use(rootpath())
  .use(layouts({
    engine: 'nunjucks'
  }))
  .use(assets({
    source: "./assets",
    destination: "./assets"
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
