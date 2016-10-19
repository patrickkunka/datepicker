(function() {
    /* Helpers
    ---------------------------------------------------------------------- */

    var h = {
        template: function(str) {
            var re = /\${([\w]*)}/g;
            var dynamics = {};
            var matches;

            while ((matches = re.exec(str))) {
                dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
            }

            return function(data) {
                var key;
                var output = str;

                for (key in dynamics) {
                    output = output.replace(dynamics[key], data[key] || '');
                }

                return output;
            };
        },

        /**
         * Merges the properties of the source object onto the
         * target object, optionally performing a recusive deep
         * merge. Alters the target object.
         *
         * @private
         * @param   {object}    destination
         * @param   {object}    source
         * @param   {boolean}   [deep]
         * @return  {void}
         */

        extend: function(destination, source, deep) {
            var self        = this,
                sourceKeys  = [],
                key         = '',
                i           = -1;

            if (Array.isArray(source)) {
                for (i = 0; i < source.length; i++) {
                    sourceKeys.push(i);
                }
            } else if (source) {
                sourceKeys = Object.keys(source);
            }

            for (i = 0; i < sourceKeys.length; i++) {
                key = sourceKeys[i];

                if (!deep || typeof source[key] !== 'object') {
                    // All non-object properties, or all properties if shallow extend

                    destination[key] = source[key];
                } else if (Array.isArray(source[key])) {
                    // Arrays

                    if (!destination[key]) {
                        destination[key] = [];
                    }

                    self.extend(destination[key], source[key]);
                } else {
                    // Objects

                    if (!destination[key]) {
                        destination[key] = {};
                    }

                    self.extend(destination[key], source[key]);
                }
            }

            return destination;
        },

        camelCase: function(str) {
            return str.replace(/([_-][a-z])/g, function($1) {
                return $1.toUpperCase().replace(/[_-]/, '');
            });
        },

        closestParent: function(el, selector, includeSelf) {
            var parent = el.parentNode;

            if (includeSelf && el.matches(selector)) {
                return el;
            }

            while (parent && parent !== window.document.body) {
                if (parent.matches && parent.matches(selector)) {
                    return parent;
                } else if (parent.parentNode) {
                    parent = parent.parentNode;
                } else {
                    return null;
                }
            }

            return null;
        }
    };

    var DatePicker = function(input, config) {
        this.state              = null;
        this.history            = [];
        this.refs               = new DatePicker.Dom();
        this.config             = new DatePicker.Config();
        this.calendarHandlers   = [];
        this.isShown            = false;

        h.extend(this.config, config);

        if (input) {
            this.refs.input = input;
        }

        if (this.refs.input) {
            this.bindInputHandlers();
        }

        Object.seal(this);
    };

    /* Instance Methods
    ---------------------------------------------------------------------- */

    Object.assign(DatePicker.prototype, {
        bindInputHandlers: function() {
            this.refs.input.addEventListener('focus', this.handleFocus.bind(this));
        },

        bindCalendarHandlers: function() {
            var eventBinding;
            var handler;
            var fn;
            var el;
            var i;

            for (i = 0; eventBinding = DatePicker.EVENT_BINDINGS[i]; i++) {
                handler = new DatePicker.Handler();

                handler.on = eventBinding.on;

                if (typeof (fn = this[eventBinding.fn]) !== 'function') {
                    throw new Error('No method found with name "' + eventBinding.fn + '"');
                }

                handler.fn = fn.bind(this);

                if (eventBinding.el && !((el = this.refs[eventBinding.el]) instanceof HTMLElement)) {
                    throw new Error('No element reference with name "' + eventBinding.el + '"');
                } else if (!eventBinding.el) {
                    el = window;
                }

                handler.el = el;

                handler.el.addEventListener(handler.on, handler.fn);

                this.calendarHandlers.push(handler);
            }
        },

        unbindCalendarHandlers: function() {
            var handler;

            while ((handler = this.calendarHandlers.pop())) {
                handler.el.removeEventListener(handler.event, handler.fn);
            }
        },

        handleFocus: function() {
            if (this.isShown) return;

            this.build();
        },

        handleWindowClick: function() {
            // if (!this.isShown) return;

            // this.destroy();
        },

        handleHeaderClick: function(e) {
            var button;
            var action;

            e.stopPropagation();

            button = h.closestParent(e.target, '[data-ref~="button"]', true);

            if (!button) return;

            action = button.getAttribute('data-act');

            action = action.toUpperCase().replace(/-/g, '_');

            console.log(action);
        },

        handleTbodyClick: function(e) {
            var cell;
            var month;
            var day;

            e.stopPropagation();

            cell = h.closestParent(e.target, '[data-ref="day"]', true);

            if (!cell) return;

            day   = cell.getAttribute('data-day');
            month = cell.getAttribute('data-month');

            console.log('select:', this.state.year, month, day);
        },

        build: function(date) {
            var self = this;
            var state;
            var data;
            var html;

            if (date) {
                state = self.getStateFromDate(date);
            } else {
                state = self.getStateFromToday();
            }

            data = self.getMonthData(state);

            html = self.render(data);

            return self.show(html)
                .then(function() {
                    self.refs.header = self.refs.root.querySelector('[data-ref="header"]');
                    self.refs.tbody  = self.refs.root.querySelector('[data-ref="tbody"]');

                    self.bindCalendarHandlers();

                    self.state = state;

                    self.isShown = true;
                })
                .catch(function(err) {
                    console.error(err.stack);
                });
        },

        destroy: function() {
            var self = this;

            return self.hide()
                .then(function() {
                    self.refs.root.parentElement.removeChild(self.refs.root);

                    self.unbindCalendarHandlers();

                    self.refs.root                =
                        self.refs.buttonPrevYear  =
                        self.refs.buttonNextYear  =
                        self.refs.buttonPrevMonth =
                        self.refs.buttonNextMonth = null;

                    self.isShown = false;
                })
                .catch(function(err) {
                    console.error(err.stack);
                });
        },

        getStateFromDate: function(inputDate) {
            inputDate;

            // var state = new DatePicker.State();
            // var date  = new Date();

            // // .. parse date into data

            // state.totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
            // state.previousTotalDays = new Date(currentYear, currentMonth, 0).getDate();
            // state.year = currentYear;
            // state.monthIndex = currentMonth;
            // state.today = currentDay;
            // state.startDayIndex = new Date(currentYear, currentMonth, 1).getDay();

            // return state;
        },

        getStateFromToday: function() {
            var state         = new DatePicker.State();
            var date          = new Date();
            var currentYear   = date.getFullYear();
            var currentMonth  = date.getMonth();
            var currentDay    = date.getDate();

            state.totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
            state.previousTotalDays = new Date(currentYear, currentMonth, 0).getDate();
            state.year = currentYear;
            state.monthIndex = currentMonth;
            state.today = currentDay;
            state.startDayIndex = new Date(currentYear, currentMonth, 1).getDay();

            return state;
        },

        getStateFromAction: function(oldState, action) {
            var state   = new DatePicker.State();
            var args    = Array.prototype.slice(arguments, 2);
            var actionFn;

            Object.assign(state, oldState);

            if ((actionFn = typeof DatePicker.ACTIONS[action]) === 'function') {
                actionFn.apply(state, args);
            } else {
                throw new Error('Action "' + action + '" not found');
            }

            return state;
        },

        getMonthData: function(state) {
            var month = new DatePicker.Month();
            var totalWeeks = Math.ceil((state.startDayIndex + state.totalDays) / 7);
            var week;
            var day;
            var marker;
            var classList;
            var currentDayNumber;
            var i;
            var j;
            var zone = 'prev';

            month.monthClassName        = this.getClassName('month');
            month.headerClassName       = this.getClassName('header');
            month.headingClassName      = this.getClassName('heading');
            month.buttonGroupClassName  = this.getClassName('button-group');
            month.containerClassName    = this.config.classNames.block;

            month.buttonPrevMonthClassName = [
                this.getClassName('button'),
                this.getClassName('button', 'prev-month')
            ].join(' ');

            month.buttonNextMonthClassName = [
                this.getClassName('button'),
                this.getClassName('button', 'next-month')
            ].join(' ');

            month.buttonPrevYearClassName = [
                this.getClassName('button'),
                this.getClassName('button', 'prev-year')
            ].join(' ');

            month.buttonNextYearClassName = [
                this.getClassName('button'),
                this.getClassName('button', 'next-year')
            ].join(' ');

            month.monthIndex = state.monthIndex;
            month.year       = state.year;

            currentDayNumber = state.previousTotalDays - (state.startDayIndex - 1);

            for (i = 0; i < totalWeeks; i++) {
                week = new DatePicker.Week();
                week.className = this.getClassName('week');

                for (j = 0; j < 7; j++) {
                    if (i === 0) {
                        classList = [];

                        classList.push(this.getClassName('marker'));

                        if ([0, 6].indexOf(j) > -1) {
                            classList.push(this.getClassName('marker', 'weekend'));
                        }

                        marker = new DatePicker.DayMarker();

                        marker.dayIndex = j;
                        marker.className = classList.join(' ');

                        month.dayMarkers.push(marker);
                    }

                    if (i === 0 && j === state.startDayIndex) {
                        zone = 'self';

                        currentDayNumber = 1;
                    }

                    if (i !== 0 && currentDayNumber > state.totalDays)  {
                        zone = 'next';

                        currentDayNumber = 1;
                    }

                    classList = [];

                    day = new DatePicker.Day();

                    day.dayIndex  = j;
                    day.dayNumber = currentDayNumber;
                    day.isPadding = zone !== 'self';
                    day.isToday   = currentDayNumber === state.today;

                    day.monthNumber = state.monthIndex + 1;

                    if (zone === 'prev') {
                        day.monthNumber--;
                    } else if (zone === 'next') {
                        day.monthNumber++;
                    }

                    classList.push(this.getClassName('day'));

                    if (day.isPadding) {
                        classList.push(this.getClassName('day', 'padding'));
                    }

                    if (day.isToday) {
                        classList.push(this.getClassName('day', 'today'));
                    }

                    if (day.isSelected) {
                        classList.push(this.getClassName('day', 'selected'));
                    }

                    if ([0, 6].indexOf(j) > -1) {
                        classList.push(this.getClassName('day', 'weekend'));
                    }

                    day.className = classList.join(' ');

                    currentDayNumber++;

                    week.days.push(day);
                }

                month.weeks.push(week);
            }

            return month;
        },

        render: function(data) {
            data.legendHtml = data.dayMarkers.map(DatePicker.TEMPLATES.MARKER).join('');
            data.weeksHtml = data.weeks.map(this.renderWeek.bind(this)).join('');

            return DatePicker.TEMPLATES.CONTAINER(data);
        },

        renderWeek: function(data) {
            data.daysHtml = data.days.map(DatePicker.TEMPLATES.DAY).join('');

            return DatePicker.TEMPLATES.WEEK(data);
        },

        getClassName: function(elementName, modifierName) {
            var output = '';
            var block;
            var element;
            var modifier;

            if ((block = this.config.classNames.block)) {
                output += block + this.config.classNames.delineatorElement;
            }

            if ((element = this.config.classNames[h.camelCase('element-' + elementName)])) {
                output += element;
            }

            if (modifierName && (modifier = this.config.classNames[h.camelCase('modifier-' + modifierName)])) {
                output += this.config.classNames.delineatorModifier + modifier;
            }

            return output;
        },

        show: function(html) {
            var temp = document.createElement('div');

            temp.innerHTML = html;

            this.refs.root = temp.firstElementChild;

            this.refs.input.parentElement.insertBefore(this.refs.root, this.refs.input.nextElementSibling);

            console.log(this.refs);

            return Promise.resolve();
        },

        hide: function() {
            this.refs.root.style.opacity = 0;

            return Promise.resolve();
        }
    });

    /* Statics
    ---------------------------------------------------------------------- */

    Object.assign(DatePicker, {
        State: function() {
            this.year               = -1;
            this.monthIndex         = -1;
            this.today              = -1;
            this.selected           = -1;
            this.startDayIndex      = -1;
            this.totalDays          = -1;
            this.previousTotalDays  = -1;

            Object.seal(this);
        },

        Dom: function() {
            this.input              = null;
            this.root               = null;
            this.header             = null;
            this.tbody              = null;
            this.buttonNextMonth    = null;
            this.buttonPrevMonth    = null;
            this.buttonNextYear     = null;
            this.buttonPrevYear     = null;

            Object.seal(this);
        },

        Month: function() {
            this.weeks                      = [];
            this.dayMarkers                 = [];
            this.monthIndex                 = -1;
            this.year                       = -1;
            this.weeksHtml                  = '';
            this.legendHtml                 = '';
            this.monthClassName             = '';
            this.headerClassName            = '';
            this.headingClassName           = '';
            this.containerClassName         = '';
            this.buttonGroupClassName       = '';
            this.buttonPrevMonthClassName   = '';
            this.buttonNextMonthClassName   = '';
            this.buttonPrevYearClassName    = '';
            this.buttonNextYearClassName    = '';

            Object.defineProperties(this, {
                monthName: {
                    get: function() {
                        return DatePicker.MONTHS[this.monthIndex];
                    }
                }
            });

            Object.seal(this);
        },

        Week: function() {
            this.days       = [];
            this.daysHtml   = '';
            this.className  = '';

            Object.seal(this);
        },

        Day: function() {
            this.dayIndex      = -1;
            this.dayNumber     = -1;
            this.monthNumber   = -1;
            this.isToday       = false;
            this.isPadding     = false;
            this.isSelected    = false;
            this.className     = '';

            Object.seal(this);
        },

        DayMarker: function() {
            this.dayIndex   = -1;
            this.className  = '';

            Object.defineProperties(this, {
                dayName: {
                    get: function() {
                        return DatePicker.DAYS[this.dayIndex];
                    }
                },

                dayShortName: {
                    get: function() {
                        return this.dayName.charAt(0);
                    }
                }
            });

            Object.seal(this);
        },

        Config: function() {
            this.classNames = new DatePicker.ConfigClassNames();

            Object.seal(this);
        },

        ConfigClassNames: function() {
            this.block              = 'datepicker';
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
            this.modifierPadding    = 'padding';
            this.modifierWeekend    = 'weekend';
            this.modifierNextMonth  = 'next-month';
            this.modifierPrevMonth  = 'prev-month';
            this.modifierNextYear   = 'next-year';
            this.modifierPrevYear   = 'prev-year';
            this.delineatorElement  = '_';
            this.delineatorModifier = '__';

            Object.seal(this);
        },

        Actions: function() {
            this.GO_TO_NEXT_MONTH = function() {
                if (this.monthIndex === 11) {
                    this.monthIndex = 0;
                    this.year++;
                } else {
                    this.monthIndex++;
                }
            };

            this.GO_TO_PREV_MONTH = function() {
                if (this.monthIndex === 0) {
                    this.monthIndex = 11;
                    this.year--;
                } else {
                    this.monthIndex--;
                }
            };

            this.GO_TO_NEXT_YEAR = function() {
                this.year++;
            };

            this.GO_TO_PREV_YEAR = function() {
                this.year--;
            };

            Object.seal(this);
        },

        Templates: function() {
            this.DAY = h.template('<td class="${className}" data-ref="day" data-month="${monthNumber}" data-day="${dayNumber}">${dayNumber}</td>');
            this.MARKER = h.template('<th class="${className}">${dayShortName}</th>');
            this.WEEK = h.template('<tr class="${className}">${daysHtml}</tr>');
            this.CONTAINER = h.template('<div class="${containerClassName}">' +
                '<header data-ref="header" class="${headerClassName}">' +
                    '<span class="${buttonGroupClassName}">' +
                        '<button class="${buttonPrevYearClassName}" type="button" data-ref="button" data-act="go-to-prev-year"></button> ' +
                        '<button class="${buttonPrevMonthClassName}" type="button" data-ref="button" data-act="go-to-prev-month"></button> ' +
                    '</span> ' +
                    '<span class="${headingClassName}">${monthName} ${year}</span> ' +
                    '<span class="${buttonGroupClassName}">' +
                        '<button class="${buttonNextMonthClassName}" type="button" data-ref="button" data-act="go-to-next-month"></button> ' +
                        '<button class="${buttonNextYearClassName}" type="button" data-ref="button" data-act="go-to-next-year"></button>' +
                    '</span>' +
                '</header>' +
                '<table class="${monthClassName}">' +
                    '<thead>' +
                        '<tr>${legendHtml}</tr>' +
                    '</thead>' +
                '<tbody data-ref="tbody">${weeksHtml}</tbody></table>' +
            '</div>');

            Object.seal(this);
        },

        Handler: function() {
            this.el = null;
            this.on = '';
            this.fn = '';

            Object.seal(this);
        },

        EVENT_BINDINGS: [
            {
                on: 'click',
                fn: 'handleWindowClick'
            },
            {
                el: 'header',
                on: 'click',
                fn: 'handleHeaderClick'
            },
            {
                el: 'tbody',
                on: 'click',
                fn: 'handleTbodyClick'
            }
        ],

        MONTHS: ['January', 'February', 'March', 'April', 'May', 'Jun',
            'July', 'August', 'September', 'October', 'November', 'December'],

        DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    });

    DatePicker.ACTIONS      = new DatePicker.Actions();
    DatePicker.TEMPLATES    = new DatePicker.Templates();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = DatePicker;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return DatePicker;
        });
    } else {
        window.DatePicker = DatePicker;
    }
})(window);