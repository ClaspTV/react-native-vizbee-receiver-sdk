import VizbeeEventEmitter from "../../VizbeeEventEmitter";
import VizbeeAppDelegate from "./VizbeeAppDelegate";
import VizbeeVideoInfo from "../../messages/VizbeeVideoInfo";

export default class AppAdapter {

    constructor() {
        this.appDelegate = undefined;
        this.registeAppAdapterListeners();
    }

    //------------------
    // Delegate
    //------------------

    setAppDelegate(appDelegate) {
        if (appDelegate instanceof VizbeeAppDelegate) {
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
   
    onStartVideo(rnVideoInfo) {
        if (this.appDelegate && rnVideoInfo) {
            let videoInfo = new VizbeeVideoInfo().fromRNVideoInfo(rnVideoInfo);
            this.appDelegate.onStartVideo(videoInfo);
        }
    }

    onSignIn(signInInfo) {
        if (this.appDelegate) {
            this.appDelegate.onSignIn(signInInfo);
        }
    }
}