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
	
	var _Datepicker = __webpack_require__(1);
	
	var _Datepicker2 = _interopRequireDefault(_Datepicker);
	
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
	
	    for (var i = 0; instance = _Datepicker2.default.cache[i]; i++) {
	        if (instance.dom.input === input) return instance;
	    }
	
	    instance = new _Datepicker2.default(input, config);
	
	    _Datepicker2.default.cache.push(instance);
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State = __webpack_require__(2);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _Config = __webpack_require__(3);
	
	var _Config2 = _interopRequireDefault(_Config);
	
	var _Dom = __webpack_require__(6);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _EventBinding = __webpack_require__(7);
	
	var _EventBinding2 = _interopRequireDefault(_EventBinding);
	
	var _Util = __webpack_require__(8);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	var _eventsInput = __webpack_require__(9);
	
	var _eventsInput2 = _interopRequireDefault(_eventsInput);
	
	var _eventsCalendar = __webpack_require__(10);
	
	var _eventsCalendar2 = _interopRequireDefault(_eventsCalendar);
	
	var _Templates = __webpack_require__(11);
	
	var _Templates2 = _interopRequireDefault(_Templates);
	
	var _Actions = __webpack_require__(12);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _Month = __webpack_require__(13);
	
	var _Month2 = _interopRequireDefault(_Month);
	
	var _Day = __webpack_require__(15);
	
	var _Day2 = _interopRequireDefault(_Day);
	
	var _DayMarker = __webpack_require__(16);
	
	var _DayMarker2 = _interopRequireDefault(_DayMarker);
	
	var _Week = __webpack_require__(17);
	
	var _Week2 = _interopRequireDefault(_Week);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Datepicker = function Datepicker() {
	    _classCallCheck(this, Datepicker);
	
	    var _ = new (Function.prototype.bind.apply(_Datepicker, [null].concat(Array.prototype.slice.call(arguments))))();
	
	    this.open = _.open.bind(_);
	    this.close = _.close.bind(_);
	    this.getValue = _.getValue.bind(_);
	    this.setValue = _.setValue.bind(_);
	    this.destroy = _.destroy.bind(_);
	
	    Object.freeze(this);
	};
	
	Datepicker.cache = [];
	
	var _Datepicker = function () {
	    /**
	     * @constructor
	     * @param {HTMLInputElement} input
	     * @param {object}           [config={}]
	     */
	
	    function _Datepicker(input) {
	        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        _classCallCheck(this, _Datepicker);
	
	        this.value = '';
	        this.state = null;
	        this.dom = new _Dom2.default();
	        this.config = new _Config2.default();
	        this.isOpen = false;
	        this.isFocussing = false;
	        this.bindingsInput = [];
	        this.bindingsCalendar = [];
	
	        Object.seal(this);
	
	        if (!(input instanceof HTMLInputElement)) {
	            throw new TypeError('[Datepicker] No valid input element provided');
	        }
	
	        this.dom.input = input;
	
	        this.configure(config);
	
	        this.bindingsInput.concat(this.bindEvents(_eventsInput2.default));
	    }
	
	    /**
	     * @private
	     * @param   {object} config
	     * @return  {void}
	     */
	
	    _createClass(_Datepicker, [{
	        key: 'configure',
	        value: function configure(config) {
	            _Util2.default.extend(this.config, config);
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
	            }, _Datepicker.FOCUS_BLOCK_DURATION);
	
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
	            var html = '';
	            var state = null;
	            var data = null;
	
	            e.stopPropagation();
	
	            if (!button) return;
	
	            action = button.getAttribute('data-action');
	
	            state = this.getStateFromAction(this.state, action);
	            data = this.getMonthData(state);
	            html = this.render(data);
	
	            this.updateView(html);
	
	            this.state = state;
	        }
	
	        /**
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */
	
	    }, {
	        key: 'handleTbodyClick',
	        value: function handleTbodyClick(e) {
	            var cell = _Util2.default.closestParent(e.target, '[data-ref="day"]', true);
	
	            var day = -1;
	            var month = -1;
	            var date = '';
	            var onSelect = null;
	
	            e.stopPropagation();
	
	            if (!cell) return;
	
	            day = parseInt(cell.getAttribute('data-day'));
	            month = parseInt(cell.getAttribute('data-month'));
	
	            date = this.state.year + '-' + _Util2.default.pad(month) + '-' + _Util2.default.pad(day);
	
	            this.value = date;
	            this.dom.input.value = this.value;
	
	            if (typeof (onSelect = this.config.callbacks.onSelect) === 'function') {
	                onSelect(this.value);
	            }
	
	            this.unbuild();
	        }
	
	        /**
	         * @private
	         * @return {Promise}
	         */
	
	    }, {
	        key: 'build',
	        value: function build() {
	            var _this3 = this;
	
	            var state = this.value ? this.getStateFromDate(this.value) : this.getStateFromToday();
	            var data = this.getMonthData(state);
	            var html = this.render(data);
	
	            return this.show(html).then(function () {
	                _this3.dom.header = _this3.dom.root.querySelector('[data-ref="header"]');
	                _this3.dom.tbody = _this3.dom.root.querySelector('[data-ref="tbody"]');
	
	                _this3.bindingsCalendar.concat(_this3.bindEvents(_eventsCalendar2.default));
	
	                _this3.state = state;
	
	                _this3.isOpen = true;
	            }).catch(function (err) {
	                return console.error(err);
	            });
	        }
	
	        /**
	         * @private
	         * @return {Promise}
	         */
	
	    }, {
	        key: 'unbuild',
	        value: function unbuild() {
	            var _this4 = this;
	
	            return this.hide().then(function () {
	                if (_this4.dom.root) {
	                    _this4.dom.root.parentElement.removeChild(_this4.dom.root);
	                }
	
	                _this4.unbindEvents(_this4.bindingsCalendar);
	
	                _this4.dom.root = _this4.dom.buttonPrevYear = _this4.dom.buttonNextYear = _this4.dom.buttonPrevMonth = _this4.dom.buttonNextMonth = null;
	
	                _this4.isOpen = false;
	            }).catch(function (err) {
	                return console.error(err);
	            });
	        }
	
	        /**
	         * @private
	         * @param   {string} inputDate
	         * @return  {State}
	         */
	
	    }, {
	        key: 'getStateFromDate',
	        value: function getStateFromDate(inputDate) {
	            var state = new _State2.default();
	            var date = new Date(inputDate);
	
	            state.year = date.getFullYear();
	            state.monthIndex = date.getMonth();
	            state.selectedYear = state.year;
	            state.selectedMonth = state.monthIndex;
	            state.selectedDay = date.getDate();
	
	            Object.freeze(state);
	
	            return state;
	        }
	
	        /**
	         * @private
	         * @return {State}
	         */
	
	    }, {
	        key: 'getStateFromToday',
	        value: function getStateFromToday() {
	            var state = new _State2.default();
	            var date = new Date();
	
	            state.year = date.getFullYear();
	            state.monthIndex = date.getMonth();
	
	            Object.freeze(state);
	
	            return state;
	        }
	
	        /**
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
	
	            return Object.freeze(fn(this.state));
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
	            var temp = document.createElement('div');
	
	            temp.innerHTML = html;
	
	            this.dom.root = temp.firstElementChild;
	
	            this.dom.input.parentElement.insertBefore(this.dom.root, this.dom.input.nextElementSibling);
	
	            return Promise.resolve();
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
	         * @param {string} html
	         * @return {void}
	         */
	
	    }, {
	        key: 'updateView',
	        value: function updateView(html) {
	            var temp = document.createElement('div');
	
	            temp.innerHTML = html;
	
	            this.unbindEvents(this.bindingsCalendar);
	
	            this.dom.root.innerHTML = temp.firstChild.innerHTML;
	
	            this.dom.header = this.dom.root.querySelector('[data-ref="header"]');
	            this.dom.tbody = this.dom.root.querySelector('[data-ref="tbody"]');
	
	            this.bindingsCalendar.concat(this.bindEvents(_eventsCalendar2.default));
	        }
	
	        /**
	         * @public
	         * @return {Promise}
	         */
	
	    }, {
	        key: 'open',
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
	            return this.value;
	        }
	
	        /**
	         * @public
	         * @param {string} value
	         */
	
	    }, {
	        key: 'setValue',
	        value: function setValue(value) {
	            if (!value || typeof value !== 'string') {
	                throw new TypeError('[Datepicker] Invalid value');
	            }
	
	            this.value = value;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var cacheIndex = Datepicker.cache.indexOf(this);
	
	            this.unbindEvents(this.bindingsInput);
	
	            Datepicker.cache.splice(cacheIndex, 1);
	        }
	    }]);
	
	    return _Datepicker;
	}();
	
	_Datepicker.FOCUS_BLOCK_DURATION = 200;
	
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ConfigClassNames = __webpack_require__(4);
	
	var _ConfigClassNames2 = _interopRequireDefault(_ConfigClassNames);
	
	var _ConfigCallbacks = __webpack_require__(5);
	
	var _ConfigCallbacks2 = _interopRequireDefault(_ConfigCallbacks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Config = function Config() {
	    _classCallCheck(this, Config);
	
	    this.classNames = new _ConfigClassNames2.default();
	    this.callbacks = new _ConfigCallbacks2.default();
	
	    Object.seal(this);
	};
	
	exports.default = Config;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigClassNames = function ConfigClassNames() {
	    _classCallCheck(this, ConfigClassNames);
	
	    this.block = 'datepicker';
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
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConfigCallbacks = function ConfigCallbacks() {
	    _classCallCheck(this, ConfigCallbacks);
	
	    this.onSelect = null;
	
	    Object.seal(this);
	};
	
	exports.default = ConfigCallbacks;

/***/ },
/* 6 */
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
	    this.tbody = null;
	    this.buttonNextMonth = null;
	    this.buttonPrevMonth = null;
	    this.buttonNextYear = null;
	    this.buttonPrevYear = null;
	
	    Object.seal(this);
	};
	
	exports.default = Dom;

