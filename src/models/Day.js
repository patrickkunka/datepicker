class Day {
    constructor() {
        this.dayIndex      = -1;
        this.dayNumber     = -1;
        this.monthNumber   = -1;
        this.isToday       = false;
        this.isPadding     = false;
        this.isSelected    = false;
        this.className     = '';

        Object.seal(this);
    }
}

export default Day;