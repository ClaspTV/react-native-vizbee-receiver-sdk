/**
 * @class VizbeePlayerDelegate
 * @description Defines the interface for handling player-related callbacks from the Vizbee SDK.
 * Developers should extend this class and implement these methods to control the video player.
 */
export default class VizbeePlayerDelegate {

    /**
     * @method onPlay
     * @description Called when a play command is received.
     */
    onPlay() {}

    /**
     * @method onPause
     * @description Called when a pause command is received.
     */
    onPause() {}

    /**
     * @method onSeek
     * @description Called when a seek command is received.
     * @param {number} seekPos - The position to seek to, in seconds.
     */
    onSeek(seekPos) {}

    /**
     * @method onStop
     * @description Called when a stop command is received.
     * @param {string} stopReason - The reason for stopping playback.
     */
    onStop(stopReason) {}

    /**
     * @method getVideoInfo
     * @description Should return the current video information.
     * @returns {Object} An object containing information about the current video.
     */
    getVideoInfo() {}

    /**
     * @method getVideoStatus
     * @description Should return the current status of the video playback.
     * @returns {Object} An object containing the current status of the video playback.
     */
    getVideoStatus() {}
}