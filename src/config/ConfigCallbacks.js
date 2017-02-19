class ConfigCallbacks {
    constructor() {
        this.onSelect       = null;
        this.onOpen         = null;
        this.onClose        = null;
        this.onChangeView   = null;

        Object.seal(this);
    }
}

export default ConfigCallbacks;