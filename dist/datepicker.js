(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["datepicker"] = factory();
	else
		root["datepicker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Facade = __webpack_require__(23);
	
	var _Facade2 = _interopRequireDefault(_Facade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @param {(HTMLInputElement|string)}   input
	 * @param {object}                      [config={}]
	 */
	
	function factory(input) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var instance = null;
	
	    if (typeof input === 'string') {
	        input = document.querySelector(input);
	    }
	
	    for (var i = 0; instance = _Facade2.default.cache[i]; i++) {
	        if (instance.input === input) return instance;
	    }
	
	    instance = new _Facade2.default(input, config);
	
	    _Facade2.default.cache.push(instance);
	
	    return instance;
	}
	
	module.exports = factory;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Actions = __webpack_require__(15);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _ConfigRoot = __webpack_require__(24);
	
	var _ConfigRoot2 = _interopRequireDefault(_ConfigRoot);
	
	var _CssTranslates = __webpack_require__(16);
	
	var _CssTranslates2 = _interopRequireDefault(_CssTranslates);
	
	var _Dom = __webpack_require__(9);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _EventBinding = __webpack_require__(10);
	
	var _EventBinding2 = _interopRequireDefault(_EventBinding);
	
	var _eventsInput = __webpack_require__(12);
	
	var _eventsInput2 = _interopRequireDefault(_eventsInput);
	
	var _eventsCalendar = __webpack_require__(13);
	
	var _eventsCalendar2 = _interopRequireDefault(_eventsCalendar);
	
	var _State = __webpack_require__(2);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _Templates = __webpack_require__(14);
	
	var _Templates2 = _interopRequireDefault(_Templates);
	
	var _Util = __webpack_require__(11);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _Month = __webpack_require__(18);
	
	var _Month2 = _interopRequireDefault(_Month);
	
	var _Day = __webpack_require__(20);
	
	var _Day2 = _interopRequireDefault(_Day);
	
	var _DayMarker = __webpack_require__(21);
	
	var _DayMarker2 = _interopRequireDefault(_DayMarker);
	
	var _Week = __webpack_require__(22);
	
	var _Week2 = _interopRequireDefault(_Week);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Datepicker = function () {
	    /**
	     * @constructor
	     * @param {HTMLInputElement} input
	     * @param {object}           [config={}]
	     */
	
	    function Datepicker(input) {
	        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        _classCallCheck(this, Datepicker);
	
	        this.value = '';
	        this.state = null;
	        this.dom = new _Dom2.default();
	        this.config = new _ConfigRoot2.default();
	        this.isOpen = false;
	        this.isFocussing = false;
	        this.isTransitioning = false;
	        this.bindingsInput = [];
	        this.bindingsCalendar = [];
	
	        Object.seal(this);
	
	        this.init(input, config);
	    }
	
	    /* Private Methods
	    ---------------------------------------------------------------------- */
	
	    /**
	     * @private
	     * @return {void}
	     */
	
	    _createClass(Datepicker, [{
	        key: 'init',
	        value: function init(input, config) {
	            var _bindingsInput;
	
	            if (!(input instanceof HTMLInputElement)) {
	                throw new TypeError('[Datepicker] Invalid input element provided');
	            }
	
	            if (!config || (typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
	                throw new TypeError('[Datepicker] Invalid configuration object provided');
	            }
	
	            this.dom.input = input;
	
	            this.configure(config);
	            this.parseInitialValue();
	            (_bindingsInput = this.bindingsInput).push.apply(_bindingsInput, _toConsumableArray(this.bindEvents(_eventsInput2.default)));
	        }
	
	        /**
	         * @private
	         * @param   {object} config
	         * @return  {void}
	         */
	
	    }, {
	        key: 'configure',
	        value: function configure(config) {
	            _Util2.default.extend(this.config, config, true, Datepicker.handleConfigureError.bind(this));
	        }
	
	        /**
	         * @private
	         * @return {void}
	         */
	
	    }, {
	        key: 'parseInitialValue',
	        value: function parseInitialValue() {
	            var value = '';
	            var transform = null;
	
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
	
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents(eventsRaw) {
	            var _this = this;
	
	            return eventsRaw.map(function (eventRaw) {
	                return _this.bindEvent(eventRaw);
	            });
	        }
	
	        /**
	         * @private
	         * @param   {object} eventRaw
	         * @return  {EventBinding}
	         */
	
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent(eventRaw) {
	            var binding = _Util2.default.extend(new _EventBinding2.default(), eventRaw);
	
	            var fn = null;
	            var el = null;
	
	            if (typeof (fn = this[binding.bind]) !== 'function') {
	                throw new Error('No method found with name "' + binding.bind + '"');
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
	
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents(eventBindings) {
	            while (eventBindings.length) {
	                var binding = eventBindings.pop();
	
	                binding.ref.removeEventListener(binding.on, binding.fn);
	            }
	        }
	
	        /**
	         * @private
	         * @return {void}
	         */
	
	    }, {
	        key: 'handleFocus',
	        value: function handleFocus() {
	            var _this2 = this;
	
	            if (this.isOpen) return;
	
	            this.isFocussing = true;
	
	            setTimeout(function () {
	                return _this2.isFocussing = false;
	            }, Datepicker.FOCUS_BLOCK_DURATION);
	
	            this.build();
	        }
	
	        /**
	         * @private
	         * @return {void}
	         */
	
	    }, {
	        key: 'handleWindowClick',
	        value: function handleWindowClick() {
	            if (!this.isOpen || this.isFocussing) return;
	
	            this.unbuild();
	        }
	
	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleHeaderClick',
	        value: function handleHeaderClick(e) {
	            var button = _Util2.default.closestParent(e.target, '[data-ref~="button"]', true);
	
	            var action = '';
	
	            e.stopPropagation();
	
	            if (!button || this.isTransitioning) return;
	
	            action = button.getAttribute('data-action');
	
	            this.updateState(action);
	        }
	
	        /**
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleTbodyClick',
	        value: function handleTbodyClick(e) {
	            var _this3 = this;
	
	            var cell = _Util2.default.closestParent(e.target, '[data-ref="day"]', true);
	            var eventConfig = { bubbles: true };
	            var toEmit = [new Event('input', eventConfig), new Event('change', eventConfig)];
	
	            var day = -1;
	            var month = -1;
	            var date = '';
	            var callback = null;
	            var transform = null;
	
	            e.stopPropagation();
	
	            if (!cell) return;
	
	            day = parseInt(cell.getAttribute('data-day'));
	            month = parseInt(cell.getAttribute('data-month'));
	
	            date = this.state.year + '-' + _Util2.default.pad(month) + '-' + _Util2.default.pad(day);
	
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
	
	            toEmit.forEach(function (e) {
	                return _this3.dom.input.dispatchEvent(e);
	            });
	
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
	
	    }, {
	        key: 'updateState',
	        value: function updateState() {
	            var _this4 = this;
	
	            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	            var state = action ? Datepicker.getStateFromAction(this.state, action) : Datepicker.getStateFromDate(this.value);
	            var data = this.getMonthData(state);
	            var html = this.render(data);
	
	            this.state = state;
	
	            return this.updateView(html, action).then(function () {
	                var callback = null;
	
	                if (action) {
	                    callback = _this4.config.callbacks.onChangeView;
	                }
	
	                if (typeof callback === 'function') {
	                    callback();
	                }
	            }).catch(function (err) {
	                return console.error(err);
	            });
	        }
	
	        /**
	         * @private
	         * @return {Promise}
	         */
	
	    }, {
	        key: 'build',
	        value: function build() {
	            var _this5 = this;
	
	            var state = this.value ? Datepicker.getStateFromDate(this.value) : Datepicker.getStateFromToday();
	            var data = this.getMonthData(state);
	            var html = this.render(data);
	
	            return this.show(html).then(function () {
	                var _bindingsCalendar;
	
	                var callback = null;
	
	                _this5.cacheCalendarDom();
	
	                (_bindingsCalendar = _this5.bindingsCalendar).push.apply(_bindingsCalendar, _toConsumableArray(_this5.bindEvents(_eventsCalendar2.default)));
	
	                _this5.state = state;
	
	                _this5.isOpen = true;
	
	                if (typeof (callback = _this5.config.callbacks.onOpen) === 'function') {
	                    callback();
	                }
	            }).catch(function (err) {
	                return console.error(err);
	            });
	        }
	
	        /**
	         * @private
	         * @return {void}
	         */
	
	    }, {
	        key: 'cacheCalendarDom',
	        value: function cacheCalendarDom() {
	            this.dom.header = this.dom.root.querySelector('[data-ref="header"]');
	            this.dom.calendar = this.dom.root.querySelector('[data-ref="calendar"]');
	            this.dom.month = this.dom.root.querySelector('[data-ref="month"]');
	            this.dom.tbody = this.dom.root.querySelector('[data-ref="tbody"]');
	        }
	
	        /**
	         * @private
	         * @return {Promise}
	         */
	
	    }, {
	        key: 'unbuild',
	        value: function unbuild() {
	            var _this6 = this;
	
	            return this.hide().then(function () {
	                var callback = null;
	
	                if (_this6.dom.root) {
	                    _this6.dom.root.parentElement.removeChild(_this6.dom.root);
	                }
	
	                _this6.unbindEvents(_this6.bindingsCalendar);
	
	                _this6.dom.root = _this6.dom.buttonPrevYear = _this6.dom.buttonNextYear = _this6.dom.buttonPrevMonth = _this6.dom.buttonNextMonth = null;
	
	                _this6.isOpen = false;
	
	                if (typeof (callback = _this6.config.callbacks.onClose) === 'function') {
	                    callback();
	                }
	            }).catch(function (err) {
	                return console.error(err);
	            });
	        }
	
	        /**
	         * @private
	         * @param   {State} state
	         * @return  {Month}
	         */
	
	    }, {
	        key: 'getMonthData',
	        value: function getMonthData(state) {
	            var month = new _Month2.default();
	            var totalWeeks = Math.ceil((state.startDayIndex + state.totalDays) / 7); // eslint-disable-line no-magic-numbers
	
	            var currentDayNumber = state.previousTotalDays - (state.startDayIndex - 1);
	            var zone = 'PREV';
	
	            month.calendarClassName = this.getClassName('calendar');
	            month.monthClassName = this.getClassName('month');
	            month.headerClassName = this.getClassName('header');
	            month.headingClassName = this.getClassName('heading');
	            month.buttonGroupClassName = this.getClassName('button-group');
	            month.containerClassName = this.config.classNames.block;
	
	            month.buttonPrevMonthClassName = [this.getClassName('button'), this.getClassName('button', 'prev-month')].join(' ');
	
	            month.buttonNextMonthClassName = [this.getClassName('button'), this.getClassName('button', 'next-month')].join(' ');
	
	            month.buttonPrevYearClassName = [this.getClassName('button'), this.getClassName('button', 'prev-year')].join(' ');
	
	            month.buttonNextYearClassName = [this.getClassName('button'), this.getClassName('button', 'next-year')].join(' ');
	
	            month.monthIndex = state.monthIndex;
	            month.year = state.year;
	
	            for (var i = 0; i < totalWeeks; i++) {
	                var week = new _Week2.default();
	
	                week.className = this.getClassName('week');
	
	                for (var j = 0; j < 7; j++) {
	                    // eslint-disable-line no-magic-numbers
	                    var classList = [];
	                    var day = new _Day2.default();
	
	                    if (i === 0) {
	                        var marker = new _DayMarker2.default();
	
	                        classList.push(this.getClassName('marker'));
	
	                        if ([0, 6].indexOf(j) > -1) {
	                            // eslint-disable-line no-magic-numbers
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
	
	                    if (i !== 0 && currentDayNumber > state.totalDays) {
	                        zone = 'NEXT';
	
	                        currentDayNumber = 1;
	                    }
	
	                    day.dayIndex = j;
	                    day.dayNumber = currentDayNumber;
	                    day.isPadding = zone !== 'SELF';
	                    day.isToday = currentDayNumber === state.today;
	
	                    if (currentDayNumber === state.selectedDay && month.monthIndex === state.selectedMonth && state.year === state.selectedYear && zone === 'SELF') {
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
	
	                    if ([0, 6].indexOf(j) > -1) {
	                        // eslint-disable-line no-magic-numbers
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
	
	    }, {
	        key: 'render',
	        value: function render(data) {
	            data.legendHtml = data.dayMarkers.map(_Templates2.default.marker).join('');
	            data.weeksHtml = data.weeks.map(this.renderWeek.bind(this)).join('');
	
	            return _Templates2.default.container(data);
	        }
	
	        /**
	         * @private
	         * @param   {Week} data
	         * @return  {string}
	         */
	
	    }, {
	        key: 'renderWeek',
	        value: function renderWeek(data) {
	            data.daysHtml = data.days.map(_Templates2.default.day).join('');
	
	            return _Templates2.default.week(data);
	        }
	
	        /**
	         * @private
	         * @param   {string} elementName
	         * @param   {string} modifierName
	         * @return  {string}
	         */
	
	    }, {
	        key: 'getClassName',
	        value: function getClassName(elementName, modifierName) {
	            var output = '';
	            var block = '';
	            var element = '';
	            var modifier = '';
	
	            if (block = this.config.classNames.block) {
	                output += block + this.config.classNames.delineatorElement;
	            }
	
	            if (element = this.config.classNames[_Util2.default.camelCase('element-' + elementName)]) {
	                output += element;
	            }
	
	            if (modifierName && (modifier = this.config.classNames[_Util2.default.camelCase('modifier-' + modifierName)])) {
	                output += this.config.classNames.delineatorModifier + modifier;
	            }
	
	            return output;
	        }
	
	        /**
	         * @private
	         * @param   {string} html
	         * @return  {Promise}
	         */
	
	    }, {
	        key: 'show',
	        value: function show(html) {
	            var _this7 = this;
	
	            return Promise.resolve().then(function () {
	                var temp = document.createElement('div');
	
	                temp.innerHTML = html;
	
	                _this7.dom.root = temp.firstElementChild;
	
	                _this7.dom.root.style.opacity = '0';
	
	                _this7.dom.input.parentElement.insertBefore(_this7.dom.root, _this7.dom.input.nextElementSibling);
	
	                _this7.dom.root.style.transition = 'opacity ' + _this7.config.animation.duration + 'ms';
	
	                return new Promise(function (resolve) {
	                    _this7.dom.root.addEventListener('transitionend', function handler(e) {
	                        if (e.propertyName !== 'opacity') return;
	
	                        resolve();
	
	                        parent.removeEventListener('transitionend', handler);
	                    });
	
	                    setTimeout(function () {
	                        return _this7.dom.root.style.opacity = '1';
	                    });
	                });
	            }).then(function () {
	                _this7.dom.root.style.transition = '';
	                _this7.dom.root.style.opacity = '';
	            });
	        }
	
	        /**
	         * @private
	         * @return  {Promise}
	         */
	
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (this.dom.root) {
	                this.dom.root.style.opacity = 0;
	            }
	
	            return Promise.resolve();
	        }
	
	        /**
	         * @private
	         * @param   {string} html
	         * @param   {string} action
	         * @return  {void}
	         */
	
	    }, {
	        key: 'updateView',
	        value: function updateView(html, action) {
	            var _this8 = this;
	
	            return Promise.resolve().then(function () {
	                var temp = document.createElement('div');
	
	                var newHeader = null;
	                var newMonth = null;
	
	                temp.innerHTML = html;
	
	                _this8.unbindEvents(_this8.bindingsCalendar);
	
	                if (action) {
	                    newHeader = temp.querySelector('[data-ref="header"]');
	                    newMonth = temp.querySelector('[data-ref="month"]');
	
	                    _this8.dom.root.replaceChild(newHeader, _this8.dom.header);
	                    _this8.dom.calendar.appendChild(newMonth, _this8.dom.month);
	
	                    return _this8.animateMonthTransition(_this8.dom.calendar.lastElementChild, _this8.dom.month, action);
	                }
	
	                _this8.dom.root.innerHTML = temp.firstChild.innerHTML;
	            }).then(function () {
	                var _bindingsCalendar2;
	
	                _this8.cacheCalendarDom();
	
	                (_bindingsCalendar2 = _this8.bindingsCalendar).push.apply(_bindingsCalendar2, _toConsumableArray(_this8.bindEvents(_eventsCalendar2.default)));
	            });
	        }
	
	        /**
	         * @private
	         * @param   {HTMLElement} newMonth
	         * @param   {HTMLElement} oldMonth
	         * @param   {string}      action
	         * @return  {Promise}
	         */
	
	    }, {
	        key: 'animateMonthTransition',
	        value: function animateMonthTransition(newMonth, oldMonth, action) {
	            var _this9 = this;
	
	            var parent = oldMonth.parentElement;
	
	            return new Promise(function (resolve) {
	                var duration = _this9.config.animation.duration;
	                var easing = _this9.config.animation.easing;
	                var translate = _CssTranslates2.default[action];
	
	                _this9.isTransitioning = true;
	
	                parent.addEventListener('transitionend', function handler(e) {
	                    if (e.propertyName !== 'transform' || !e.target.matches('[data-ref="month"]')) return;
	
	                    resolve();
	
	                    parent.removeEventListener('transitionend', handler);
	                });
	
	                oldMonth.style.transform = 'translate(' + translate.oldXBefore + '%, ' + translate.oldYBefore + '%)';
	                newMonth.style.transform = 'translate(' + translate.newXBefore + '%, ' + translate.newYBefore + '%)';
	
	                setTimeout(function () {
	                    oldMonth.style.transition = newMonth.style.transition = 'transform ' + duration + 'ms' + (easing ? ' ' + easing : '');
	
	                    oldMonth.style.transform = 'translate(' + translate.oldXAfter + '%, ' + translate.oldYAfter + '%)';
	                    newMonth.style.transform = 'translate(' + translate.newXAfter + '%, ' + translate.newYAfter + '%)';
	                });
	            }).then(function () {
	                parent.removeChild(oldMonth);
	
	                newMonth.style.transition = '';
	                newMonth.style.transform = '';
	
	                _this9.isTransitioning = false;
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
	
	    }, {
	        key: 'open',
	
	
	        /* Public Methods
	        ---------------------------------------------------------------------- */
	
	        /**
	         * @public
	         * @return {Promise}
	         */
	
	        value: function open() {
	            if (this.isOpen) return Promise.resolve();
	
	            return this.build();
	        }
	
	        /**
	         * @public
	         * @return {Promise}
	         */
	
	    }, {
	        key: 'close',
	        value: function close() {
	            if (!this.isOpen) return Promise.resolve();
	
	            return this.unbuild();
	        }
	
	        /**
	         * @public
	         * @return {string}
	         */
	
	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            var transform = this.config.transform.output;
	            var value = '';
	
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
	
	    }, {
	        key: 'setValue',
	        value: function setValue(value) {
	            var transform = this.config.transform.input;
	
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
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var cacheIndex = Datepicker.cache.indexOf(this);
	
	            if (this.dom.root) {
	                this.unbindEvents(this.bindingsCalendar);
	
	                this.dom.root.parentElement.removeChild(this.dom.root);
	            }
	
	            this.unbindEvents(this.bindingsInput);
	
	            Datepicker.cache.splice(cacheIndex, 1);
	        }
	    }], [{
	        key: 'getStateFromDate',
	        value: function getStateFromDate(inputDate) {
	            var state = new _State2.default();
	            var date = new Date(inputDate);
	
	            state.year = date.getFullYear();
	            state.monthIndex = date.getMonth();
	            state.selectedYear = state.year;
	            state.selectedMonth = state.monthIndex;
	            state.selectedDay = date.getDate();
	
	            return Object.freeze(state);
	        }
	
	        /**
	         * @private
	         * @static
	         * @return {State}
	         */
	
	    }, {
	        key: 'getStateFromToday',
	        value: function getStateFromToday() {
	            var state = new _State2.default();
	            var date = new Date();
	
	            state.year = date.getFullYear();
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
	
	    }, {
	        key: 'getStateFromAction',
	        value: function getStateFromAction(oldState, type) {
	            var fn = null;
	
	            if (typeof (fn = _Actions2.default[type]) !== 'function') {
	                throw new Error('Action "' + type + '" not found');
	            }
	
	            return Object.freeze(fn(oldState));
	        }
	
	        /**
	         * @private
	         * @static
	         * @param {Error}   err
	         * @param {object}  target
	         */
	
	    }, {
	        key: 'handleConfigureError',
	        value: function handleConfigureError(err, target) {
	            var re = /property "?(\w*)"?[,:] object/i;
	
	            var matches = null;
	            var illegalPropName = '';
	            var bestMatch = '';
	            var suggestion = '';
	
	            if (!(err instanceof TypeError) || !(matches = re.exec(err.message))) throw err;
	
	            illegalPropName = matches[1];
	
	            for (var key in target) {
	                var i = 0;
	
	                while (i < illegalPropName.length && illegalPropName.charAt(i).toLowerCase() === key.charAt(i).toLowerCase()) {
	                    i++;
	                }
	
	                if (i > bestMatch.length) {
	                    bestMatch = key;
	                }
	            }
	
	            if (bestMatch) {
	                suggestion = '. Did you mean "' + bestMatch + '"?';
	            }
	
	            throw new TypeError('[Datepicker] Invalid configuration property "' + illegalPropName + '"' + suggestion);
	        }
	    }]);
	
	    return Datepicker;
	}();
	
	Datepicker.FOCUS_BLOCK_DURATION = 200;
	
	exports.default = Datepicker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var State = function () {
	    function State() {
	        _classCallCheck(this, State);
	
	        this.year = -1;
	        this.monthIndex = -1;
	        this.selectedDay = -1;
	        this.selectedMonth = -1;
	        this.selectedYear = -1;
	
	        Object.seal(this);
	    }
	
	    _createClass(State, [{
	        key: "totalDays",
	        get: function get() {
	            return new Date(this.year, this.monthIndex + 1, 0).getDate();
	        }
	    }, {
	        key: "previousTotalDays",
	        get: function get() {
	            return new Date(this.year, this.monthIndex, 0).getDate();
	        }
	    }, {
	        key: "startDayIndex",
	        get: function get() {
	            return new Date(this.year, this.monthIndex, 1).getDay();
	        }
	    }, {
	        key: "today",
	        get: function get() {
	            var date = new Date();
	
	            if (this.monthIndex === date.getMonth() && this.year === date.getFullYear()) {
	                return date.getDate();
	            }
	
	            return -1;
	        }
	    }]);
	
	    return State;
	}();
	
	exports.default = State;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigAnimation = function ConfigAnimation() {
	    _classCallCheck(this, ConfigAnimation);
	
	    this.duration = 200;
	    this.easing = 'cubic-bezier(0.86, 0, 0.07, 1)';
	
	    Object.seal(this);
	};
	
	exports.default = ConfigAnimation;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigBehavior = function ConfigBehavior() {
	    _classCallCheck(this, ConfigBehavior);
	
	    this.closeOnSelect = true;
	
	    Object.seal(this);
	};
	
	exports.default = ConfigBehavior;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigCallbacks = function ConfigCallbacks() {
	    _classCallCheck(this, ConfigCallbacks);
	
	    this.onSelect = null;
	    this.onOpen = null;
	    this.onClose = null;
	    this.onChangeView = null;
	
	    Object.seal(this);
	};
	
	exports.default = ConfigCallbacks;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigClassNames = function ConfigClassNames() {
	    _classCallCheck(this, ConfigClassNames);
	
	    this.block = 'datepicker';
	    this.elementCalendar = 'calendar';
	    this.elementDay = 'day';
	    this.elementWeek = 'week';
	    this.elementMonth = 'month';
	    this.elementHeader = 'header';
	    this.elementMarker = 'marker';
	    this.elementButton = 'button';
	    this.elementButtonGroup = 'button-group';
	    this.elementHeading = 'heading';
	    this.modifierActive = 'active';
	    this.modifierToday = 'today';
	    this.modifierSelected = 'selected';
	    this.modifierPadding = 'padding';
	    this.modifierWeekend = 'weekend';
	    this.modifierNextMonth = 'next-month';
	    this.modifierPrevMonth = 'prev-month';
	    this.modifierNextYear = 'next-year';
	    this.modifierPrevYear = 'prev-year';
	    this.delineatorElement = '_';
	    this.delineatorModifier = '__';
	
	    Object.seal(this);
	};
	
	exports.default = ConfigClassNames;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigTransform = function ConfigTransform() {
	    _classCallCheck(this, ConfigTransform);
	
	    this.input = null;
	    this.output = null;
	
	    Object.seal(this);
	};
	
	exports.default = ConfigTransform;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = function Dom() {
	    _classCallCheck(this, Dom);
	
	    this.input = null;
	    this.root = null;
	    this.header = null;
	    this.calendar = null;
	    this.month = null;
	    this.tbody = null;
	    this.buttonNextMonth = null;
	    this.buttonPrevMonth = null;
	    this.buttonNextYear = null;
	    this.buttonPrevYear = null;
	
	    Object.seal(this);
	};
	
	exports.default = Dom;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventBinding = function EventBinding() {
	    _classCallCheck(this, EventBinding);
	
	    this.el = '';
	    this.on = '';
	    this.bind = '';
	    this.ref = null;
	    this.fn = null;
	
	    Object.seal(this);
	};
	
	exports.default = EventBinding;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, [{
	        key: 'template',
	
	        /**
	         * Compiles a provided string with interpolated dynamic values
	         * (e.g "Lorem ${foo.bar} dolor") into a template function which
	         * receives an arbitrary data object and returns a populated version
	         * of that string.
	         *
	         * @param   {string}    str
	         * @param   {boolean}   [isSingleValue=false]
	         * @return  {function}
	         */
	
	        value: function template(str) {
	            var isSingleValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var re = /\${([\w.]*)}/g;
	            var dynamics = {};
	
	            var matches = null;
	
	            while (matches = re.exec(str)) {
	                dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
	            }
	
	            /**
	             * @param   {object} data
	             * @return  {*}
	             */
	
	            return function (data) {
	                var key = '';
	                var value = '';
	                var output = str;
	
	                data = data || {};
	
	                for (key in dynamics) {
	                    value = Util.getValueByStringKey(key, data) || '';
	
	                    if (isSingleValue) {
	                        // Break on the first dynamic and return raw value
	
	                        return value;
	                    }
	
	                    output = output.replace(dynamics[key], value);
	                }
	
	                return output;
	            };
	        }
	
	        /**
	         * Retrieves a value from a provided object using a dot-notation
	         * string key (e.g. "foo.bar").
	         *
	         * @param   {string} stringKey
	         * @param   {object} data
	         * @return  {*}
	         */
	
	    }, {
	        key: 'getValueByStringKey',
	        value: function getValueByStringKey(stringKey, data) {
	            var parts = stringKey.split('.');
	
	            var i = 0;
	
	            while (i < parts.length && data) {
	                var arrayIndex = -1;
	
	                stringKey = parts[i] || stringKey;
	
	                if (stringKey.indexOf(']') === stringKey.length - 1) {
	                    arrayIndex = parseInt(stringKey.slice(stringKey.indexOf('[') + 1, stringKey.indexOf(']')));
	
	                    stringKey = stringKey.substring(0, stringKey.indexOf('['));
	                }
	
	                data = data[stringKey];
	
	                if (Array.isArray(data) && arrayIndex > -1) {
	                    data = data[arrayIndex];
	                }
	
	                i++;
	            }
	
	            if (typeof data !== 'undefined') {
	                return data;
	            }
	
	            return null;
	        }
	
	        /**
	         * Merges properties from a source object into a target object,
	         * optionally using a recursive deep extend.
	         *
	         * @param   {object}    target
	         * @param   {object}    source
	         * @param   {boolean}   [deep=false]
	         * @param   {function}  [errorHandler=null]
	         * @return  {object}
	         */
	
	    }, {
	        key: 'extend',
	        value: function extend(target, source) {
	            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var errorHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	            var sourceKeys = [];
	
	            if (!target || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	                throw new TypeError('[Util#extend] Target must be a valid object');
	            }
	
	            if (Array.isArray(source)) {
	                for (var i = 0; i < source.length; i++) {
	                    sourceKeys.push(i);
	                }
	            } else if (source) {
	                sourceKeys = Object.keys(source);
	            }
	
	            for (var _i = 0; _i < sourceKeys.length; _i++) {
	                var key = sourceKeys[_i];
	                var descriptor = Object.getOwnPropertyDescriptor(source, key);
	
	                // Skip virtual properties
	
	                if (typeof descriptor.get === 'function') continue;
	
	                if (!deep || _typeof(source[key]) !== 'object') {
	                    // All non-object primitives, or all properties if
	                    // shallow extend
	
	                    try {
	                        target[key] = source[key];
	                    } catch (err) {
	                        if (typeof errorHandler !== 'function') throw err;
	
	                        errorHandler(err, target);
	                    }
	                } else if (Array.isArray(source[key])) {
	                    // Arrays
	
	                    if (!target[key]) {
	                        target[key] = [];
	                    }
	
	                    Util.extend(target[key], source[key], deep, errorHandler);
	                } else {
	                    // Objects
	
	                    if (!target[key]) {
	                        target[key] = {};
	                    }
	
	                    Util.extend(target[key], source[key], deep, errorHandler);
	                }
	            }
	
	            return target;
	        }
	
	        /**
	         * Converts a dash or snake-case string to camel case.
	         *
	         * @param   {string}    str
	         * @return  {string}
	         */
	
	    }, {
	        key: 'camelCase',
	        value: function camelCase(str) {
	            return str.toLowerCase().replace(/([_-][a-z0-9])/g, function ($1) {
	                return $1.toUpperCase().replace(/[_-]/, '');
	            });
	        }
	
	        /**
	         * Returns the closest parent of a given element matching the
	         * provided selector, optionally including the element itself.
	         *
	         * @param   {HTMLElement}       el
	         * @param   {string}            selector
	         * @param   {boolean}           [includeSelf]
	         * @return  {HTMLElement|null}
	         */
	
	    }, {
	        key: 'closestParent',
	        value: function closestParent(el, selector, includeSelf) {
	            var parent = el.parentNode;
	
	            if (includeSelf && el.matches(selector)) {
	                return el;
	            }
	
	            while (parent && parent !== document.body) {
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
	
	        /**
	         * Pads a given number with a leading 0 if less than 10.
	         *
	         * @param   {(string|number)} int
	         * @return  {string}
	         */
	
	    }, {
	        key: 'pad',
	        value: function pad(int) {
	            int = parseInt(int);
	
	            return int < 10 ? '0' + int.toString() : int.toString(); // eslint-disable-line no-magic-numbers
	        }
	    }]);
	
	    return Util;
	}();
	
	exports.default = Util;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = [
		{
			"el": "input",
			"on": "focus",
			"bind": "handleFocus"
		}
	];

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = [
		{
			"on": "click",
			"bind": "handleWindowClick"
		},
		{
			"el": "header",
			"on": "click",
			"bind": "handleHeaderClick"
		},
		{
			"el": "tbody",
			"on": "click",
			"bind": "handleTbodyClick"
		}
	];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Util = __webpack_require__(11);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Templates = {}; /* eslint-disable max-len */
	
	Templates.day = _Util2.default.template('<td class="${className}" data-ref="day" data-month="${monthNumber}" data-day="${dayNumber}">${dayNumber}</td>');
	Templates.marker = _Util2.default.template('<th class="${className}">${dayShortName}</th>');
	Templates.week = _Util2.default.template('<tr class="${className}">${daysHtml}</tr>');
	
	Templates.container = _Util2.default.template('<div class="${containerClassName}">' + '<header data-ref="header" class="${headerClassName}">' + '<span class="${buttonGroupClassName}">' + '<button class="${buttonPrevYearClassName}" type="button" data-ref="button" data-action="GO_TO_PREV_YEAR"></button> ' + '<button class="${buttonPrevMonthClassName}" type="button" data-ref="button" data-action="GO_TO_PREV_MONTH"></button> ' + '</span> ' + '<span class="${headingClassName}">${monthName} ${year}</span> ' + '<span class="${buttonGroupClassName}">' + '<button class="${buttonNextMonthClassName}" type="button" data-ref="button" data-action="GO_TO_NEXT_MONTH"></button> ' + '<button class="${buttonNextYearClassName}" type="button" data-ref="button" data-action="GO_TO_NEXT_YEAR"></button>' + '</span>' + '</header>' + '<div class="${calendarClassName}" data-ref="calendar">' + '<table class="${monthClassName}" data-ref="month">' + '<thead>' + '<tr>${legendHtml}</tr>' + '</thead>' + '<tbody data-ref="tbody">${weeksHtml}</tbody>' + '</table>' + '</div>' + '</div>');
	
	exports.default = Templates;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _State = __webpack_require__(2);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _Util = __webpack_require__(11);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Actions = {};
	
	Actions.GO_TO_NEXT_MONTH = function (prevState) {
	    var newState = _Util2.default.extend(new _State2.default(), prevState);
	
	    if (newState.monthIndex === 11) {
	        // eslint-disable-line no-magic-numbers
	        newState.monthIndex = 0;
	        newState.year++;
	    } else {
	        newState.monthIndex++;
	    }
	
	    return newState;
	};
	
	Actions.GO_TO_PREV_MONTH = function (prevState) {
	    var newState = _Util2.default.extend(new _State2.default(), prevState);
	
	    if (newState.monthIndex === 0) {
	        newState.monthIndex = 11;
	        newState.year--;
	    } else {
	        newState.monthIndex--;
	    }
	
	    return newState;
	};
	
	Actions.GO_TO_NEXT_YEAR = function (prevState) {
	    var newState = _Util2.default.extend(new _State2.default(), prevState);
	
	    newState.year++;
	
	    return newState;
	};
	
	Actions.GO_TO_PREV_YEAR = function (prevState) {
	    var newState = _Util2.default.extend(new _State2.default(), prevState);
	
	    newState.year--;
	
	    return newState;
	};
	
	exports.default = Actions;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _CssTranslate = __webpack_require__(17);
	
	var _CssTranslate2 = _interopRequireDefault(_CssTranslate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Transforms = {}; /* eslint-disable no-magic-numbers */
	
	Transforms.GO_TO_NEXT_MONTH = new _CssTranslate2.default([0, 0], [0, 0], [-100, 0], [-100, 0]);
	Transforms.GO_TO_PREV_MONTH = new _CssTranslate2.default([0, 0], [-200, 0], [100, 0], [-100, 0]);
	Transforms.GO_TO_NEXT_YEAR = new _CssTranslate2.default([0, 0], [-100, 100], [0, -100], [-100, 0]);
	Transforms.GO_TO_PREV_YEAR = new _CssTranslate2.default([0, 0], [-100, -100], [0, 100], [-100, 0]);
	
	exports.default = Transforms;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CssTranslate = function CssTranslate(oldCoordsBefore, newCoordsBefore, oldCoordsAfter, newCoordsAfter) {
	    _classCallCheck(this, CssTranslate);
	
	    this.newXBefore = newCoordsBefore[0];
	    this.newYBefore = newCoordsBefore[1];
	    this.oldXBefore = oldCoordsBefore[0];
	    this.oldYBefore = oldCoordsBefore[1];
	    this.newXAfter = newCoordsAfter[0];
	    this.newYAfter = newCoordsAfter[1];
	    this.oldXAfter = oldCoordsAfter[0];
	    this.oldYAfter = oldCoordsAfter[1];
	
	    Object.seal(this);
	};
	
	exports.default = CssTranslate;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ConstantsEn = __webpack_require__(25);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Month = function () {
	    function Month() {
	        _classCallCheck(this, Month);
	
	        this.weeks = [];
	        this.dayMarkers = [];
	        this.monthIndex = -1;
	        this.year = -1;
	        this.weeksHtml = '';
	        this.legendHtml = '';
	        this.calendarClassName = '';
	        this.monthClassName = '';
	        this.headerClassName = '';
	        this.headingClassName = '';
	        this.containerClassName = '';
	        this.buttonGroupClassName = '';
	        this.buttonPrevMonthClassName = '';
	        this.buttonNextMonthClassName = '';
	        this.buttonPrevYearClassName = '';
	        this.buttonNextYearClassName = '';
	
	        Object.seal(this);
	    }
	
	    _createClass(Month, [{
	        key: 'monthName',
	        get: function get() {
	            return _ConstantsEn.MONTHS[this.monthIndex];
	        }
	    }]);
	
	    return Month;
	}();
	
	exports.default = Month;

/***/ },
/* 19 */,
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Day = function Day() {
	    _classCallCheck(this, Day);
	
	    this.dayIndex = -1;
	    this.dayNumber = -1;
	    this.monthNumber = -1;
	    this.isToday = false;
	    this.isPadding = false;
	    this.isSelected = false;
	    this.className = '';
	
	    Object.seal(this);
	};
	
	exports.default = Day;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ConstantsEn = __webpack_require__(25);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DayMarker = function () {
	    function DayMarker() {
	        _classCallCheck(this, DayMarker);
	
	        this.dayIndex = -1;
	        this.className = '';
	
	        Object.seal(this);
	    }
	
	    _createClass(DayMarker, [{
	        key: 'dayName',
	        get: function get() {
	            return _ConstantsEn.DAYS[this.dayIndex];
	        }
	    }, {
	        key: 'dayShortName',
	        get: function get() {
	            return this.dayName.charAt(0);
	        }
	    }]);
	
	    return DayMarker;
	}();
	
	exports.default = DayMarker;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Week = function Week() {
	    _classCallCheck(this, Week);
	
	    this.days = [];
	    this.daysHtml = '';
	    this.className = '';
	
	    Object.seal(this);
	};
	
	exports.default = Week;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Datepicker2 = __webpack_require__(1);
	
	var _Datepicker3 = _interopRequireDefault(_Datepicker2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Datepicker = function Datepicker() {
	    _classCallCheck(this, Datepicker);
	
	    var _ = new (Function.prototype.bind.apply(_Datepicker3.default, [null].concat(Array.prototype.slice.call(arguments))))();
	
	    this.open = _.open.bind(_);
	    this.close = _.close.bind(_);
	    this.getValue = _.getValue.bind(_);
	    this.setValue = _.setValue.bind(_);
	    this.destroy = _.destroy.bind(_);
	
	    Object.defineProperties(this, {
	        input: {
	            get: function get() {
	                return _.dom.input;
	            }
	        }
	    });
	
	    Object.freeze(this);
	};
	
	Datepicker.cache = [];
	
	exports.default = Datepicker;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ConfigAnimation = __webpack_require__(4);
	
	var _ConfigAnimation2 = _interopRequireDefault(_ConfigAnimation);
	
	var _ConfigBehavior = __webpack_require__(5);
	
	var _ConfigBehavior2 = _interopRequireDefault(_ConfigBehavior);
	
	var _ConfigCallbacks = __webpack_require__(6);
	
	var _ConfigCallbacks2 = _interopRequireDefault(_ConfigCallbacks);
	
	var _ConfigClassNames = __webpack_require__(7);
	
	var _ConfigClassNames2 = _interopRequireDefault(_ConfigClassNames);
	
	var _ConfigTransform = __webpack_require__(8);
	
	var _ConfigTransform2 = _interopRequireDefault(_ConfigTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigRoot = function ConfigRoot() {
	    _classCallCheck(this, ConfigRoot);
	
	    this.animation = new _ConfigAnimation2.default();
	    this.behavior = new _ConfigBehavior2.default();
	    this.callbacks = new _ConfigCallbacks2.default();
	    this.classNames = new _ConfigClassNames2.default();
	    this.transform = new _ConfigTransform2.default();
	
	    Object.seal(this);
	    Object.freeze(this);
	};
	
	exports.default = ConfigRoot;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MONTHS = exports.MONTHS = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	var DAYS = exports.DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=datepicker.js.map