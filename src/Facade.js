import _Datepicker from './Datepicker';

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

export default Datepicker;

