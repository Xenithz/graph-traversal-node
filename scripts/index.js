const fs = require('fs');
const path = require("path");
const mapPath = '../map.txt'

let mapString = fs.readFileSync(path.resolve(__dirname, mapPath), 'utf8');
mapString = mapString.replace(/\s+/g, '');
