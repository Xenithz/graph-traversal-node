const Node = require('./node');
const fs = require('fs');
const path = require("path");

function pythagoras(firstXCoord, firstYCoord, secondXCoord, secondYCoord) {
    let x = firstXCoord - secondXCoord;
    let y = firstYCoord - secondYCoord;
    x = Math.pow(x, 2);
    y = Math.pow(y, 2);
    return Math.sqrt(x + y);
}

function generateMapString(mapPath) {
    let mapString = fs.readFileSync(path.resolve(__dirname, mapPath), 'utf8');
    mapString = mapString.replace(/\s+/g, '');
    return mapString;
}

function generateMap(mapString) {
    let map = [];

    for (let i = 0; i < 4; i++) { 
        let column = [];
        for (let j = 0; j < 4; j++) {
            let node = new Node(null, j, i, mapString[j]);
            column.push(node);           
        }
        mapString = mapString.substring(4);
        map.push(column);
    }

    return map;
}

module.exports = {
    pythagoras,
    generateMapString,
    generateMap
}