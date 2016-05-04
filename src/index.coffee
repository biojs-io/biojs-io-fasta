GenericReader = require "biojs-io-parser"
Fasta = require "./fasta"

module.exports = Fasta

GenericReader.mixin Fasta
