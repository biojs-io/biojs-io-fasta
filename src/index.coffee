GenericReader = require "biojs-io-parser"
st = require "msa-seqtools"

module.exports = Fasta =

  getMeta: st.getMeta
  
  parse: (text) ->
    seqs = []

    # catch empty string
    if !text || text.length is 0
      return []

    text = text.split("\n") unless Object::toString.call(text) is '[object Array]'

    getMeta = this.getMeta

    for line in text
      # check for header
      if line[0] is ">" or line[0] is ";"

        label = line[1..]
        # extract IDs and push them to the meta dict
        obj = getMeta(label)
        label = obj.name
        id = obj.id || seqs.length
        currentSeq = new st.model( "", obj.name, id )
        currentSeq.ids = obj.ids || {}
        currentSeq.details = obj.details || {}
        seqs.push currentSeq
      else
        currentSeq.seq += line
    return seqs

  write: (seqs, access) ->
    text = ""
    for seq in seqs
      seq = access(seq) if access?
      #FASTA header
      text += ">#{seq.name}\n"
      # seq
      text += (st.splitNChars seq.seq, 80).join "\n"

      text += "\n"
    return text

GenericReader.mixin Fasta
