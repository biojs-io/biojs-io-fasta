biojs-io-fasta
----------------

[![Build Status](https://travis-ci.org/biojs-io/biojs-io-fasta.svg?branch=master)](https://travis-ci.org/biojs-io/biojs-io-fasta)
[![NPM version](http://img.shields.io/npm/v/biojs-io-fasta.svg)](https://www.npmjs.org/package/biojs-io-fasta)
[![Dependencies](https://david-dm.org/biojs-io/biojs-io-fasta.png)](https://david-dm.org/biojs/biojs-io-fasta)
[![Code Climate](https://codeclimate.com/github/biojs-io/biojs-io-fasta/badges/gpa.svg)](https://codeclimate.com/github/biojs/biojs-io-fasta)
[![NPM downloads](http://img.shields.io/npm/dm/biojs-io-fasta.svg)](https://www.npmjs.org/package/biojs-io-fasta)

```
npm install biojs-io-fasta
```

Use in your browser
-------------------

```
<script src="http://wzrd.in/bundle/biojs-io-fasta@latest"></script>
```

* You can find a [JSBin](http://jsbin.com/vetamigere/edit?js,console) to play around with it.
* Remember that you need [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) to download files from other servers on the web

Methods
------

```
var Fasta = require('biojs-io-fasta');
```

#### `read(url)`

Parses an url an calls your `parse` method with the returned body.

```
Fasta.read("https://raw.githubusercontent.com/biojs-io/biojs-io-fasta/master/test/foo.fasta", function(err, model) {
	// model is the parsed url
});
```
If callback is undefined, `read` returns a promise.

```
var p = Fasta.read("https://raw.githubusercontent.com/biojs-io/biojs-io-fasta/master/test/foo.fasta");
// ...
p.then(function(model) {
	// model is the parsed url
}, function(err){
	console.error("err happened during downloading", err);
});
```

### `parse(str)`

```
var seqs = Fasta.parse(str);
```

### `export(model)`


```
var text = Fasta.export(seqs);
```

### `extend(customParser)`

Thanks to [@sillitoe](https://github.com/sillitoe) you can provide a custom parser
if your FASTA header is formatted "in weird and wonderful ways".

```
var customGetMeta = function(header) {
	return {
      id: "id",
      name: "name",
      // optional
      details: {
		foo: "bar"
      },
      // optional
      ids: {
		customId: "bar"
      }
    };
}
var altFasta = Fasta.extend(customGetMeta);
```

Take a look at [tests](https://github.com/biojs-io/biojs-io-fasta/blob/master/test/fasta.js#L56)
for a better example of such a parser;

Sequence object
---------------

```
{
  seq: "ABC",
  name: "awesome seq",
  id: "unique id"
}
```

Develop
--------

Install dependencies and execute the tests:

```
npm install
npm script compile && npm test
```

To build a JS file for the browser, execute:

```
npm run build-browser
```

License
--------

Apache 2
