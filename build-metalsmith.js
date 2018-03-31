import Debug from 'debug'
import metalsmith from './metalsmith'

const debug = Debug('metalsmith build')

metalsmith.build(function (err) {
  if (err) {
    debug(err)
    throw err
  }
  debug('Metalsmith build finished!')
})
