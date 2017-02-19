class ConfigClassNames {
    constructor() {
        this.block              = 'datepicker';
        this.elementCalendar    = 'calendar';
        this.elementDay         = 'day';
        this.elementWeek        = 'week';
        this.elementMonth       = 'month';
        this.elementHeader      = 'header';
        this.elementMarker      = 'marker';
        this.elementButton      = 'button';
        this.elementButtonGroup = 'button-group';
        this.elementHeading     = 'heading';
        this.modifierActive     = 'active';
        this.modifierToday      = 'today';
        this.modifierSelected   = 'selected';
        this.modifierPadding    = 'padding';
        this.modifierWeekend    = 'weekend';
        this.modifierNextMonth  = 'next-month';
        this.modifierPrevMonth  = 'prev-month';
        this.modifierNextYear   = 'next-year';
        this.modifierPrevYear   = 'prev-year';
        this.delineatorElement  = '_';
        this.delineatorModifier = '__';

        Object.seal(this);
    }
}

export default ConfigClassNames;