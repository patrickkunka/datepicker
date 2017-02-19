import Datepicker from './Datepicker';

/**
 * @param {(HTMLInputElement|string)}   input
 * @param {object}                      [config={}]
 */

function factory(input, config={}) {
    let instance = null;

    if (typeof input === 'string') {
        input = document.querySelector(input);
    }

    for (let i = 0; (instance = Datepicker.cache[i]); i++) {
        if (instance.dom.input === input) return instance;
    }

    instance = new Datepicker(input, config);

    Datepicker.cache.push(instance);

    return instance;
}

module.exports = factory;