import {
    container,
    week,
    day,
    marker,
    button
} from '../Templates';

class ConfigTemplates {
    constructor() {
        this.container = container;
        this.week      = week;
        this.day       = day;
        this.marker    = marker;
        this.button    = button;

        Object.seal(this);
    }
}

export default ConfigTemplates;