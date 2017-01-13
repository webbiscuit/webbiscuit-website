module.exports = {
  "metalsmith": {
    "metadata": {
      "site": {
        "url": "http://www.webbiscuit.co.uk",
        "github-url": "https://github.com/webbiscuit/webbiscuit-website"
      }
    },
    "config": {
      "source-dir": "./src",
      "layouts-dir": "./layouts",
      "dest-dir": "./build",
      "scripts-dir": "./scripts",
      "assets-dir": "./assets" 
    },
    "plugins": {
      "metalsmith-markdown": {
        "smartypants": true
      },
      "metalsmith-permalinks": {
      },
      "metalsmith-rootpath": {
      },
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-mapsite": {
        "hostname": "http://www.webbiscuit.co.uk"
      }
    }
  }
}
