import { NativeModules } from "react-native";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager;

class VizbeeManager {

    constructor() {}

    //------------------
    // Public APIs
    //------------------

    enableVerboseLogging() {
        VizbeeNativeManager.enableVerboseLogging();
    }
}

export default new VizbeeManager()