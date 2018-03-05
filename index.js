const Metalsmith  = require('metalsmith');
const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const permalinks  = require('metalsmith-permalinks');
const rootpath    = require('metalsmith-rootpath');

Metalsmith(__dirname)
  .metadata({
    title: "WebBiscuit Site",
    description: "WebBiscuit website, built with Metalsmith",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(rootpath())
  .use(layouts({
    engine: 'nunjucks'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
