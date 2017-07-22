import ConfigAnimation  from './ConfigAnimation';
import ConfigBehavior   from './ConfigBehavior';
import ConfigCallbacks  from './ConfigCallbacks';
import ConfigClassNames from './ConfigClassNames';
import ConfigTemplates  from './ConfigTemplates';
import ConfigTransform  from './ConfigTransform';

class ConfigRoot {
    constructor() {
        this.animation  = new ConfigAnimation();
        this.behavior   = new ConfigBehavior();
        this.callbacks  = new ConfigCallbacks();
        this.classNames = new ConfigClassNames();
        this.templates  = new ConfigTemplates();
        this.transform  = new ConfigTransform();

        Object.seal(this);
        Object.freeze(this);
    }
}

export default ConfigRoot;