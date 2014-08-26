biojs-io-fasta
----------------

[![Build Status](https://drone.io/github.com/greenify/biojs-io-fasta/status.png)](https://drone.io/github.com/biojs/biojs-io-fasta/latest)
[![NPM version](http://img.shields.io/npm/v/biojs-io-fasta.svg)](https://www.npmjs.org/package/biojs-io-fasta)
[![Dependencies](https://david-dm.org/greenify/biojs-io-fasta.png)](https://david-dm.org/biojs/biojs-io-fasta)
[![Code Climate](https://codeclimate.com/github/greenify/biojs-io-fasta/badges/gpa.svg)](https://codeclimate.com/github/biojs/biojs-io-fasta)
[![NPM downloads](http://img.shields.io/npm/dm/biojs-io-fasta.svg)](https://www.npmjs.org/package/biojs-io-fasta)

```
npm install biojs-io-fasta
```

Use in your browser
-------------------

[Download](https://drone.io/github.com/greenify/biojs-io-fasta/files) a compiled version for browser use.

```
npm run build-browser
```

The namespace is `biojs.io.fasta`.

Parsing
------

```
var Fasta = require('biojs-io-fasta').parse;
```

For browser, replace `Fasta` with `biojs.io.fasta.parse`

### 1. read a url

```
Fasta.read(url, function(seqs) { }
```

`function` is your async callback.

### 2. parse string

```
var seqs = Fasta.parse(str);
```

Writing
------

```
var Fasta = require('biojs-io-fasta').writer;
```

For browser, replace `Fasta` with `biojs.io.fasta.writer`

```
var text = Fasta.export(seqs);
```

Sequence object
---------------

```
this.seq 
this.name 
this.id 
```
