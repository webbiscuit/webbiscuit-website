module.exports = {
  "metalsmith": {
    "metadata": {
      "site": {
        "url": "https://www.webbiscuit.co.uk",
        "github-url": "https://github.com/webbiscuit/webbiscuit-website"
      }
    },
    "config": {
      "source-dir": "./src",
      "layouts-dir": "./layouts",
      "dest-dir": "./build",
      "scripts-dir": "./scripts",
      "assets-dir": "./sources"      
    },
    "plugins": {
      "metalsmith-markdown": {
      },
      "metalsmith-permalinks": {
      },
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-code-highlight": {}
    }
  }
}
