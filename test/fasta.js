require('coffee-script/register')
var fs = require('fs')

var Fasta = require('../')

require('mocha')
var _ = require("underscore")
var assert = require("assert")
var nock = require('nock')
var request = require("request");

var testUrl = 'http://an.msa.url/foo'

var scope = nock('http://an.msa.url')
.get('/foo')
.replyWithFile(200, __dirname + '/foo.fasta');

suite("Fasta");

test('test parsing of sample fasta file', function(done){
  request(testUrl, function(err,resp,body){
    var seqs = Fasta.parse(body);
    assert.equal(13, seqs.length, "wrong seq number");
    assert.equal(seqs[0].seq.substring(0, 60), "MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN");
    assert.equal(seqs[12].seq, "MKTLLLTLVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPELTPNGKYVYCCRRDKCNQ");
    done();
  });
});

test("test parsing of a file with fs", function(done) {
  fs.readFile(__dirname + '/foo.fasta','utf8', function(err,data){
    if (err) {
      return console.log(err);
    }
    var seqs = Fasta.parse(data);
    var firstseq = seqs[0];
    assert.equal(13, seqs.length, "wrong seq number");
    assert.equal(seqs[0].seq.substring(0, 60), "MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN");
    assert.equal(seqs[12].seq, "MKTLLLTLVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPELTPNGKYVYCCRRDKCNQ");
    done();
  })
});

test("testing a custom getMeta function", function(done) {

  // get meta information from a completely different format
  var data = "\
>database|v1.2|1abcA01 GO=GO:012345,GO:023456;EC=1.2.3.4\n\
MKTLLLTLVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPELTPNGKYVYCCRRDKCN\n\
>database|v1.2|1abcA02\n\
-------LVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPEL----------------\n\
";

  var visit_counter = 0;

  var customGetMeta = function(header) {

    visit_counter++;

    var id, name, details = {}, ids = {};

    var parts = header.split(/\s+/);
    var id_str = parts[0];
    var details_str = parts[1];

    if ( id_str ) {
      var id_parts = id_str.split( '|' );
      db = id_parts[0];
      db_version = id_parts[1];
      id = id_parts[2];
      ids[ db ] = db_version;
      name = id;
    }

    if ( details_str ) {
      var details_parts = details_str.split( ';' );
      details_parts.forEach( function(detail_str) {
        var detail_kv_parts = detail_str.split('=');
        var key = detail_kv_parts[0];
        var values = detail_kv_parts[1].split(',');
        details[ key.toLowerCase() ] = values;
      });
    }

    return {
      id: id,
      name: name,
      details: details,
      ids: ids
    };
  };

  var altFasta = Fasta.extend(customGetMeta);

  var seqs = altFasta.parse(data);
  assert.equal(visit_counter, 2, "visited getMeta wrong number of times" );
  assert.equal(2, seqs.length, "wrong seq number");
  var firstseq = seqs[0];

  assert.equal(firstseq.id, '1abcA01');
  assert.equal(firstseq.seq, 'MKTLLLTLVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPELTPNGKYVYCCRRDKCN');
  assert.deepEqual(firstseq.ids, { database: 'v1.2' } );
  assert.deepEqual(firstseq.details, { go: [ 'GO:012345', 'GO:023456' ], ec: [ '1.2.3.4' ] } );

  done();
})

