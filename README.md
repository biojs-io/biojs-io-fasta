biojs-io-fasta
----------------

[![Build Status](https://drone.io/github.com/biojs/biojs-io-fasta/status.png)](https://drone.io/github.com/biojs/biojs-io-fasta/latest)

```
npm install biojs-io-fasta
```

Use in your browser
-------------------

[Download](https://drone.io/github.com/biojs/biojs-io-fasta/files) a compiled version for browser use.

```
npm run build-browser
```

The namespace is `biojs.io.fasta`.

How-to
------

### 1. read a url

```
Fasta.read(url, function(seqs) { }
```

`function` is your async callback.

### 2. parse string

```
var seqs = Fasta.parse(str);
```

Sequence object
---------------

```
this.seq 
this.name 
this.id 
```
