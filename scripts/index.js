const mapPath = '../map.txt'
const utilities = require('./utilities');
const Node = require('./node');
const aStar = require('./a-star');

let mapString = utilities.generateMapString(mapPath)

let map = utilities.generateMap(mapString);

let startingNode = map[3][0];
// console.log(`${startingNode.xCoord}, ${startingNode.yCoord}, ${startingNode.contents}`);
let endingNode = map[3][3];
// console.log(`${endingNode.xCoord}, ${endingNode.yCoord}`);

let path = aStar.calculatePath(map, startingNode, endingNode);

for (let i = 0; i < path.length; i++) {
    console.log(`${path[i].xCoord}, ${path[i].yCoord}`);
}


// console.log(map[1][5].contents);
