import State            from './State';
import Config           from './config/Config';
import Dom              from './Dom';
import EventBinding     from './EventBinding';
import Util             from './Util';
import eventsInput      from './eventsInput.json';
import eventsCalendar   from './eventsCalendar.json';
import Templates        from './Templates';
import Actions          from './Actions';

import Month            from './models/Month';
import Day              from './models/Day';
import DayMarker        from './models/DayMarker';
import Week             from './models/Week';

class Datepicker {
    constructor() {
        const _ = new _Datepicker(...arguments);

        this.open       = _.open.bind(_);
        this.close      = _.close.bind(_);
        this.getValue   = _.getValue.bind(_);
        this.setValue   = _.setValue.bind(_);
        this.destroy    = _.destroy.bind(_);

        Object.defineProperties(this, {
            input: {
                get() {
                    return _.dom.input;
                }
            }
        });

        Object.freeze(this);
    }
}

Datepicker.cache = [];

class _Datepicker {
    /**
     * @constructor
     * @param {HTMLInputElement} input
     * @param {object}           [config={}]
     */

    constructor(input, config={}) {
        this.value              = '';
        this.state              = null;
        this.dom                = new Dom();
        this.config             = new Config();
        this.isOpen             = false;
        this.isFocussing        = false;
        this.bindingsInput      = [];
        this.bindingsCalendar   = [];

        Object.seal(this);

        this.init(input, config);
    }

    /* Private Methods
    ---------------------------------------------------------------------- */

    /**
     * @private
     * @return {void}
     */

    init(input, config) {
        if (!(input instanceof HTMLInputElement)) {
            throw new TypeError('[Datepicker] Invalid input element provided');
        }

        if (!config || typeof config !== 'object') {
            throw new TypeError('[Datepicker] Invalid configuration object provided');
        }

        this.dom.input = input;

        this.configure(config);
        this.parseInitialValue();
        this.bindingsInput.push(...this.bindEvents(eventsInput));
    }

    /**
     * @private
     * @param   {object} config
     * @return  {void}
     */

    configure(config) {
        Util.extend(this.config, config, true, _Datepicker.handleConfigureError.bind(this));
    }

    /**
     * @private
     * @return {void}
     */

    parseInitialValue() {
        let value     = '';
        let transform = null;

        if (!(value = this.dom.input.value)) return;

        if (typeof (transform = this.config.transform.input) !== 'function') {
            this.value = value;

            return;
        }

        this.value = transform(value);

        if (!this.value || typeof this.value !== 'string') {
            throw new TypeError('[Datepicker] Transform functions must return a valid string');
        }
    }

    /**
     * @private
     * @param   {Array.<object>} eventsRaw
     * @return  {Array.<EventBinding>}
     */

    bindEvents(eventsRaw) {
        return eventsRaw.map(eventRaw => this.bindEvent(eventRaw));
    }

    /**
     * @private
     * @param   {object} eventRaw
     * @return  {EventBinding}
     */

    bindEvent(eventRaw) {
        const binding = Util.extend(new EventBinding(), eventRaw);

        let fn = null;
        let el = null;

        if (typeof (fn = this[binding.bind]) !== 'function') {
            throw new Error(`No method found with name "${binding.bind}"`);
        }

        binding.fn = fn.bind(this);

        if (binding.el && !((el = this.dom[binding.el]) instanceof HTMLElement)) {
            throw new Error('No element reference with name "' + binding.el + '"');
        } else if (!binding.el) {
            el = window;
        }

        binding.ref = el;

        binding.ref.addEventListener(binding.on, binding.fn);

        return binding;
    }

    /**
     * @private
     * @param   {Array.<EventBinding>} eventBindings
     * @return  {void}
     */

    unbindEvents(eventBindings) {
        while (eventBindings.length) {
            const binding = eventBindings.pop();

            binding.ref.removeEventListener(binding.on, binding.fn);
        }
    }

    /**
     * @private
     * @return {void}
     */

