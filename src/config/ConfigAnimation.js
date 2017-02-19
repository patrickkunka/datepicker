class ConfigAnimation {
    constructor() {
        this.duration = 200;
        this.easing   = 'cubic-bezier(0.86, 0, 0.07, 1)';

        Object.seal(this);
    }
}

export default ConfigAnimation;