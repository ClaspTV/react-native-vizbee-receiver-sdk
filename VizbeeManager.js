import { NativeModules } from "react-native";
import PlayerDelegate from "./PlayerDelegate";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};
const VizbeeNativeEmitter = new NativeEventEmitter(VizbeeNativeManager);

class VizbeeManager {

    constructor() {
        this.subs = {}
        this.sub_id = 0
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

        // initialize the sdk
        VizbeeNativeManager.init(appId);

        // set app delegate
        AppDelegate.setAppDelegate(appDelegate);
    }

    //---
    // Player Adapter
    //---

    setPlayerDelegate(playerDelegate) {
        PlayerDelegate.setPlayerDelegate(playerDelegate);
    }

    removePlayerDelegate() {
        PlayerDelegate.removePlayerDelegate();
    }
    
    //---
    // Update Video Status
    //---

    // PlaybackStatus?
    setVideoStatus(videoStatus) {
        VizbeeNativeManager.setVideoStatus(videoStatus);
    }

    //----
    // Listeners
    //----

    addListener(eventName, callback, context) {
        this.subs[this.sub_id] = VizbeeNativeEmitter.addListener(eventName, function (map) {
            callback.call(context || null, map)
        })
        return this.sub_id++
    }

    removeListener(subscription) {
        let sub = this.subs[subscription]
        if (sub != null) {
            VizbeeNativeEmitter.removeSubscription(sub);
        }
        delete this.subs[subscription]
    }

    removeAllListeners(eventName) {
        VizbeeNativeEmitter.removeAllListeners(eventName)
    }
}

export default new VizbeeManager()