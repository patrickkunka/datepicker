class CssTranslate {
    constructor(oldCoordsBefore, newCoordsBefore, oldCoordsAfter, newCoordsAfter) {
        this.newXBefore = newCoordsBefore[0];
        this.newYBefore = newCoordsBefore[1];
        this.oldXBefore = oldCoordsBefore[0];
        this.oldYBefore = oldCoordsBefore[1];
        this.newXAfter  = newCoordsAfter[0];
        this.newYAfter  = newCoordsAfter[1];
        this.oldXAfter  = oldCoordsAfter[0];
        this.oldYAfter  = oldCoordsAfter[1];

        Object.seal(this);
    }
}

export default CssTranslate;