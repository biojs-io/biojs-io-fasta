if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
if (typeof biojs.io === 'undefined') {
  module.exports = biojs.io = {}
}
biojs.io.fasta = require('./src/index')