    handleFocus() {
        if (this.isOpen) return;

        this.isFocussing = true;

        setTimeout(() => (this.isFocussing = false), _Datepicker.FOCUS_BLOCK_DURATION);

        this.build();
    }

    /**
     * @private
     * @return {void}
     */

    handleWindowClick() {
        if (!this.isOpen || this.isFocussing) return;

        this.unbuild();
    }

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleHeaderClick(e) {
        const button = Util.closestParent(e.target, '[data-ref~="button"]', true);

        let action = '';

        e.stopPropagation();

        if (!button) return;

        action = button.getAttribute('data-action');

        this.updateState(action);
    }

    /**
     * @param   {MouseEvent} e
     * @return  {void}
     */

    handleTbodyClick(e) {
        const cell = Util.closestParent(e.target, '[data-ref="day"]', true);
        const event = new CustomEvent('change', {
            bubbles: true,
            cancelable: true
        });

        let day         = -1;
        let month       = -1;
        let date        = '';
        let callback    = null;
        let transform   = null;

        e.stopPropagation();

        if (!cell) return;

        day   = parseInt(cell.getAttribute('data-day'));
        month = parseInt(cell.getAttribute('data-month'));

        date = this.state.year + '-' + Util.pad(month) + '-' + Util.pad(day);

        this.value = date;

        if (typeof (transform = this.config.transform.output) === 'function') {
            this.dom.input.value = transform(this.value);
        } else {
            this.dom.input.value = this.value;
        }

        if (!this.dom.input.value) {
            throw new TypeError('[Datepicker] Transform must return a valid string');
        }

        if (typeof (callback = this.config.callbacks.onSelect) === 'function') {
            callback(this.value);
        }

        this.dom.input.dispatchEvent(event);

        if (this.config.behavior.closeOnSelect) {
            this.unbuild();
        } else {
            this.updateState();
        }
    }

    /**
     * @private
     * @param   {string} [action='']
     * @return  {Promise}
     */

