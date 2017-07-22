import Facade           from './Facade';
import * as Constants   from './Constants';

/**
 * @param {(HTMLInputElement|string)}   input
 * @param {object}                      [config={}]
 */

function factory(input, config={}) {
    let instance = null;

    if (typeof input === 'string') {
        input = document.querySelector(input);
    }

    for (let i = 0; (instance = Facade.cache[i]); i++) {
        if (instance.input === input) return instance;
    }

    instance = new Facade(input, config);

    Facade.cache.push(instance);

    return instance;
}

factory.Constants = Constants;

module.exports = factory;