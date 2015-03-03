GenericReader = require "biojs-io-parser"
st = require "msa-seqtools"

module.exports =

  parse: (text) ->
    seqs = []

    # catch empty string
    if !text || text.length is 0
      return []

    text = text.split("\n") unless Object::toString.call(text) is '[object Array]'

    for line in text
      # check for header
      if line[0] is ">" or line[0] is ";"

        label = line[1..]
        # extract IDs and push them to the meta dict
        obj = st.getMeta(label)
        label = obj.name

        currentSeq = new st.model("", label, seqs.length)
        currentSeq.ids = obj.ids || {}
        keys = Object.keys currentSeq.ids
        if keys.length > 0
          currentSeq.id = currentSeq.ids[keys[0]]
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

GenericReader.mixin @
