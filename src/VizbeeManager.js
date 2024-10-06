import { NativeModules } from "react-native";
import AppAdapter from "./delegates/app/AppAdapter";
import PlayerAdapter from "./delegates/player/PlayerAdapter";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};

/**
 * @class VizbeeManager
 * @description Manages the initialization and configuration of the Vizbee SDK for React Native.
 * This class serves as a bridge between the React Native application and the native Vizbee SDK.
 */
class VizbeeManager {

    /**
     * @constructor
     * @description Initializes a new instance of the VizbeeManager.
     * Sets up the initial state and creates instances of AppAdapter and PlayerAdapter.
     */
    constructor() {
        /**
         * @property {boolean} isSDKInitialized - Indicates whether the SDK has been initialized.
         * @private
         */
        this.isSDKInitialized = false;

        /**
         * @property {AppAdapter} appAdapter - Handles communication with the app delegate.
         * @private
         */
        this.appAdapter = new AppAdapter();

        /**
         * @property {PlayerAdapter} playerAdapter - Handles communication with the player delegate.
         * @private
         */
        this.playerAdapter = new PlayerAdapter();
    }

    //---
    // Logging
    //---

    /**
     * @method enableVerboseLogging
     * @description Enables verbose logging in the native Vizbee SDK.
     * This can be useful for debugging and troubleshooting.
     */
    enableVerboseLogging() {
        VizbeeNativeManager.enableVerboseLogging();
    }

    //---
    // Init
    //---

    /**
     * @method init
     * @description Initializes the Vizbee SDK with the provided app ID and delegate.
     * This method should be called once when the app starts.
     * @param {string} appId - The unique identifier for the application.
     * @param {Object} appDelegate - The app delegate object implementing required methods.
     */
    init(appId, appDelegate) {
        if (this.isSDKInitialized) {
            return;
        }

        // Set app delegate
        this.setAppDelegate(appDelegate);

        // Initialize the SDK
        VizbeeNativeManager.init(appId);

        // TODO: Set based on event from native side
        this.isSDKInitialized = true;
    }

    //---
    // App Delegate
    //---

    /**
     * @method setAppDelegate
     * @description Sets the app delegate for handling app-related callbacks.
     * @param {Object} appDelegate - The app delegate object implementing required methods.
     */
    setAppDelegate(appDelegate) {
        this.appAdapter.setAppDelegate(appDelegate);
    }

    /**
     * @method removeAppDelegate
     * @description Removes the currently set app delegate.
     */
    removeAppDelegate() {
        this.appAdapter.removeAppDelegate();
    }

    /**
     * @method getAppDelegate
     * @description Retrieves the currently set app delegate.
     * @returns {Object|null} The current app delegate or null if not set.
     */
    getAppDelegate() {
        return this.appAdapter.getAppDelegate();
    }

    //---
    // Player Delegate
    //---

    /**
     * @method setPlayerDelegate
     * @description Sets the player delegate for handling player-related callbacks.
     * @param {Object} playerDelegate - The player delegate object implementing required methods.
     */
    setPlayerDelegate(playerDelegate) {
        this.playerAdapter.setPlayerDelegate(playerDelegate);
    }

    /**
     * @method removePlayerDelegate
     * @description Removes the currently set player delegate.
     */
    removePlayerDelegate() {
        this.playerAdapter.removePlayerDelegate();
    }

    /**
     * @method getPlayerDelegate
     * @description Retrieves the currently set player delegate.
     * @returns {Object|null} The current player delegate or null if not set.
     */
    getPlayerDelegate() {
        return this.playerAdapter.getPlayerDelegate();
    }
}

/**
 * @exports {VizbeeManager}
 * @description Exports a singleton instance of the VizbeeManager class.
 * This ensures that only one instance of VizbeeManager is used throughout the application.
 */
export default new VizbeeManager()