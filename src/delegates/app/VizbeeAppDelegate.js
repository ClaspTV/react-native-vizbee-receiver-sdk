/**
 * @class VizbeeAppDelegate
 * @description Defines the interface for handling app-related callbacks from the Vizbee SDK.
 * Developers should extend this class and implement these methods to handle specific app events.
 */
export default class VizbeeAppDelegate {

    /**
     * @constructor
     * @description Initializes a new instance of the VizbeeAppDelegate.
     */
    constructor() {}

    /**
     * @method onSendersActive
     * @description Called when one or more senders (casting devices) become active.
     */
    onSendersActive() {
        
    }

    /**
     * @method onSendersInactive
     * @description Called when all senders (casting devices) become inactive.
     */
    onSendersInactive() {
        
    }

    /**
     * @method onStartVideo
     * @description Called when a request to start a video is received.
     * @param {Object} videoInfo - Information about the video to be started.
     */
    onStartVideo(videoInfo) {
        
    }

    /**
     * @method onSignIn
     * @description Called when a sign-in request is received.
     * @param {Object} signInInfo - Information related to the sign-in request.
     */
    onSignIn(signInInfo) {
        
    }
}