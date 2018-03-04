const marked = require('marked')
const renderer = new marked.Renderer()
const headings = []
// Make sure we don't have duplicate headers
renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  const duplicateIndex = headings.map(({ text }) => text).indexOf(escapedText)
  let duplicateText = undefined
  if (duplicateIndex === -1) {
    headings.push({
      text: escapedText,
      count: 0
    })
  } else {
    headings[duplicateIndex].count++
    duplicateText = `${escapedText}-${headings[duplicateIndex].count}`
  }
  return `<h${level} id="${duplicateText || escapedText}">${text}</h${level}>\n`
}

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
        "renderer": renderer,
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
