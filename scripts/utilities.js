function pythagoras(firstXCoord, firstYCoord, secondXCoord, secondYCoord) {
    let x = firstXCoord - secondXCoord;
    let y = firstYCoord - secondYCoord;
    x = Math.pow(x, 2);
    y = Math.pow(y, 2);
    return Math.sqrt(x + y);
}

module.exports = {
    pythagoras
}