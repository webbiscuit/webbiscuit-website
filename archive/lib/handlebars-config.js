var HandlebarsLayouts = require('handlebars-layouts');

module.exports = function(Handlebars) {

  Handlebars.registerHelper(HandlebarsLayouts(Handlebars));

};
