export default class AppDelegate {

    constructor(appDelegate) {

        this.appDelegate = appDelegate;

        this.registeAppDelegateListeners();
    }

    //------------------
    // Listeners
    //------------------

    registeAppDelegateListeners() {

        // listen for start video
        VizbeeManager.addListener(
            "ON_START_VIDEO",
            this.onStartVideo,
            this
        );

        // listen for sign in events
        VizbeeManager.addListener(
            "ON_SIGN_IN",
            this.onSignIn,
            this
        );
    }
   
    onStartVideo(videoInfo) {
        this.appDelegate.onStartVideo(videoInfo)
    }

    onSignIn(signInInfo) {
        this.appDelegate.onSignIn(signInInfo)
    }
}