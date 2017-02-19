class Dom {
    constructor() {
        this.input              = null;
        this.root               = null;
        this.header             = null;
        this.tbody              = null;
        this.buttonNextMonth    = null;
        this.buttonPrevMonth    = null;
        this.buttonNextYear     = null;
        this.buttonPrevYear     = null;

        Object.seal(this);
    }
}

export default Dom;