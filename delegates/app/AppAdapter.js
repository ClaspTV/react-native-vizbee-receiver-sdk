import VizbeeEventEmitter from "../../VizbeeEventEmitter";
import AppDelegate from "./AppDelegate";

export default class AppAdapter {

    constructor() {
        this.appDelegate = undefined;
        this.registeAppAdapterListeners();
    }

    //------------------
    // Delegate
    //------------------

    setAppDelegate(appDelegate) {
        global.console.log("AppAdapter setAppDelegate");
        if (appDelegate instanceof AppDelegate) {
            this.appDelegate = appDelegate;
        }
    }

    removeAppDelegate() {
        this.appDelegate = undefined;
    }

    getAppDelegate() {
        return this.appDelegate;
    }

    //------------------
    // Listeners
    //------------------

    registeAppAdapterListeners() {

        global.console.log("AppAdapter registeAppAdapterListeners");

        // listen for start video
        VizbeeEventEmitter.addListener(
            VizbeeEventEmitter.events.APP_ADAPTER_ON_START_VIDEO,
            this.onStartVideo,
            this
        );

        // listen for sign in events
        VizbeeEventEmitter.addListener(
            VizbeeEventEmitter.events.APP_ADAPTER_ON_SIGN_IN,
            this.onSignIn,
            this
        );
    }
   
    onStartVideo(videoInfo) {
        global.console.log(`AppAdapter onStartVideo ${JSON.stringify(videoInfo)}` );
        if (this.appDelegate) {
            this.appDelegate.onStartVideo(videoInfo);
        }
    }

    onSignIn(signInInfo) {
        global.console.log("AppAdapter onSignIn");
        if (this.appDelegate) {
            this.appDelegate.onSignIn(signInInfo);
        }
    }
}