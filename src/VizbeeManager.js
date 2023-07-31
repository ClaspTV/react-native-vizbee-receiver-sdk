import { NativeModules } from "react-native";
import AppAdapter from "./delegates/app/AppAdapter";
import PlayerAdapter from "./delegates/player/PlayerAdapter";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};
class VizbeeManager {

    constructor() {
        this.isSDKInitialized = false;
        this.appAdapter = new AppAdapter();
        this.playerAdapter = new PlayerAdapter();
    }

    //---
    // Logging
    //---

    enableVerboseLogging() {
        VizbeeNativeManager.enableVerboseLogging();
    }

    //---
    // Init
    //---

    init(appId, appDelegate) {

        if (this.isSDKInitialized) {
            return;
        }

        // set app delegate
        this.setAppDelegate(appDelegate);

        // initialize the sdk
        VizbeeNativeManager.init(appId);

        // TODO: set based on event from native side
        this.isSDKInitialized = true;
    }

    //---
    // App Delegate
    //---

    setAppDelegate(appDelegate) {
        this.appAdapter.setAppDelegate(appDelegate);
    }

    removeAppDelegate() {
        this.appAdapter.removeAppDelegate();
    }

    getAppDelegate() {
        return this.appAdapter.getAppDelegate();
    }

    //---
    // Player Delegate
    //---

    setPlayerDelegate(playerDelegate) {
        this.playerAdapter.setPlayerDelegate(playerDelegate);
    }

    removePlayerDelegate() {
        this.playerAdapter.removePlayerDelegate();
    }

    getPlayerDelegate() {
        return this.playerAdapter.getPlayerDelegate();
    }
}

export default new VizbeeManager()