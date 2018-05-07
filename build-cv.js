import nodePandoc from 'node-pandoc';

const paths = require('./config/paths');
const src = paths.metalsmithSource + '/resume/index.md';
const dest = paths.cvDestination + '/resume.pdf';

// Arguments can be either a single String or in an Array
const args = '-f markdown -t latex -o ' + dest;
 
// Set your callback function
const callback = (err, result)=> {
  if (err) console.error('Error with pandoc: ',err)
  return console.log(result), result
}
 
// Call pandoc
nodePandoc(src, args, callback);
