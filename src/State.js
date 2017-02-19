class State {
    constructor() {
        this.year               = -1;
        this.monthIndex         = -1;
        this.selectedDay        = -1;
        this.selectedMonth      = -1;
        this.selectedYear       = -1;

        Object.seal(this);
    }

    get totalDays() {
        return new Date(this.year, this.monthIndex + 1, 0).getDate();
    }

    get previousTotalDays() {
        return new Date(this.year, this.monthIndex, 0).getDate();
    }

    get startDayIndex() {
        return new Date(this.year, this.monthIndex, 1).getDay();
    }

    get today() {
        const date = new Date();

        if (this.monthIndex === date.getMonth() && this.year === date.getFullYear()) {
            return date.getDate();
        }

        return -1;
    }
}

export default State;