/**
 * @class VizbeePlayerState
 * @description Defines constants for various states of the video player in the Vizbee SDK.
 * These states can be used to track and manage the player's current condition.
 */
export default class VizbeePlayerState {
    /**
     * @readonly
     * @type {string}
     * @description Player is in an idle state, not playing any content.
     */
    static get IDLE() { return "idle" };

    /**
     * @readonly
     * @type {string}
     * @description Player is preparing to play content.
     */
    static get PREPARING() { return "preparing" };

    /**
     * @readonly
     * @type {string}
     * @description Player is loading content.
     */
    static get LOADING() { return "loading" };

    /**
     * @readonly
     * @type {string}
     * @description Playback has started.
     */
    static get STARTED() { return "started" };

    /**
     * @readonly
     * @type {string}
     * @description Content is actively playing.
     */
    static get PLAYING() { return "playing" };

    /**
     * @readonly
     * @type {string}
     * @description Playback is paused.
     */
    static get PAUSED() { return "paused" };

    /**
     * @readonly
     * @type {string}
     * @description Player is buffering content.
     */
    static get BUFFERING() { return "buffering" };

    /**
     * @readonly
     * @type {string}
     * @description Playback has been interrupted.
     */
    static get INTERRUPTED() { return "interrupted" };

    /**
     * @readonly
     * @type {string}
     * @description Playback has finished.
     */
    static get FINISHED() { return "finished" };

    /**
     * @readonly
     * @type {string}
     * @description Playback has failed.
     */
    static get FAILED() { return "failed" };
};