import { NativeModules, NativeEventEmitter } from "react-native";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};
const VizbeeNativeEmitter = new NativeEventEmitter(VizbeeNativeManager);

class VizbeeEventEmitter {

    constructor() {
        this.subs = {}
        this.sub_id = 0
    }

    get events() {
        return {
            APP_ADAPTER_ON_SENDERS_ACTIVE: "APP_ADAPTER_ON_SENDERS_ACTIVE",
            APP_ADAPTER_ON_SENDERS_INACTIVE: "APP_ADAPTER_ON_SENDERS_INACTIVE",
            APP_ADAPTER_ON_START_VIDEO: "APP_ADAPTER_ON_START_VIDEO",
            APP_ADAPTER_ON_SIGN_IN: "APP_ADAPTER_ON_SIGN_IN",
            PLAYER_ADAPTER_ON_PLAYBACK_STATUS: "PLAYER_ADAPTER_ON_PLAYBACK_STATUS",
        }
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

export default new VizbeeEventEmitter()