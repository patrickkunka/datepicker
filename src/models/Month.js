import {MONTHS} from '../ConstantsEn';

class Month {
    constructor() {
        this.weeks                      = [];
        this.dayMarkers                 = [];
        this.monthIndex                 = -1;
        this.year                       = -1;
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