/**
 * @class VizbeeOptions
 * @description Configuration options for the Vizbee SDK initialization.
 * This class provides a way to configure various aspects of the Vizbee SDK.
 */
class VizbeeOptions {
    /**
     * @enum {Object} LoggingPreference
     * @description Enum for logging preference options.
     * @readonly
     * @static
     */
    static LoggingPreference = {
        DISABLE: 'DISABLE',
        ENABLE_INFO_LEVEL: 'ENABLE_INFO_LEVEL',
        ENABLE_VERBOSE_LEVEL: 'ENABLE_VERBOSE_LEVEL'
    };

    /**
     * @constructor
     * @description Creates a new instance of VizbeeOptions with specified or default values.
     * @param {Object} options - Configuration options
     * @param {Object} [options.customMetricsAttributes=null] - Custom metrics attributes for analytics
     * @param {boolean} [options.shouldInitInBackground=false] - Whether to initialize the SDK in the background
     * @param {string} [options.configServiceProxyHost=null] - Configuration service proxy host URL
     * @param {LoggingPreference} [options.loggingPreference=LoggingPreference.DISABLE] - Logging level preference
     */
    constructor(options = {}) {
        const {
            customMetricsAttributes = null,
            shouldInitInBackground = false,
            configServiceProxyHost = null,
            loggingPreference = VizbeeOptions.LoggingPreference.DISABLE
        } = options;

        /**
         * @property {Object|null} _customMetricsAttributes - Custom metrics attributes for analytics.
         * @private
         */
        this._customMetricsAttributes = customMetricsAttributes;

        /**
         * @property {boolean} _shouldInitInBackground - Whether to initialize the SDK in the background.
         * @private
         */
        this._shouldInitInBackground = shouldInitInBackground;

        /**
         * @property {string|null} _configServiceProxyHost - Configuration service proxy host URL.
         * @private
         */
        this._configServiceProxyHost = configServiceProxyHost;

        /**
         * @property {LoggingPreference} _loggingPreference - Logging level preference.
         * @private
         */
        this._loggingPreference = loggingPreference;
    }

    /**
     * @method toRNOptions
     * @description Converts the VizbeeOptions object to a plain JavaScript object for React Native.
     * @returns {Object} A plain JavaScript object representing the options.
     */
    toRNOptions() {
        const rnOptions = {};
        
        rnOptions.customMetricsAttributes = this._customMetricsAttributes;
        rnOptions.shouldInitInBackground = this._shouldInitInBackground;
        rnOptions.configServiceProxyHost = this._configServiceProxyHost;
        rnOptions.loggingPreference = this._loggingPreference;
        
        return rnOptions;
    }

    /**
     * @method fromRNOptions
     * @description Populates the VizbeeOptions object from a plain JavaScript object.
     * @param {Object} rnOptions - A plain JavaScript object containing options.
     */
    fromRNOptions(rnOptions) {
        if (!rnOptions) {
            return;
        }

        if (rnOptions.customMetricsAttributes !== undefined) {
            this._customMetricsAttributes = rnOptions.customMetricsAttributes;
        }
        
        if (rnOptions.shouldInitInBackground !== undefined) {
            this._shouldInitInBackground = rnOptions.shouldInitInBackground;
        }
        
        if (rnOptions.configServiceProxyHost !== undefined) {
            this._configServiceProxyHost = rnOptions.configServiceProxyHost;
        }
        
        if (rnOptions.loggingPreference !== undefined) {
            this._loggingPreference = rnOptions.loggingPreference;
        }
    }

    /**
     * @method addCustomMetricsAttributes
     * @description Adds custom metrics attributes by merging with existing ones.
     * @param {Object} attributes - The attributes to add.
     * @returns {VizbeeOptions} This instance, for method chaining.
     */
    addCustomMetricsAttributes(attributes) {
        if (!this._customMetricsAttributes) {
            this._customMetricsAttributes = {};
        }
        this._customMetricsAttributes = { ...this._customMetricsAttributes, ...attributes };
        
        return this;
    }

    /**
     * @property {boolean} shouldInitInBackground
     * @description Whether to initialize the SDK in the background.
     */
    get shouldInitInBackground() {
        return this._shouldInitInBackground;
    }
    
    set shouldInitInBackground(value) {
        this._shouldInitInBackground = value;
    }

    /**
     * @property {LoggingPreference} loggingPreference
     * @description The logging preference setting.
     */
    get loggingPreference() {
        return this._loggingPreference;
    }
    
    set loggingPreference(value) {
        this._loggingPreference = value;
    }

    /**
     * @property {string|null} configServiceProxyHost
     * @description The configuration service proxy host.
     */
    get configServiceProxyHost() {
        return this._configServiceProxyHost;
    }
    
    set configServiceProxyHost(value) {
        this._configServiceProxyHost = value;
    }

    /**
     * @property {Object|null} customMetricsAttributes
     * @description Custom metrics attributes for analytics.
     */
    get customMetricsAttributes() {
        return this._customMetricsAttributes;
    }
    
    set customMetricsAttributes(value) {
        this._customMetricsAttributes = value;
    }

    /**
     * @method toString
     * @description Returns a string representation of the VizbeeOptions instance.
     * @returns {string} String representation of the VizbeeOptions instance.
     */
    toString() {
        return `VizbeeOptions{
            customMetricsAttributes=${JSON.stringify(this._customMetricsAttributes)},
            shouldInitInBackground=${this._shouldInitInBackground},
            configServiceProxyHost=${this._configServiceProxyHost},
            loggingPreference=${this._loggingPreference}
        }`;
    }
}

export default VizbeeOptions;