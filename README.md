# datepicker

### HTML

Instantiate on a standard text input

```html
<input type="text" data-ref="date-picker"/>
```

### JS

#### Instantiation

Pass a reference to the input element as the first parameter, and an optional config object as the second:

```js
var inputEl = document.querySelector('[data-ref="date-picker"]');

var picker = new DatePicker(inputEl, {
    callbacks: {
        onSelect: function(date) {
            console.log('selected date:', date);
        }
    }
});
```

Setting an onSelect callback will allow you to perform custom functionality whenever a date value is selected, for example triggering a 'change' event to update bindings.

#### Pre-loading a value other than today:

To pre-load the date picker with a previously saved value, set its value property with an ISO date string.

```
picker.value = input.value;
```
