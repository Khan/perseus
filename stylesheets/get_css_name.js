#!/usr/bin/env node
var fs = require('fs');
var jsonFile = process.argv[2];
var manifest = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
console.log(manifest['shared.css']['hashed-filename-en']);
