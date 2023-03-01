import PlayerState from "./PlayerState";

export default class VideoStatus {

    constructor() {

        this._guid = "";
        this._state = PlayerState.IDLE;

        this._currentPosition = -1;
        this._duration = -1;
    }

    set guid(guid) {
        this._guid = guid;
    }
    get guid() {
        return this._guid;
    }

    set state(state) {
        this._state = state;
    }
    get state() {
        return this._state;
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