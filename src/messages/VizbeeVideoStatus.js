import VizbeePlayerState from "./VizbeePlayerState";

/**
 * @class VizbeeVideoStatus
 * @description Represents the current status of a video in the Vizbee SDK.
 * This class provides methods to set and get various properties related to the video's playback status.
 */
export default class VizbeeVideoStatus {

    /**
     * @constructor
     * @description Initializes a new instance of VizbeeVideoStatus with default values.
     */
    constructor() {

        this._guid = "";
        this._playbackState = VizbeePlayerState.IDLE;
        this._isPlayingAd = false;

        this._currentPosition = -1;
        this._duration = -1;
    }

    /**
     * @property {string} guid
     * @description Unique identifier for the video.
     */
    set guid(guid) {
        this._guid = guid;
    }
    get guid() {
        return this._guid;
    }

    /**
     * @property {string} playbackState
     * @description Current state of the video playback (e.g., IDLE, PLAYING, PAUSED).
     * @see VizbeePlayerState for possible values.
     */
    set playbackState(playbackState) {
        this._playbackState = playbackState;
    }
    get playbackState() {
        return this._playbackState;
    }

    /**
     * @property {boolean} isPlayingAd
     * @description Indicates whether an advertisement is currently playing.
     */
    set isPlayingAd(isPlayingAd) {
        this._isPlayingAd = isPlayingAd;
    }
    get isPlayingAd() {
        return this._isPlayingAd;
    }

    /**
     * @property {number} currentPosition
     * @description Current playback position in milliseconds.
     * @description Sets to -1 if the position is Infinity.
     */
    set currentPosition(positionInMillisecs) {
        if (positionInMillisecs === Infinity) {
            positionInMillisecs = -1;
        }
        this._currentPosition = positionInMillisecs;
    }
    get currentPosition() {
        return this._currentPosition;
    }

    /**
     * @property {number} duration
     * @description Total duration of the video in milliseconds.
     * @description Sets to -1 if the duration is Infinity (e.g., for live streams).
     */
    set duration(durationInMillisecs) {
        if (durationInMillisecs === Infinity) {
            durationInMillisecs = -1;
        }
        this._duration = durationInMillisecs;
    }
    get duration() {
        return this._duration;
    }

    /**
     * @method toJSON
     * @description Converts the VizbeeVideoStatus object to a plain JavaScript object.
     * @returns {Object} A plain JavaScript object representing the video status.
     */
    toJSON() {
        return {
            guid: this.guid,
            playbackState: this.playbackState,
            isPlayingAd: this.isPlayingAd,
            currentPosition: this.currentPosition,
            duration: this.duration
        };
    }
}