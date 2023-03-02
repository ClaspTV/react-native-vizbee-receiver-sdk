// Logger which outputs to the console
class VizbeeLogger {

    constructor() {
        this.Level = {
            Error: "error",
            Warn: "warn",
            Info: "info",
            Debug: "debug",
        };
        this.currentLevel = this.Level.Info;
        this.enableLogging = false;
    }

    setLevel(level) {
        this.currentLevel = level;
    }

    enable() {
        this.enableLogging = true;
    }

    disable() {
        this.enableLogging = false;
    }

    error(message, ...optionalParams) {
        if (this.canLog(this.Level.Error)) {
            global.console.error(
                this.addPrefixToMessage(message),
                ...optionalParams
            );
        }
    }

    warn(message, ...optionalParams) {
        if (this.canLog(this.Level.Warn)) {
            global.console.warn(
                this.addPrefixToMessage(message),
                ...optionalParams
            );
        }
    }

    info(message, ...optionalParams) {
        if (this.canLog(this.Level.Info)) {
            global.console.info(
                this.addPrefixToMessage(message),
                ...optionalParams
            );
        }
    }

    debug(message, ...optionalParams) {
        if (this.canLog(this.Level.Debug)) {
            global.console.debug(
                this.addPrefixToMessage(message),
                ...optionalParams
            );
        }
    }

    canLog(level) {
        if (!this.enableLogging) {
            return false;
        }

        if (this.currentLevel === this.Level.Error) {
            return level === this.Level.Error;
        }

        if (this.currentLevel === this.Level.Warn) {
            return [this.Level.Error, this.Level.Warn].indexOf(level) >= 0;
        }

        if (this.currentLevel === this.Level.Info) {
            return [this.Level.Error, this.Level.Warn, this.Level.Info].indexOf(level) >= 0;
        }
        return true;
    }

    addPrefixToMessage(message) {
        return `[${new Date().toISOString()}][VIZBEE] ${message}`;
    }
}

export default new VizbeeLogger();
