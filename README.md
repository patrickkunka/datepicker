# Datepicker

A dependency-free vanilla JS datepicker widget for enhancing `<input>` elements with calendar UI.

- [Installation](#installation)
- [Instantiation](#instantiation)
- [Configuration](#configuration)
- [Datepicker API](#datepicker-api)

## Installation

Firstly, install the package from github using your package manager of choice.

`npm install https://github.com/patrickkunka/datepicker.git --save-dev`

You may then import the datepicker factory function into your project's modules.

```js
import datepicker from 'datepicker';
```

You may also load datepicker via a `<script>` tag, and the `datepicker` factory function will be added to the global namespace.

```html
...

        <script src="/path/to/datepicker.js"></script>
    </body>
</html>
```

## Instantiation

The datepicker factory function then can be used to create a discrete datepicker instance for a provided input element.

```js
datepicker(input);
```
> Instantiation with an element reference

```js
datepicker('input[type="text"]');
```
> Instantiation with a DOM selector string

## Usage

If the provided input has a value, it will be loaded into the datepicker on instantiation and set as the selected date. Otherwise, the datepicker will show the current month when opened.

Once a date has been selected, the `<input>`'s value will be updated with the new date, and a `change` event will be dispatched from the `<input>` element.

A demo is included in the repository for a basic example of instantiation and styling.

## Configuration

If you wish to customise the functionality of a datepicker, simply pass a configuration object as a second parameter to the factory function.

```js
datepicker(input, {
    animation: {
        duration: 100
    },
    transform: {
        input: value => moment(value, 'YYYY/MM/DD').toISOString();
        output: value => moment(value).format('YYYY/MM/DD')
    }
});
```
> Passing a configuration object

By default, each datepicker will be instantiation with the following default options. Each option is documented below.

```js
{
    animation: {
        duration: 200,
        easing:   'cubic-bezier(0.86, 0, 0.07, 1)'
    },
    behavior: {
        closeOnSelect: true
    },
    callbacks: {
        onSelect:     null,
        onOpen:       null,
        onClose:      null,
        onChangeView: null
    },
    classNames: {
        block:              'datepicker',
        elementCalendar:    'calendar',
        elementDay:         'day',
        elementWeek:        'week',
        elementMonth:       'month',
        elementHeader:      'header',
        elementMarker:      'marker',
        elementButton:      'button',
        elementButtonGroup: 'button-group',
        elementHeading:     'heading',
        modifierActive:     'active',
        modifierToday:      'today',
        modifierSelected:   'selected',
        modifierPadding:    'padding',
        modifierWeekend:    'weekend',
        modifierNextMonth:  'next-month',
        modifierPrevMonth:  'prev-month',
        modifierNextYear:   'next-year',
        modifierPrevYear:   'prev-year',
        delineatorElement:  '_',
        delineatorModifier: '__'
    },
    transform: {
        input:  null,
        output: null
    }
}
```

### animation

A collection of options related to animation.

- `duration`

A number dictating the duration of all animations.

|Type | Default
|---  | ---
|`number`| `200`

- `easing`

A string dictating the type of easing to apply to transitions between calendar views.

|Type | Default
|---  | ---
|`string`| `'cubic-bezier(0.86, 0, 0.07, 1)'`

### behavior

A collection of options related to the behavior of the datepicker.

- `closeOnSelect`

A boolean dictating whether or not the calendar should automatically close when a day is selected.

|Type | Default
|---  | ---
|`boolean`| `true`

### callbacks

A collection of optional callbacks which can hooked into.

- `onSelect`

A callback invoked whenever a new date is selected.

|Type | Default
|---  | ---
|`function`| `null`

- `onOpen`

A callback invoked whenever the calendar is opened.

|Type | Default
|---  | ---
|`function`| `null`

- `onClose`

A callback invoked whenever the calendar is closed.

|Type | Default
|---  | ---
|`function`| `null`

- `onChangeView`

A callback invoked whenever the calendar view changes.

|Type | Default
|---  | ---
|`function`| `null`

### classNames

The default class names which are included in the HTML generated by the datepicker, broken up into BEM-like tokens.

### transform

A collection of optional functions which can be added to transform the input and output values.

- `input`

A function for transforming the value of date inputs provided to the datepicker via its API of read from its associated `<input>` element. Because the datepicker currently only accepts ISO 8601 date strings as an input, you may use this function to transform other formats into a compatible format.

The function receives a string (from the API), or the value the `<input>`, and must return an ISO 8601 compatible string.

|Type | Default
|---  | ---
|`function`| `null`

- `output`

A function for transforming the values read out of the datepicker via its API, or rendered into its associated `<input>` element. The datepicker will return an ISO 8601 string by default, so you may wish to use this function to transform it into a more human readable format (e.g using [Moment.js](https://momentjs.com/)).

The function receives an ISO 8601 string and should return a string.

|Type | Default
|---  | ---
|`function`| `null`

## Datepicker API

The datepicker factory function returns a reference to the datepicker instance when called.

You may use this reference to interact with the datepicker via its API.

```js
const picker = datepicker(input);

picker.open()
```

Each datepicker instance exposes the following methods:

- `.getValue()`

Retrieves the currently selected value from the datepicker. The value is filtered through the `transform.output` function before being returned, if provided.

- `.setValue()`

Programmatically sets the value of the datepicker. If the calendar is open, it will be re-rendered. The value is filtered through a `transform.input` function before being set, if provided. Does not update the value of the `<input>` element.

- `.open()`

Programmatically opens the calendar. Returns a promise which resolves when the open animation is finished.

- `.close()`

Programmatically closes the calendar.  Returns a promise which resolves when the close animation is finished.

- `.destroy()`

Destroys the datepicker instance by unbinding event handlers, deletes it from the internal cache for garbage collection, and removes any calendar markup from the DOM (if open).

---
*&copy; 2017 Patrick Kunka / KunkaLabs Ltd*
