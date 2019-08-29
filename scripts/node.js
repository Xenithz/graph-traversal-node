class Node {
    constructor(parent, xCoord, yCoord, contents) {
        this.parent = parent;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.contents = contents;
    }

    setNewCoords(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord
    }
}

module.exports = Node;