import {MONTHS} from '../LocaleEn';

class Month {
    constructor() {
        this.weeks                      = [];
        this.dayMarkers                 = [];
        this.monthIndex                 = -1;
        this.year                       = -1;
        this.buttonPrevYearHtml         = '';
        this.buttonPrevMonthHtml        = '';
        this.buttonNextMonthHtml        = '';
        this.buttonNextYearHtml         = '';
        this.weeksHtml                  = '';
        this.legendHtml                 = '';
        this.calendarClassName          = '';
        this.monthClassName             = '';
        this.headerClassName            = '';
        this.headingClassName           = '';
        this.containerClassName         = '';
        this.buttonGroupClassName       = '';
        this.buttonPrevMonthClassName   = '';
        this.buttonNextMonthClassName   = '';
        this.buttonPrevYearClassName    = '';
        this.buttonNextYearClassName    = '';

        Object.seal(this);
    }

    get monthName() {
        return MONTHS[this.monthIndex];
    }
}

export default Month;