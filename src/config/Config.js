import ConfigClassNames from './ConfigClassNames';
import ConfigCallbacks  from './ConfigCallbacks';

class Config {
    constructor() {
        this.classNames = new ConfigClassNames();
        this.callbacks  = new ConfigCallbacks();

        Object.seal(this);
    }
}

export default Config;