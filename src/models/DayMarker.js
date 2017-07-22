import {DAYS} from '../LocaleEn';

class DayMarker {
    constructor() {
        this.dayIndex   = -1;
        this.className  = '';

        Object.seal(this);
    }

    get dayName() {
        return DAYS[this.dayIndex];
    }

    get dayShortName() {
        return this.dayName.charAt(0);
    }
}

export default DayMarker;