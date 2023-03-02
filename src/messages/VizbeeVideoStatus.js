import VizbeePlayerState from "./VizbeePlayerState";

export default class VizbeeVideoStatus {

    constructor() {

        this._guid = "";
        this._playbackState = VizbeePlayerState.IDLE;
        this._isPlayingAd = false;

        this._currentPosition = -1;
        this._duration = -1;
    }

    set guid(guid) {
        this._guid = guid;
    }
    get guid() {
        return this._guid;
    }

    set playbackState(playbackState) {
        this._playbackState = playbackState;
    }
    get playbackState() {
        return this._playbackState;
    }

    set isPlayingAd(isPlayingAd) {
        this._isPlayingAd = isPlayingAd;
    }
    get isPlayingAd() {
        return this._isPlayingAd;
    }

    set currentPosition(positionInMillisecs) {
        this._currentPosition = positionInMillisecs;
    }
    get currentPosition() {
        return this._currentPosition;
    }

    set duration(durationInMillisecs) {
        this._duration = durationInMillisecs;
    }
    get duration() {
        return this._duration;
    }
}