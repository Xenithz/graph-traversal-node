const Node = require('./node');

function calculatePath(map, startingNode, endNode) {
    let openList = [];
    let closedList = [];
    let xAdj = [0, 0, -1, 1, -1, -1, 1, 1];
    let yAdj = [-1, 1, 0, 0, -1, 1, -1, 1];

    openList.push(startingNode);

    while(openList.length > 0) {
        let currentNode = openList[0];
        openList.shift();
        closedList.push(currentNode);
        closedList.sort(comparator);

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

        let childNodes = [];
        for (let i = 0; i < xAdj.length; i++) {
            let nodePosX = currentNode.xCoord + xAdj[i];
            let nodePosY = currentNode.yCoord + yAdj[i];
            
            let temp = map[map.length - 1];

            if(nodePosY > map.length - 1 || nodePosY < 0 || nodePosX > temp.length - 1 || nodePosX < 0) {
                continue
            }

            console.log(`COORDS(${nodePosX}, ${nodePosY}) CONTENTS ${map[nodePosY][nodePosX].contents}`);
            if(map[nodePosY][nodePosX].contents != '0') {
                console.log('hit wall');
                continue
            }

            let child = new Node(currentNode, nodePosX, nodePosY, 0);
            childNodes.push(child);
        }
        
        for (let i = 0; i < childNodes.length; i++) {
            if(closedList.includes(childNodes[i])) {
                continue
            }

            childNodes[i].gCost = currentNode.gCost + 1;
            childNodes[i].hCost = (Math.pow((childNodes[i].xCoord - endNode.xCoord), 2)) + (Math.pow((childNodes[i].yCoord - endNode.yCoord), 2));
            childNodes[i].fCost = childNodes[i].gCost + childNodes.hCost;

            for (let j = 0; j < openList.length; j++) {
                if(childNodes[i] === openList[j] && childNodes[i].gCost > openList[j].gCost) {
                    continue
                }        
            }

            openList.push(childNodes[i]);
            openList.sort(comparator);
        }
    }
}

function comparator(a, b) {
    return a.fCost - b.fCost;
}

module.exports = {
    calculatePath
}