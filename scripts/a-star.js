const Node = require('./node');

function calculatePath(map, startingNode, endNode) {
    let openList = [];
    let closedList = [];
    let xAdj = [0, 0, -1, 1, -1, -1, 1, 1];
    let yAdj = [-1, 1, 0, 0, -1, 1, -1, 1];

    openList.push(startingNode);

    while(openList.length > 0) {
        let currentNode = openList[0];
        closedList.push(currentNode);
        closedList.sort(comparator);
        openList.shift();

        if(currentNode.xCoord === endNode.xCoord && currentNode.yCoord === endNode.yCoord) {
            console.log('found path');
            let path = [];
            let current = currentNode;

            while(current != null) {
                path.push(current);
                current = current.parent;
            }
            return path.reverse();
        }

        console.log("------------------- GETTING WALKABLES -------------------");

        let childNodes = [];
        for (let i = 0; i < xAdj.length; i++) {
            console.log(`CURRENT NODE NOW ${currentNode.xCoord}, ${currentNode.yCoord}`);
            let nodePosX = currentNode.xCoord + xAdj[i];
            let nodePosY = currentNode.yCoord + yAdj[i];
            
            let temp = map[map.length - 1];

            if(nodePosY > map.length - 1 || nodePosY < 0 || nodePosX > temp.length - 1 || nodePosX < 0) {
                continue
            }

            console.log(`COORDS(${nodePosX}, ${nodePosY}) CONTENTS ${map[nodePosY][nodePosX].contents}`);
            if(map[nodePosY][nodePosX].contents != '0') {
                console.log('HIT A WALL');
                continue
            }

            let child = new Node(currentNode, nodePosX, nodePosY, 0);
            let shouldAdd = false;

            for (let j = 0; j < closedList.length; j++) {
                if(child.xCoord === closedList[j].xCoord && child.yCoord === closedList[j].yCoord) {
                    console.log(`FOUND CHILD INSIDE CLOSED COORDS (${child.xCoord}, ${child.yCoord}), IGNORING IT`);
                    shouldAdd = false;
                    break;
                }
                else {
                    shouldAdd = true;
                }                
            }

            if(shouldAdd) {
                childNodes.push(child);
            }
        }

        console.log("------------------- CHECKING CHILDREN -------------------");
        
        for (let i = 0; i < childNodes.length; i++) {
            for (let j = 0; j < closedList.length; j++) {
                if(childNodes[i].xCoord === closedList[j].xCoord && childNodes[i].yCoord === closedList[j].yCoord) {
                    console.log(`FOUND CHILD INSIDE CLOSED COORDS (${childNodes[i].xCoord}, ${childNodes[i].yCoord}), IGNORING IT`);
                    break;
                }
            }

            childNodes[i].gCost = currentNode.gCost + 1;
            childNodes[i].hCost = (Math.pow((childNodes[i].xCoord - endNode.xCoord), 2)) + (Math.pow((childNodes[i].yCoord - endNode.yCoord), 2));
            childNodes[i].fCost = childNodes[i].gCost + childNodes.hCost;

            for (let j = 0; j < openList.length; j++) {
                if(childNodes[i].xCoord === openList[j].xCoord && childNodes[i].yCoord === openList[j].yCoord && childNodes[i].gCost >= openList[j].gCost) {
                    break;
                }        
            }
    
            openList.push(childNodes[i]);
            openList.sort(comparator);
        }

        console.log("------------------- DONE WITH CHILDREN -------------------");

        console.log(openList);
    }
}

function comparator(a, b) {
    return a.fCost - b.fCost;
}

module.exports = {
    calculatePath
}