    updateState(action='') {
        const state = action ? _Datepicker.getStateFromAction(this.state, action) : _Datepicker.getStateFromDate(this.value);
        const data  = this.getMonthData(state);
        const html  = this.render(data);

        this.state = state;

        return this.updateView(html, action)
            .then(() => {
                let callback = null;

                if (action) {
                    callback = this.config.callbacks.onChangeView;
                }

                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(err => console.error(err));
    }

    /**
     * @private
     * @return {Promise}
     */

    build() {
        const state = this.value ? _Datepicker.getStateFromDate(this.value) : _Datepicker.getStateFromToday();
        const data  = this.getMonthData(state);
        const html  = this.render(data);

        return this.show(html)
            .then(() => {
                let callback = null;

                this.dom.header = this.dom.root.querySelector('[data-ref="header"]');
                this.dom.tbody  = this.dom.root.querySelector('[data-ref="tbody"]');

                this.bindingsCalendar.push(...this.bindEvents(eventsCalendar));

                this.state = state;

                this.isOpen = true;

                if (typeof (callback = this.config.callbacks.onOpen) === 'function') {
                    callback();
                }
            })
            .catch(err => console.error(err));
    }

    /**
     * @private
     * @return {Promise}
     */

    unbuild() {
        return this.hide()
            .then(() => {
                let callback = null;

                if (this.dom.root) {
                    this.dom.root.parentElement.removeChild(this.dom.root);
                }

                this.unbindEvents(this.bindingsCalendar);

                this.dom.root                =
                    this.dom.buttonPrevYear  =
                    this.dom.buttonNextYear  =
                    this.dom.buttonPrevMonth =
                    this.dom.buttonNextMonth = null;

                this.isOpen = false;

                if (typeof (callback = this.config.callbacks.onClose) === 'function') {
                    callback();
                }
            })
            .catch(err => console.error(err));
    }

    /**
     * @private
     * @param   {State} state
     * @return  {Month}
     */

    getMonthData(state) {
        const month = new Month();
        const totalWeeks = Math.ceil((state.startDayIndex + state.totalDays) / 7); // eslint-disable-line no-magic-numbers

        let currentDayNumber = state.previousTotalDays - (state.startDayIndex - 1);
        let zone = 'PREV';

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

        for (let i = 0; i < totalWeeks; i++) {
            const week = new Week();

            week.className = this.getClassName('week');

            for (let j = 0; j < 7; j++) { // eslint-disable-line no-magic-numbers
                const classList = [];
                const day = new Day();

                if (i === 0) {
                    const marker = new DayMarker();

                    classList.push(this.getClassName('marker'));

                    if ([0, 6].indexOf(j) > -1) { // eslint-disable-line no-magic-numbers
                        classList.push(this.getClassName('marker', 'weekend'));
                    }

                    marker.dayIndex = j;
                    marker.className = classList.join(' ');

                    month.dayMarkers.push(marker);
                }

                if (i === 0 && j === state.startDayIndex) {
                    zone = 'SELF';

                    currentDayNumber = 1;
                }

                if (i !== 0 && currentDayNumber > state.totalDays)  {
                    zone = 'NEXT';

                    currentDayNumber = 1;
                }

                day.dayIndex    = j;
                day.dayNumber   = currentDayNumber;
                day.isPadding   = zone !== 'SELF';
                day.isToday     = currentDayNumber === state.today;

                if (
                    currentDayNumber === state.selectedDay &&
                    month.monthIndex === state.selectedMonth &&
                    state.year === state.selectedYear &&
                    zone === 'SELF'
                ) {
                    day.isSelected = true;
                }

                day.monthNumber = state.monthIndex + 1;

                if (zone === 'PREV') {
                    day.monthNumber--;
                } else if (zone === 'NEXT') {
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

                if ([0, 6].indexOf(j) > -1) { // eslint-disable-line no-magic-numbers
                    classList.push(this.getClassName('day', 'weekend'));
                }

                day.className = classList.join(' ');

                currentDayNumber++;

                week.days.push(day);
            }

            month.weeks.push(week);
        }

        return month;
    }

    /**
     * @private
     * @param   {Month} data
     * @return  {string}
     */

    render(data) {
        data.legendHtml = data.dayMarkers.map(Templates.marker).join('');
        data.weeksHtml  = data.weeks.map(this.renderWeek.bind(this)).join('');

        return Templates.container(data);
    }

    /**
     * @private
     * @param   {Week} data
     * @return  {string}
     */

    renderWeek(data) {
        data.daysHtml = data.days.map(Templates.day).join('');

        return Templates.week(data);
    }

    /**
     * @private
     * @param   {string} elementName
     * @param   {string} modifierName
     * @return  {string}
     */

    getClassName(elementName, modifierName) {
        let output   = '';
        let block    = '';
        let element  = '';
        let modifier = '';

        if ((block = this.config.classNames.block)) {
            output += block + this.config.classNames.delineatorElement;
        }

        if ((element = this.config.classNames[Util.camelCase('element-' + elementName)])) {
            output += element;
        }

        if (modifierName && (modifier = this.config.classNames[Util.camelCase('modifier-' + modifierName)])) {
            output += this.config.classNames.delineatorModifier + modifier;
        }

        return output;
    }

    /**
     * @private
     * @param   {string} html
     * @return  {Promise}
     */

    show(html) {
        const temp = document.createElement('div');

        temp.innerHTML = html;

        this.dom.root = temp.firstElementChild;

        this.dom.input.parentElement.insertBefore(this.dom.root, this.dom.input.nextElementSibling);

        return Promise.resolve();
    }

    /**
     * @private
     * @return  {Promise}
     */

    hide() {
        if (this.dom.root) {
            this.dom.root.style.opacity = 0;
        }

        return Promise.resolve();
    }

    /**
     * @private
     * @param {string} html
     * @return {void}
     */

    updateView(html) {
        return Promise.resolve()
            .then(() => {
                const temp = document.createElement('div');

                temp.innerHTML = html;

                this.unbindEvents(this.bindingsCalendar);

                this.dom.root.innerHTML = temp.firstChild.innerHTML;

                this.dom.header = this.dom.root.querySelector('[data-ref="header"]');
                this.dom.tbody  = this.dom.root.querySelector('[data-ref="tbody"]');

                this.bindingsCalendar.push(...this.bindEvents(eventsCalendar));
            });
    }

    /* Static Methods
    ---------------------------------------------------------------------- */

    /**
     * @private
     * @static
     * @param   {string} inputDate
     * @return  {State}
     */

    static getStateFromDate(inputDate) {
        const state = new State();
        const date  = new Date(inputDate);

        state.year          = date.getFullYear();
        state.monthIndex    = date.getMonth();
        state.selectedYear  = state.year;
        state.selectedMonth = state.monthIndex;
        state.selectedDay   = date.getDate();

        return Object.freeze(state);
    }

    /**
     * @private
     * @static
     * @return {State}
     */

    static getStateFromToday() {
        const state = new State();
        const date  = new Date();

        state.year       = date.getFullYear();
        state.monthIndex = date.getMonth();

        return Object.freeze(state);
    }

    /**
     * @private
     * @static
     * @param   {State}   oldState
     * @param   {string}  type
     * @return  {State}
     */

    static getStateFromAction(oldState, type) {
        let fn = null;

        if (typeof (fn = Actions[type]) !== 'function') {
            throw new Error(`Action "${type}" not found`);
        }

        return Object.freeze(fn(oldState));
    }

    /**
     * @private
     * @static
     * @param {Error}   err
     * @param {object}  target
     */

    static handleConfigureError(err, target) {
        const re = /property "?(\w*)"?[,:] object/i;

        let matches         = null;
        let illegalPropName = '';
        let bestMatch       = '';
        let suggestion      = '';

        if (!(err instanceof TypeError) || !(matches = re.exec(err.message))) throw err;

        illegalPropName = matches[1];

        for (let key in target) {
            let i = 0;

            while (i < illegalPropName.length && illegalPropName.charAt(i).toLowerCase() === key.charAt(i).toLowerCase()) {
                i++;
            }

            if (i > bestMatch.length) {
                bestMatch = key;
            }
        }

        if (bestMatch) {
            suggestion = `. Did you mean "${bestMatch}"?`;
        }

        throw new TypeError(`[Datepicker] Invalid configuration property "${illegalPropName}"${suggestion}`);
    }

    /* Public Methods
    ---------------------------------------------------------------------- */

    /**
     * @public
     * @return {Promise}
     */

    open() {
        if (this.isOpen) return Promise.resolve();

        return this.build();
    }

    /**
     * @public
     * @return {Promise}
     */

    close() {
        if (!this.isOpen) return Promise.resolve();

        return this.unbuild();
    }

    /**
     * @public
     * @return {string}
     */

    getValue() {
        let transform = this.config.transform.output;
        let value = '';

        if (typeof transform === 'function') {
            value = transform(this.value);
        } else {
            value = this.value;
        }

        if (!value) {
            throw new TypeError('[Datepicker] Transform must return a valid string');
        }

        return value;
    }

    /**
     * @public
     * @param   {string} value
     * @return  {void}
     */

    setValue(value) {
        let transform = this.config.transform.input;

        if (!value || typeof value !== 'string') {
            throw new TypeError('[Datepicker] Invalid value');
        }

        if (typeof transform !== 'function') {
            this.value = value;

            return;
        }

        this.value = transform(value);

        if (this.isOpen) {
            this.updateState();
        }
    }

    /**
     * @public
     * @return {void}
     */

    destroy() {
        const cacheIndex = Datepicker.cache.indexOf(this);

        if (this.dom.root) {
            this.unbindEvents(this.bindingsCalendar);

            this.dom.root.parentElement.removeChild(this.dom.root);
        }

        this.unbindEvents(this.bindingsInput);

        Datepicker.cache.splice(cacheIndex, 1);
    }
}

_Datepicker.FOCUS_BLOCK_DURATION = 200;

export default Datepicker;