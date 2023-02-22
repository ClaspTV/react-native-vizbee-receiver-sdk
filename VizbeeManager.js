import { NativeModules } from "react-native";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};

class VizbeeManager {

    constructor() {
        this.subs = {}
        this.sub_id = 0
    }

    //------------------
    // Public APIs
    //------------------

    enableVerboseLogging() {
        VizbeeNativeManager.enableVerboseLogging();
    }
}

export default new VizbeeManager()