/***/ },
/* 7 */
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
/* 8 */
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
	         * @return  {object}
	         */
	
	    }, {
	        key: 'extend',
	        value: function (_extend) {
	            function extend(_x, _x2) {
	                return _extend.apply(this, arguments);
	            }
	
	            extend.toString = function () {
	                return _extend.toString();
	            };
	
	            return extend;
	        }(function (target, source) {
	            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
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
	
	                    target[key] = source[key];
	                } else if (Array.isArray(source[key])) {
	                    // Arrays
	
	                    if (!target[key]) {
	                        target[key] = [];
	                    }
	
	                    extend(target[key], source[key], deep);
	                } else {
	                    // Objects
	
	                    if (!target[key]) {
	                        target[key] = {};
	                    }
	
	                    extend(target[key], source[key], deep);
	                }
	            }
	
	            return target;
	        })
	
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
	
	exports.default = Object.freeze(Util);

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = [
		{
			"el": "input",
			"on": "focus",
			"bind": "handleFocus"
		}
	];

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Util = __webpack_require__(8);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Templates = {}; /* eslint-disable max-len */
	
	Templates.day = _Util2.default.template('<td class="${className}" data-ref="day" data-month="${monthNumber}" data-day="${dayNumber}">${dayNumber}</td>');
	Templates.marker = _Util2.default.template('<th class="${className}">${dayShortName}</th>');
	Templates.week = _Util2.default.template('<tr class="${className}">${daysHtml}</tr>');
	
	Templates.container = _Util2.default.template('<div class="${containerClassName}">' + '<header data-ref="header" class="${headerClassName}">' + '<span class="${buttonGroupClassName}">' + '<button class="${buttonPrevYearClassName}" type="button" data-ref="button" data-action="GO_TO_PREV_YEAR"></button> ' + '<button class="${buttonPrevMonthClassName}" type="button" data-ref="button" data-action="GO_TO_PREV_MONTH"></button> ' + '</span> ' + '<span class="${headingClassName}">${monthName} ${year}</span> ' + '<span class="${buttonGroupClassName}">' + '<button class="${buttonNextMonthClassName}" type="button" data-ref="button" data-action="GO_TO_NEXT_MONTH"></button> ' + '<button class="${buttonNextYearClassName}" type="button" data-ref="button" data-action="GO_TO_NEXT_YEAR"></button>' + '</span>' + '</header>' + '<table class="${monthClassName}">' + '<thead>' + '<tr>${legendHtml}</tr>' + '</thead>' + '<tbody data-ref="tbody">${weeksHtml}</tbody></table>' + '</div>');
	
	exports.default = Object.freeze(Templates);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _State = __webpack_require__(2);
	
	var _State2 = _interopRequireDefault(_State);
	
	var _Util = __webpack_require__(8);
	
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
	
	exports.default = Object.freeze(Actions);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constantsEn = __webpack_require__(14);
	
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
	            return _constantsEn.MONTHS[this.monthIndex];
	        }
	    }]);
	
	    return Month;
	}();
	
	exports.default = Month;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MONTHS = exports.MONTHS = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	var DAYS = exports.DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	Object.freeze(MONTHS);
	Object.freeze(DAYS);

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constantsEn = __webpack_require__(14);
	
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
	            return _constantsEn.DAYS[this.dayIndex];
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
/* 17 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=datepicker.js.map